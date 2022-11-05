<template>
  <div class="collect-container inbox-items-container">
    <list-item :info="info" @play="play" @addGroup="addGroup" @del="del"></list-item>
  </div>
</template>

<script>
import { getCurrentInstance, inject, onMounted, onUnmounted, reactive, ref } from "vue";
import ListItem from "@/components/layout/ListItem";
import { useRoute, useRouter } from "vue-router";
import { addPlayList, addCollect } from "@/api/receive";
import { getList, delCollect } from "@/api/collect";
import emitter from "@/utils/bus";

export default {
  components: { ListItem },
  setup(props) {
    let info1 = reactive([
      {
        id: 2,
        feedId: "13144142",
        href: "http://www.xxx.xml",
        image: "@/assets/img/unnamed.jpg",
        title: "S4 Vol.14 数牍科技宋一民：隐私计算让数据“可用不可见”",
        ownerName: "创业内幕 Startup Insider",
        // 已收听（完成）
        finish: true,
        // 收藏
        collect: true,
        // 在队列中
        inQueue: false,
        releaseDate: "2021-4-4",
        duration: "09.51",
      },
    ]);
    // 测试空数据
    let info = ref({});
    const { proxy } = getCurrentInstance();

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
        }
      });
    };

    function play(data, index) {
      console.log("collect 播放 id: ", data);
      const param = {
        id: data.id,
      };
      addPlayList(param).then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("receive rslt ", rslt.data);
          info.value[index].inQueue = !info.value[index].inQueue;
          const type = "new";
          emitter.emit("playItem", { data, index, type });
        } else {
          info.value[index].inQueue = true;
          const type = "old";
          emitter.emit("playItem", { data, index, type });
        }
      });
    }
    function addGroup(data, index) {
      console.log("collect 添加队列", data, index);
      const param = {
        id: data.id,
      };
      addPlayList(param).then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("receive rslt ", rslt.data);
          info.value[index].inQueue = !info.value[index].inQueue;

          proxy.$elMsg.success("添加成功");
        } else {
          proxy.$elMsg.success(rslt.msg);
        }
      });
    }
    function del(data, index) {
      console.log("collect 删除", data);
      const param = {
        id: data.id,
      };
      delCollect(param).then((result) => {
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
      addGroup,
      del,
    };
  },
};
</script>
