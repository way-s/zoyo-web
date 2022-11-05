<template>
  <div class="content-box">
    <div class="header-box">
      <my-header></my-header>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
      </router-view>
    </div>
  </div>
</template>

<script>
// import MyHeader from "@/components/Header";
import MyHeader from "@/components/layout/Header";

export default {
  components: { MyHeader },
};
</script>

<style lang="less" scoped>
.content-box {
  position: relative;
  left: 250px;
  top: 0;
  background: #f0f0f0;
  overflow: hidden;
  max-width: calc(100% - 250px);
  height: 100%;

  .header-box {
    position: relative;
    z-index: 999;
  }
  .content {
    position: relative;
    width: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px;
    height: calc(100vh - 70px);
  }
}
</style>
