<template>
  <div class="info-box">
    <template v-for="(item, index) of info" :key="index">
      <div class="station-cell">
        <div class="station-info-box">
          <img
            :src="item.image === null ? require('@/assets/img/unnamed.jpg') : item.image"
            alt=""
          />
          <span class="station-title">{{ item.title }}</span>
          <span class="owner-name">{{ item.ownerName }}</span>
        </div>
        <div class="subscribe-box">
          <img
            src="@/assets/img/subscribe_hover.png"
            alt=""
            :class="{ 'is-rotate': isrotate }"
            @click="answer(item, index)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
export default {
  props: ["info", "isrotate"],
  emits: ["instruct"],
  setup(props, context) {
    function answer(data, index) {
      context.emit("instruct", data, index);
    }

    return {
      answer,
    };
  },
};
</script>

<style lang="less" scoped>
.info-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center;
  height: 100%;
  .station-cell {
    width: 180px;
    font-size: 16px;
    position: relative;
    margin: 10px;
    background: #e4e2e2;
    border-radius: 8px;

    .station-info-box {
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      img {
        height: 140px;
        width: 140px;
        margin: 20px auto 0px auto;
        border-radius: 70px;
        border-width: 0;
        object-fit: cover;
      }
      .station-title {
        margin: 16px 20px 0px 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 80%;
        font-size: 1rem;
        font-weight: 700;
      }
      span:last-child {
        margin: 16px 20px 0px 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 80%;
        font-size: 0.8em;
        font-weight: 700;
      }
    }
    .subscribe-box {
      position: relative;
      border: 8px;
      bottom: 0;
      width: 100%;
      height: 38px;
      background: transparent;
      img {
        height: 26px;
        width: 26px;
        border-radius: 16px;
        border-width: 0px;
        border-style: none;
        position: absolute;
        right: 16px;
        bottom: 8px;
        cursor: pointer;
        display: none;
      }
    }

    .subscribe-box img:hover {
      box-shadow: 0 -2px 20px #7c7a7a;
    }
    .subscribe-box img:active {
      box-shadow: 0 -4px 26px #8d8c8c;
    }
  }
  .station-cell:hover {
    .subscribe-box {
      img {
        display: block;
      }
    }
  }
}

.is-rotate {
  transform: rotate(45deg);
}
</style>
