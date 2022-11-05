<template>
  <div class="search inbox-items-container">
    <subscribe-item :info="info" :isrotate="false" @instruct="addition"> </subscribe-item>
  </div>
</template>

<script>
import {
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRaw,
} from "vue";
import SubscribeItem from "@/components/layout/SubscribeItem";
import { subscribePod } from "@/api/subscribe";
import emitter from "@/utils/bus";

export default {
  components: { SubscribeItem },
  setup(props) {
    const { proxy } = getCurrentInstance();

    let info1 = reactive([
      {
        id: 852289138,
        feedId: "0d3334c789a887cb31c5dea1bfe076dc",
        href: "http://rss.lizhi.fm/rss/318375.xml",
        title: "原来是这样 Dscience",
        image:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts125/v4/23/6f/2f/236f2f30-cfe6-81ff-64d9-0fa01d050b60/mza_14946392187393632710.jpg/600x600bb.jpg",
        ownerName: "原来是这样 Dscience",
      },
    ]);
    let info2 = ref([]);

    // ---------
    onMounted(() => {
      emitter.on("searchVal", (val) => {
        info2.value = val;
      });
    });
    let info = toRaw(info2);

    onBeforeUnmount(() => {
      emitter.off("searchVal");
    });
    // ---------

    function addition(data, index) {
      // console.log("添加订阅", data);
      subscribePod(data).then((result) => {
        const rslt = result.data;
        if (rslt.code === 200) {
          proxy.$elMsg.success("订阅成功");
        } else if (rslt.code === 500) {
          proxy.$elMsg.warn(rslt.msg);
        } else {
          proxy.$elMsg.error("添加失败");
        }
      });
    }
    return {
      info,
      addition,
    };
  },
};
</script>

<style lang="less" scoped></style>
