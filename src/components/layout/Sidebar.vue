<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      text-color="#000"
      active-text-color="#005ccc"
      router
    >
      <side-logo></side-logo>
      <!-- 方1 -->
      <!-- <template v-for="(item, index) in menuList" :key="index">
        <el-menu-item>
          <i :class="item.meta.icon"></i>
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </template> -->
      <!-- 方2 -->
      <!-- <div class="items-box">
        <div class="item-box">
          <side-item
            v-for="item in menuList"
            :key="item.icon"
            :index="item.index"
            :menus="item"
          ></side-item>
        </div>
      </div> -->

      <!-- 方3 -->
      <side-item :menus="menuList"></side-item>

      <div class="meta-container"></div>
    </el-menu>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SideItem from "./SideItem";
import SideLogo from "./SideLogo";
export default {
  components: { SideItem, SideLogo },
  setup() {
    const store = useStore();
    const route = useRoute();
    const onRoutes = computed(() => {
      return route.path;
    });

    // console.log("itonRoutes = ", onRoutes);

    const menuList = computed(() => store.getters.menuList);
    return {
      menuList,
      onRoutes,
    };
  },
};
</script>
<style lang="less" scoped>
.sidebar {
  display: flex;
  position: relative;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  width: 250px;
  font-size: 16px;
  color: @black-color;
  min-height: 100%;

  .sidebar-el-menu {
    min-height: 100%;
    width: 100%;
    // ul {
    // height: 100%;
    // }
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // bottom: 70px;
    // .items-box {
    // position: relative;

    // .item-box {
    // position: absolute;
    // bottom: 90px;
    // }
    // }
  }

  // 修改选中时的背景颜色
  // .el-menu-item.is-active {
  //   background-color: #0e6cd1 !important;
  //   color: #fff;
  //   span {
  //     color: #fff !important;
  //   }
  // }
}
// 隐藏滚动条
.sidebar::-webkit-scrollbar {
  width: 0;
  // display: none;
}
</style>
