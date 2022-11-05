<template>
  <div class="paly-list inbox-items-container">
    <list-item :info="info" @play="play" @collect="collect" @del="del"></list-item>
    <!-- 数据更新，组件没有刷新，测试 -->
    <!-- <list-item :info="info" :key="keylist"></list-item> -->
  </div>
</template>

<script>
import {
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import ListItem from "@/components/layout/ListItem";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getList, delProgram } from "@/api/playList";
import { addCollect } from "@/api/receive";
import emitter from "@/utils/bus";

export default {
  components: { ListItem },
  setup(props) {
    let info1 = reactive([
      {
        id: 2,
        feedId: "13144142",
        href: "http://www.xxx.xml",
        image: null,
        title: "S4 Vol.14 数牍科技宋一民：隐私计算让数据“可用不可见”",
        ownerName: "创业内幕 Startup Insider",
        // 已收听（完成）
        finish: true,
        // 收藏
        collect: false,
        releaseDate: "2021-4-4",
        duration: "09.51",
      },
    ]);
    // let info = reactive({});
    let info = ref([]);

    // ctx 开发环境可以访问到，生产环境不行
    // proxy 则都可以
    const { proxy } = getCurrentInstance();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    // watch(
    //   () => store.getters.playId,
    //   (newVal, oldVal) => {
    //     // console.log("newVal ", newVal, "oldVal ", oldVal);
    //   },
    //   {
    //     deep: true,
    //     immediate: true,
    //   }
    // );

    onMounted(() => {
      getListContent();
    });

    // 获取播放列表的内容
    const getListContent = () => {
      getList().then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("playList rslt ", rslt.data);
          info.value = rslt.data;
          emitter.emit("playlist", info.value);
        }
      });
    };

    function play(data, index) {
      // console.log("play 播放 id: ", data.id, index);
      emitter.emit("playItem", { data, index });
      // proxy.$elMsg.success("开始播放");
    }
    function collect(data, index) {
      console.log("play 收藏", data);

      const param = {
        id: data.id,
      };
      addCollect(param).then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("receive rslt ", rslt.data);
          info.value[index].collect = !info.value[index].collect;
          proxy.$elMsg.success("收藏成功");
        } else {
          proxy.$elMsg.success(rslt.msg);
        }
      });
    }
    function del(data, index) {
      console.log("play 删除", data, index);
      const param = {
        id: data.id,
      };
      delProgram(param).then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("playList rslt ", rslt.data);
          info.value.splice(index, 1);
          proxy.$elMsg.success("删除成功");
        } else {
          proxy.$elMsg.success(rslt.msg);
        }
      });
    }

    return {
      info,
      play,
      collect,
      del,
    };
  },
};
</script>
<style lang="less" scoped></style>
