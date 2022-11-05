<template>
  <div class="Receive-container inbox-items-container">
    <list-item
      :info="info"
      @play="play"
      @addGroup="addGroup"
      @collect="collect"
      @del="del"
    ></list-item>
  </div>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import ListItem from "@/components/layout/ListItem";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import { getNews, addPlayList, addCollect } from "@/api/receive";
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
    // let info = reactive({});
    let info = ref([]);

    const { proxy } = getCurrentInstance();
    // const socket = inject("socket");
    const news = computed(() => {
      return store.getters.news;
    });
    // 定时器
    let t = "";

    onMounted(() => {
      selectNews();
      replyServe();
    });

    onUnmounted(() => {
      clearTimeout(t);
    });
    watch(
      () => store.getters.news,
      (newVal, oldVal) => {
        // console.log("newValue ", newVal, "oldValue ", oldVal);
        if (newVal !== oldVal && newVal > 0) {
          t = setTimeout(() => {
            replyServe();
          }, 2000);
        }
      }
    );

    // 播放
    function play(data, index) {
      console.log("receive 播放 id: ", data.id);
      // proxy.$elMsg.success("开始播放");
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
    // 添加到队列
    function addGroup(data, index) {
      console.log("receive 添加队列", data);
      addPlayListAction(data, index, "成功添加队列");
    }

    function addPlayListAction(data, index, msg) {
      const param = {
        id: data.id,
      };
      addPlayList(param).then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          // console.log("receive rslt ", rslt.data);
          info.value[index].inQueue = !info.value[index].inQueue;
          proxy.$elMsg.success(msg);
        } else {
          proxy.$elMsg.success(rslt.msg);
        }
      });
    }
    // 收藏
    function collect(data, index) {
      console.log("receive 收藏", info.value[index], index);
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
    // 删除
    function del(data, index) {
      console.log("receive 删除", data);
      info.value.splice(index, 1);
    }

    // 回复服务端
    function replyServe() {
      if (news.value !== 0) {
        const msg = "已读" + news.value + "新消息";
        proxy.$socket.emit("reply", msg);
      }
    }
    // 服务端确认收到
    proxy.$socket.on("reversion", (data) => {
      // console.log("reversion 接收到消息:", data, new Date().getTime());
      if (data) {
        store.dispatch("user/setNews", 0);
      }
    });

    // 获取收件箱内容
    const selectNews = () => {
      // console.log("添加订阅", data);
      getNews().then((result) => {
        const rslt = result.data;
        if (rslt.code === 200) {
          // console.log("data ", rslt.data);
          info.value = rslt.data;
        } else {
          return;
        }
      });
    };
    return {
      info,
      play,
      addGroup,
      collect,
      del,
    };
  },
};
</script>
