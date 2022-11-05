<template>
  <div class="side-item">
    <!-- 一级菜单 -->
    <!-- <span>{{ item }}</span> -->
    <!-- <el-menu-item>
      <i :class="menuList.meta.icon"></i>
      <template #title>{{ menuList.meta.title }}</template>
    </el-menu-item> -->

    <template v-for="(item, index) in menuList" :key="index">
      <el-menu-item :index="item.path">
        <i :class="item.meta.icon"></i>
        <!-- <template #title>{{ item.meta.title }}</template> -->
        <label>{{ item.meta.title }}</label>
        <!-- <div class="badge-box" v-show="route.path === item.path && news !== 0"> 暂时不同 -->
        <div class="badge-box" v-show="item.path === '/receive' && news > 0">
          <label class="update-mark">{{ news > 10 ? "10+" : news }}</label>
        </div>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, getCurrentInstance, inject, onMounted, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import storeL from "@/store";
export default {
  props: {
    menus: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const menuList = toRefs(props).menus;
    const route = useRoute();
    const router = useRouter();
    // const socket = inject("socket");
    const showme = ref(false);

    const { proxy } = getCurrentInstance();

    const news = computed(() => {
      return store.getters.news;
    });

    // watch(
    //   () => router.currentRoute.value.path,
    //   (toPath) => {
    //     console.log("toPath", toPath);
    //     if (router.currentRoute.value.path.includes("receive")) {
    //       // replyServe();
    //     }
    //   },
    //   {
    //     immediate: true,
    //     deep: true,
    //   }
    // );
    //监听广播消息
    // socket.on("news", (data) => {
    //   console.log("new 接收到消息:", data, new Date().getTime());
    //   storeL.dispatch("user/setNews", data);
    // });

    return {
      menuList,
      route,
      showme,
      news,
    };
  },
};
</script>

<style lang="less" scoped>
.side-item {
  padding: 10px 0;
  margin: 4px 6px;
  li {
    font-size: 16px;
    font-weight: 600;
    i {
      font-size: 20px;
      margin-right: 16px;
    }

    .badge-box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: 14px;
      background-color: #1cb955;
      border-radius: 10px;
      min-width: 28px;
      max-height: 22px;
      .update-mark {
        font-size: 0.8em;
        font-weight: 600;
        color: white;
        margin: 3px 8px;
      }
    }
  }
}
</style>
