<template>
  <div class="content-box">
    <Header></Header>
    <div class="content">
      <!-- <keep-alive>
        <router-view></router-view>
      </keep-alive> -->

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Header from "@/components/Header";

export default {
  components: { Header },
  setup() {
    // const store = useStore();

    return {};
  },
};
</script>

<style lang="less" scoped>
.content-box {
  position: fixed;
  left: 250px;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  padding-bottom: 30px;
  background: #f0f0f0;
  box-sizing: border-box;
  .content {
    position: relative;
    height: 100%;
  }
}
</style>
