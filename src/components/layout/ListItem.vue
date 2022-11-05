<template>
  <template v-for="(item, index) of info" :key="index">
    <div class="list-cell" @mouseover="changeShowme(index)" @mouseout="showme = -1">
      <!-- 音频信息 -->
      <div class="audio-box">
        <!-- 下标 -->
        <div
          class="audio-index"
          :class="{
            'audio-index-action': item.id == playInfo.playId && playInfo.isPlaying,
          }"
        >
          <span class="span-index">{{ index + 1 }}</span>
          <img src="@/assets/img/listen.png" class="playing-mark" />
        </div>
        <!-- 图片 -->
        <div class="audio-img">
          <!-- <img src="@/assets/img/insideStory.png" class="audio-cover" /> -->
          <!-- <img :src="item.image" class="audio-cover" /> -->
          <img
            :src="item.image === null ? require('@/assets/img/unnamed.jpg') : item.image"
            alt=""
            class="audio-cover"
          />
          <!-- 已经完成 -->
          <div class="done-mark" v-show="item.finish"></div>
        </div>
        <!-- title -->
        <div class="audio-title">
          <span class="audio-name">
            {{ item.title }}
          </span>
          <span class="station-name">{{ item.author }}</span>
        </div>
      </div>
      <!-- 播放控件 -->
      <transition name="appear">
        <div class="list-control-container" v-show="showme === index">
          <div class="control-button" title="播放" @click="play(item, index)">
            <i
              class="ali-zy-yunhang icon"
              v-if="!playInfo.isPlaying || item.id != playInfo.playId"
            ></i>
            <i class="ali-zy-zanting icon" v-else-if="item.id == playInfo.playId"></i>
          </div>
          <div
            class="control-button"
            title="添加到队列"
            v-if="route.path !== '/list' && !item.inQueue"
            @click="addGroup(item, index)"
          >
            <i class="ali-zy-liebiao icon"></i>
          </div>
          <div
            class="control-button"
            title="收藏"
            v-if="route.path !== '/collect' && !item.collect"
            @click="collect(item, index)"
          >
            <i class="ali-zy-shoucang icon"></i>
          </div>
          <div class="control-button" title="删除" @click="del(item, index)">
            <i class="ali-zy-shanchu icon"></i>
          </div>
        </div>
      </transition>
      <!-- 时间和时长 -->
      <div class="date-info">
        <span class="inactive-text">{{ item.releaseDate }}</span>
        <span class="inactive-text">{{ item.duration }}</span>
      </div>
    </div>
  </template>
  <e-dialog
    :dialogVisible="dialogVisible"
    @closeDialog="closeDialog"
    v-if="dialogVisible"
  ></e-dialog>
</template>

<script>
import {
  computed,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import EDialog from "../dialog";
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["play", "addGroup", "collect", "del"],
  components: {
    EDialog,
  },
  setup(props, context) {
    const showme = ref(-1);
    const route = useRoute();
    // dialog隐藏/显示
    const dialogVisible = ref(false);
    let tempData = reactive({});
    let tempDataIndex = ref("");
    const store = useStore();
    const playInfo = computed(() => store.getters.playInfo);

    watch(
      () => store.getters.playInfo,
      (newVal, oldVal) => {
        // console.log("newVal ", newVal, "oldVal ", oldVal);
        // if(newVal == )
      },
      {
        deep: true,
        immediate: true,
      }
    );

    function changeShowme(index) {
      showme.value = index;
    }

    function play(data, index) {
      context.emit("play", data, index);
    }
    function addGroup(data, index) {
      context.emit("addGroup", data, index);
    }

    function collect(data, index) {
      context.emit("collect", data, index);
    }

    // --------------- 删除弹窗测死

    function del(data, index) {
      tempData = data;
      dialogVisible.value = true;
      tempDataIndex.value = index;
    }

    function closeDialog(flag) {
      //   console.log("closeDialog", flag);
      dialogVisible.value = false;
      if (flag) {
        context.emit("del", tempData, tempDataIndex.value);
        console.log("删除成功");
      } else {
        console.log("取消删除");
      }
      tempData = {};
      tempDataIndex.value = "";
    }

    // 测试 start ----------------
    watch(
      () => props.info,
      (newVal, oldVal) => {
        // console.log("watch ", newVal, oldVal);
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 测试 end ----------------
    return {
      showme,
      changeShowme,
      play,
      collect,
      del,
      route,
      addGroup,
      dialogVisible,
      closeDialog,
      playInfo,
    };
  },
};
</script>

<style lang="less" scoped>
.list-cell {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-radius: 6px;
  background-color: transparent;
  transition: background-color 300ms;
  cursor: pointer;
  .audio-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
    flex-shrink: 1;
    .audio-index {
      position: relative;
      margin: 0 18px;
      flex-shrink: 2;
      width: 28px;
      height: 28px;
      .span-index {
        font-size: 1em;
        font-weight: 500;
        color: #000000;
        transition: color 300ms;
        text-align: center;
        user-select: none;
        text-align: center;
        line-height: 28px;
        display: block;
      }
      .playing-mark {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 28px;
        height: 28px;
        z-index: 9999;
        display: none;
      }
    }
    // 临时，改为播放变化
    .audio-index-action {
      .span-index {
        color: transparent;
      }
      .playing-mark {
        display: block;
      }
    }

    .audio-img {
      cursor: pointer;
      position: relative;
      height: 64px;
      width: 64px;
      margin: 10px 0;
      flex: 0;
      flex-basis: 64px;
      flex-shrink: 0;
      overflow: hidden;
      border-radius: 6px;
      .audio-cover {
        height: 64px;
        width: 64px;
        border-radius: 6px;
        object-fit: cover;
      }
      .done-mark {
        height: 28px;
        width: 28px;
        background-color: #2bd94e;
        position: absolute;
        right: -14px;
        bottom: -14px;
        transform: rotate(45deg);
      }
    }
    .audio-title {
      margin-left: 10px;
      flex-shrink: 1;
      max-width: 100%;
      overflow: hidden;
      .audio-name {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #000000;
        font-size: 1em;
        font-weight: 600;
      }
      .station-name {
        display: block;
        color: #5c5858;
        font-size: 0.6em;
        font-weight: 600;
      }
    }
  }
  .list-control-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    transition: opacity 0.6s ease-in;

    .control-button {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-content: center;
      justify-content: center;
      margin: 0 4px;
      cursor: pointer;
      i {
        font-size: 30px;
        line-height: 30px;
      }
      i:hover {
        font-weight: 600;
      }
    }
  }
  .date-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    .inactive-text {
      font-size: 0.9em;
      font-weight: 500;
    }
    .inactive-text:last-child {
      margin: 0 24px;
    }
  }
  &:hover {
    background-color: @list-bg-color;
  }
}

.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}
.appear-enter-to,
.appear-leave {
  opacity: 1;
}
.appear-enter-active,
.appear-leave-active {
  transition: opacity 300ms ease-in;
}
</style>
