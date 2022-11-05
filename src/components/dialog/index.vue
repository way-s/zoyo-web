<template>
  <el-dialog
    v-model="showme"
    title="删除提示"
    width="30%"
    center
    destroy-on-close
    :before-close="onClose"
  >
    <span>删除后不可找回，确认删除吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["closeDialog", "update:modelValue"],
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // modelValue: {
    //   type: Boolean,
    // },
  },
  setup(props, context) {
    const showme = ref(props.dialogVisible);

    function onClose() {
      context.emit("closeDialog", false);
      // context.emit("update:modelValue", false);
    }
    function onConfirm() {
      context.emit("closeDialog", true);
      // context.emit("update:modelValue", true);
    }
    return {
      showme,
      onClose,
      onConfirm,
    };
  },
};
</script>
<style lang="less" scoped>
.dialog-footer button:first-child {
  margin-right: 20px;
}
</style>
