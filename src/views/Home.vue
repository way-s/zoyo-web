<template>
  <div>
    <my-sidebar></my-sidebar>
    <my-container></my-container>
    <play-control></play-control>
  </div>
</template>

<script>
import MyContainer from "@/components/Container";
import MySidebar from "@/components/ESidebar";
import PlayControl from "@/components/layout/PlayControl";

export default {
  components: {
    MyContainer,
    MySidebar,
    PlayControl,
  },
  setup(props) {},
};
</script>

<style></style>
<style lang="less" scoped></style>
