<template>
  <div class="temp">
    <div class="showme" @click="show">
      <span>点击</span>
    </div>

    <el-button text @click="showDialog">open the Dialog</el-button>

    <e-dialog
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      v-if="dialogVisible"
      :modelValue="title"
    ></e-dialog>
    <!-- @update:modelValue="title = $event" -->
  </div>
</template>

<script>
import { ref, h } from "vue";
import EDialog from "@/components/dialog";

export default {
  components: { EDialog },
  props: {
    // modelValue: {
    //   type: Boolean,
    //   default: false,
    // },
  },

  setup(props) {
    const index = ref(0);
    function show() {
      console.log("点击", index.value++);
    }

    const dialogVisible = ref(false);
    const title = ref(false);

    function showDialog() {
      dialogVisible.value = true;
    }

    function closeDialog(flag) {
      console.log("closeDialog", flag);
      dialogVisible.value = false;
      return flag;
    }
    return {
      show,
      dialogVisible,
      showDialog,
      closeDialog,
      title,
    };
  },
};
</script>
<style lang="less" scoped>
.temp {
  .showme {
    color: #000000;
    background-color: antiquewhite;
    height: 50px;
    width: 50px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.dialog-footer button:first-child {
  margin-right: 20px;
}
</style>
