<template>
  <div class="my-subscribe inbox-items-container">
    <subscribe-item :info="info" :isrotate="true" @instruct="cancel"></subscribe-item>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";
import SubscribeItem from "@/components/layout/SubscribeItem";
import { delPod, getPod } from "@/api/subscribe";
import { useRouter } from "vue-router";

export default {
  components: { SubscribeItem },
  setup(props) {
    const { proxy } = getCurrentInstance();
    // 测试
    let info2 = reactive([
      {
        id: 1,
        feedId: "1314414",
        href: "http://www.xxx.xml",
        image: null,
        title: "IT 公园",
        ownerName: "纳西德的咖啡屋",
      },
    ]);

    // const router = useRouter();

    // watch(
    //   () => router.currentRoute.value.path,
    //   (toPath) => {
    //     console.log("toPath", toPath);
    //   },
    //   {
    //     immediate: true,
    //     deep: true,
    //   }
    // );

    let info1 = ref([]);
    let info = toRaw(info1);
    const socket = inject("socket");

    onMounted(() => {
      getSubscribe();
    });

    // 获取订阅信息
    async function getSubscribe() {
      await getPod().then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("rslt ", rslt.data);
          info1.value = rslt.data;
        }
      });
    }

    // 取消订阅
    function cancel(data, index) {
      // console.log("取消订阅", data);
      delPod(data.feedId).then((result) => {
        const rslt = result.data;
        if (rslt.code === 200) {
          info1.value.splice(index, 1);
          proxy.$elMsg.success("删除成功");
        } else {
          proxy.$elMsg.error("删除失败");
        }
      });
    }

    socket.on("errorNews", (msg) => {
      console.log("errorNews 接收到消息:", msg);
      proxy.$elMsg.warn(msg);
    });
    return {
      info,
      cancel,
    };
  },
};
</script>

<style lang="less" scoped></style>
