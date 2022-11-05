<template>
  <div class="play-box">
    <div class="play-content">
      <!-- 信息缩略-->
      <div class="info">
        <img
          :src="
            audioInfo.image === null
              ? require('@/assets/img/unnamed.jpg')
              : audioInfo.image
          "
        />
        <div class="introduce">
          <span>{{ audioInfo.title }}</span>
          <span>{{ audioInfo.author }}</span>
        </div>
      </div>
      <!-- 音频播放 -->
      <div class="audio-play-box">
        <audio-player
          ref="audioPlay"
          :audio-list="audioList.map((elm) => elm.audioUrl)"
          :before-play="handleBeforePlay"
          @pause="onPause"
          @play="onPlay"
          theme-color="#1E90FF"
          :playback-rates="[1, 1.2, 1.5, 2]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from "@liripeng/vue-audio-player";
import { onBeforeUnmount, onMounted, ref, getCurrentInstance } from "vue";
import emitter from "@/utils/bus";
import { useStore } from "vuex";

export default {
  components: {
    AudioPlayer,
  },
  setup() {
    // const currentInstance = getCurrentInstance();
    const audioPlay = ref();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    let list = [
      {
        name: "音频1",
        url: "http://www.ytmp3.cn/down/76857.mp3",
      },
    ];

    let mockList = {
      title: "在ZOYO听见有趣有料的声音",
      author: "ZOYO-FM电波",
      audioUrl: null,
      image: null,
    };
    let mockAudioUrl = [
      {
        audioUrl: null,
      },
    ];

    let audioList = ref([]);
    // 音频的基本信息
    let audioInfo = ref({});

    onMounted(() => {
      emitter.on("playlist", (data) => {
        // console.log("control 接收到数据", data);
        audioList.value = data;
        audioInfo.value = audioList.value[0];
      });
      // console.log("audioList ", audioList.value);
      // console.log("audioPlayer =", audioPlay);
      audioListInit();
    });

    emitter.on("playItem", ({ data, index, type }) => {
      // console.log("playItem 接收到数据", data, index, type);
      // 已经存在
      if (type === "new") {
        console.log("不存在");
        audioList.value.unshift(data);
        commonPlayMothod("", 0);
      }
      // 不存在
      else if (type === "old") {
        console.log("old存在");
        getExistPlayInfo(data);
      } else {
        audioPlay.value.currentPlayIndex = index;
        commonPlayMothod("", index);

        // audioInfo.value = audioList.value[audioPlay.value.currentPlayIndex];
        // audioPlay.value.currentPlayIndex = index - 1;

        // audioPlay.value.isPlaying = !audioPlay.value.isPlaying;
        // if (audioPlay.value.isPlaying) {
        //   audioPlay.value.playNext();
        // } else {
        //   audioPlay.value.pause();
        // }
        // const playData = {
        //   playId: audioInfo.value.id,
        //   isPlaying: audioPlay.value.isPlaying,
        // };
        // store.dispatch("playList/setPlayId", playData);
      }
    });

    onBeforeUnmount(() => {
      emitter.off("playlist");
      emitter.off("playItem");
    });
    // 初始化
    const audioListInit = () => {
      if (audioList.value.length <= 0) {
        audioInfo.value = mockList;
        audioList.value = mockAudioUrl;
      }
    };
    // 播放前做的事
    function handleBeforePlay(next) {
      if (audioList.value.length > 0) {
        audioInfo.value = audioList.value[audioPlay.value.currentPlayIndex];

        const data = {
          playId: audioInfo.value.id,
          isPlaying: audioPlay.value.isPlaying,
        };
        store.dispatch("playList/setPlayId", data);
        next();
      } else if (audioList.value.length == 0) {
        audioPlay.value.pause();
        audioPlay.value.isLoading = false;
      }
    }

    // 当音频暂停
    function onPause() {
      // console.log("暂停播放声音", audioInfo.value.id);
      const data = {
        playId: audioInfo.value.id,
        isPlaying: false,
      };
      store.dispatch("playList/setPlayId", data);
    }

    // 播放
    function onPlay() {
      // console.log("播放", audioInfo.value.id);
      const data = {
        playId: audioInfo.value.id,
        isPlaying: true,
      };
      store.dispatch("playList/setPlayId", data);
      proxy.$elMsg.success("开始播放");
    }
    // 找到存在的音频位置，并播放
    function getExistPlayInfo(data) {
      let index = audioPlay.value.currentPlayIndex;
      for (let i = 0; i < audioList.value.length; i++) {
        if (audioList.value[i].id == data.id) {
          index = i;
        }
      }
      // console.log("index", index);
      commonPlayMothod(data, index);
    }
    // 播放通用方法
    function commonPlayMothod(data, index) {
      audioInfo.value = audioList.value[index];
      audioPlay.value.currentPlayIndex = index - 1;

      audioPlay.value.isPlaying = !audioPlay.value.isPlaying;
      if (audioPlay.value.isPlaying) {
        audioPlay.value.playNext();
      } else {
        audioPlay.value.pause();
      }
      const playData = {
        playId: audioInfo.value.id,
        isPlaying: audioPlay.value.isPlaying,
      };
      store.dispatch("playList/setPlayId", playData);
    }
    return {
      audioPlay,
      audioList,
      audioInfo,
      handleBeforePlay,
      onPause,
      onPlay,
    };
  },
};
</script>
<style lang="less" scoped>
@import "@/style/play-control.less";
</style>
