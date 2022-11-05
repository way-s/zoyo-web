<template>
  <div class="sidebar">
    <el-menu
      :default-active="onRoutes"
      class="sidebar-el-menu"
      text-color="#030000"
      active-text-color="#fff"
      background-color="#3c9eff"
      router
    >
      <side-logo></side-logo>

      <!-- <template v-for="(item, index) in menuList" :key="index">
        <el-menu-item :index="item.path">
          <i :class="item.meta.icon"></i>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </template> -->
      <div class="menu-item">
        <!-- <el-badge :value="200" :max="10" class="badge-item"> -->
        <side-item :menus="menuList" :news="news"></side-item>
        <!-- </el-badge> -->
      </div>

      <div class="meta-container"></div>
    </el-menu>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import SideItem from "./layout/SideItem";
import SideLogo from "./layout/SideLogo";

export default {
  components: { SideItem, SideLogo },
  setup() {
    const store = useStore();
    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    const menuList = computed(() => store.getters.menuList);

    // 临时 -------------------
    const news = ref(0);
    // 临时 -------------------
    return {
      onRoutes,
      menuList,
      news,
    };
  },
};
</script>
<style lang="less" scoped>
.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  font-size: 14px;
  box-sizing: border-box;
  overflow-y: auto;
  width: 250px;
  flex-basis: 18%;

  .sidebar-el-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
  }
  // 修改选中时的背景颜色
  /deep/.el-menu-item.is-active {
    background-color: @select-color !important;
    color: #fff;
    span {
      color: #fff !important;
    }
  }
  /deep/ .el-menu-item {
    border-radius: 8px;
  }
}
.badge-item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
