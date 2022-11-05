<template>
  <div class="header">
    <div class="left-box">
      <span>
        <el-icon @click="nextPage"><ArrowLeftBold /></el-icon>
      </span>
      <span>
        <el-icon @click="previousPage"><ArrowRightBold /></el-icon>
      </span>
      <!-- 搜索框 -->
      <div class="search-box" v-show="route.path === '/search'">
        <div class="search-bar">
          <el-icon><Search /></el-icon>
          <input
            type="search"
            :placeholder="placeholder"
            autocomplete="off"
            class="search-input"
            v-model="inputVal"
            @keyup.enter="searchPod(inputVal)"
            @input="realTimeInputVal(inputVal)"
          />
        </div>
      </div>
    </div>
    <div class="right-box">
      <!-- 消息中心 -->
      <div class="bell-box">
        <!-- 消息图标 -->
        <span class="bell-icon">
          <el-tooltip
            effect="light"
            :content="message ? `有${message}条未读消息` : `消息中心`"
            placement="bottom"
          >
            <el-icon><bell-filled /></el-icon>
          </el-tooltip>
        </span>
        <!-- 消息小红点 -->
        <span class="btn-bell-badge" v-show="message"></span>
      </div>
      <!-- 用户中心 -->
      <!-- 头像 -->
      <div class="user-avator">
        <img
          :src="
            userinfo.avatar == null ? require(`@/assets/img/user1.png`) : userinfo.avatar
          "
        />
      </div>
      <!-- 昵称 -->
      <div>
        <el-dropdown trigger="click" class="user-name-el-box">
          <div class="user-name">
            <span class="name">
              {{ userinfo.nickName }}
            </span>
            <span>
              <el-icon><caret-bottom /></el-icon>
            </span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="doLogout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, getCurrentInstance, watch, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logout, info } from "@/api/user";
import { searchByKeyWords, searchByLink } from "@/api/search";
import emitter from "@/utils/bus";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const store = useStore();

    const showArrow = ref(true);
    const message = ref(2);
    const placeholder = "搜索播客或者输入 RSS feed";

    // const userinfo = computed(() => {
    //   return store.getters.userinfo;
    // });
    const userinfo = ref({});
    watch(
      () => store.getters.userinfo,
      (newVal, oldVal) => {
        // console.log("newVal ", newVal, "oldVal ", oldVal);
        if (JSON.stringify(newVal) == "{}") {
          // console.log("nnnn");
          getUserInfo();
        } else if (newVal != oldVal) {
          userinfo.value = newVal;
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    // 加载用户基本数据
    function getUserInfo() {
      info().then((result) => {
        const rslt = result.data;
        if (rslt.success) {
          store.dispatch("user/setUserinfo", rslt.data);
          return;
        }
      });
      return;
    }

    // 下一页
    function nextPage() {
      console.log("nextPage");
    }
    // 上一页
    function previousPage() {
      console.log("previousPage");
    }
    // 搜索
    let inputVal = ref("");
    function searchPod(val) {
      // console.log("发送数据 ", val);
      if (val.includes("http") && val.length > 5) {
        // 地址解析
        searchByLink(val).then((result) => {
          const rslt = result.data;
          if (rslt.success) {
            console.log(" rslt", rslt);
            emitter.emit("searchVal", rslt.data);
          } else {
            proxy.$elMsg.error(rslt.msg);
          }
        });
      } else {
        // 关键词搜索
        searchByKeyWords(val).then((result) => {
          if (result.status === 200) {
            emitter.emit("searchVal", result.data);
          }
        });
      }
    }

    // 判断输入框是否有数据
    function realTimeInputVal(val) {
      if (val === "" && val.length === 0) {
        // console.log("没有数据");
        emitter.emit("searchVal", "");
      }
    }

    // 退出
    const doLogout = () => {
      // 清空web数据
      localStorage.clear();
      sessionStorage.clear();
      proxy.$elMsg.success("再见");
      router.push({ path: "/into" });
      logout().then((result) => {});
    };
    return {
      showArrow,
      message,
      nextPage,
      previousPage,
      placeholder,
      route,
      searchPod,
      inputVal,
      doLogout,
      userinfo,
      realTimeInputVal,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 70px;
  padding: 5px 0;
  width: 100%;
  font-size: 22px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left-box {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    padding: 0 21px;
    span {
      cursor: pointer;
    }
    span:first-child {
      margin-right: 20px;
    }
    .search-box {
      margin-left: 24px;
      .search-bar {
        height: 42px;
        min-width: 280px;
        border-radius: 21px;
        display: flex;
        flex-direction: row;
        align-items: center;
        i {
          width: 21px;
          height: 21px;
          margin-left: 12px;
          margin-right: 12px;
          flex: 0;
          flex-basis: 21px;
          flex-shrink: 0;
        }
        .search-input {
          height: 100%;
          width: 86%;
          padding-right: 12px;
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }
  .right-box {
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    // 消息中心
    .bell-box {
      position: relative;
      .btn-bell-badge {
        position: absolute;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #f56c6c;
        top: 0;
        right: -2px;
      }
    }
    // 用户头像
    .user-avator {
      margin-left: 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    // 用户信息
    .user-name-el-box {
      padding: 0 50px 0 10px;
      .user-name {
        display: inline-block;
        cursor: pointer;
        color: @black-color;
        .name {
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 100px;
        }
      }
    }
  }
}
</style>
