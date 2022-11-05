<template>
  <div class="login-container">
    <div class="login-intro">
      <div class="title">
        <label>ZOYO</label>
      </div>
      <div class="desc">
        <label>
          欢迎{{ isLogin ? "来到" : "加入" }} ZOYO 在线播客的宇宙。ZOYO
          听见更多有趣有料的声音。
        </label>
      </div>
      <div class="login-bg">
        <transition name="cotton">
          <img src="@/assets/img/galaxy1.png" v-if="isLogin" />
          <img src="@/assets/img/galaxy2.png" v-else />
        </transition>
      </div>
    </div>
    <div class="login-form" :style="isLogin ? 'height: 326px' : 'height: 445px'">
      <transition name="cc">
        <el-form
          :model="loginform"
          class="form-box log-form"
          :rules="rules"
          ref="loginformref"
          status-icon
          v-if="isLogin"
        >
          <!-- 登录 -->
          <div class="login-title">登录</div>
          <el-form-item prop="account">
            <el-input placeholder="账号" v-model.trim="loginform.account">
              <template #prepend>
                <el-icon :size="20"><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="loginform.password" show-password placeholder="密码">
              <template #prepend>
                <el-icon :size="20"><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="onLogin"> 登录 </el-button>
          </el-form-item>
          <div class="additional-box">
            <div class="forget widget-box">忘记密码</div>
            <div class="register widget-box" @click="goRegister(loginformref)">注册</div>
          </div>
        </el-form>
        <!-- 注册 -->
        <el-form
          :model="registerform"
          class="form-box reg-form"
          :rules="rules"
          ref="registerformref"
          status-icon
          @keyup.enter="onSubmit"
          v-else
        >
          <div class="login-title">注册</div>
          <el-form-item prop="nickname">
            <el-input placeholder="昵称" v-model="nickname">
              <template #prepend>
                <el-icon :size="20"><MostlyCloudy /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="account">
            <el-input placeholder="账号（手机号）" v-model.trim="account">
              <template #prepend>
                <el-icon :size="20"><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model.trim="password" show-password placeholder="密码">
              <template #prepend>
                <el-icon :size="20"><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="cypher">
            <el-input v-model.trim="cypher" show-password placeholder="再次输入密码">
              <template #prepend>
                <el-icon :size="20"><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="onSubmit"> 注册 </el-button>
          </el-form-item>
          <div class="additional-box">
            <div class="forget widget-box">忘记密码</div>
            <div class="register widget-box" @click="goLogin(registerformref)">登录</div>
          </div>
        </el-form>
      </transition>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import {
  ref,
  reactive,
  onMounted,
  toRefs,
  unref,
  getCurrentInstance,
  nextTick,
} from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import { register, login, info } from "@/api/user";

export default {
  setup(props) {
    const router = useRouter();
    const loginformref = ref(null);
    const registerformref = ref(null);
    const isLogin = ref(true);
    const { proxy } = getCurrentInstance();

    const loginform = reactive(
      // JSON.stringify(
      {
        account: "192",
        password: "123",
      }
      // )
    );
    const registerform = reactive({
      nickname: "雨天忘带^伞",
      account: "192",
      password: "123",
      cypher: "123",

      // nickname: "",
      // account: "",
      // password: "",
      // cypher: "",
    });

    const rules = reactive({
      account: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, message: "密码长度最少为3位", trigger: "blur" },
      ],
      nickname: [
        { required: true, message: "请输入账昵称", trigger: "blur" },
        {
          min: 2,
          max: 16,
          message: "昵称长度最少2位，最多16位",
          trigger: "blur",
        },
      ],
      cypher: [
        { required: true, message: "请输密码", trigger: "blur" },
        {
          required: true,
          validator: validatePass,
          trigger: "blur",
        },
      ],
    });

    onMounted(() => {
      //   onCaptcha();
    });

    const goRegister = (loginformref) => {
      isLogin.value = false;
      const form = unref(loginformref);
      if (!form) {
        return;
      }
      form.resetFields();
    };

    const goLogin = (registerformref) => {
      isLogin.value = true;
      const form = unref(registerformref);
      if (!form) {
        return;
      }
      form.resetFields();
    };

    // 登录
    const onLogin = () => {
      loginformref.value.validate((valid) => {
        if (valid) {
          const data = {
            nickname: loginform.nickname,
            account: loginform.account,
            password: md5(md5(loginform.password + "dfagrwe@a2")),
          };

          login(data).then((result) => {
            const rslt = result.data;
            if (rslt.success) {
              store.dispatch("user/setToken", rslt.data);
              proxy.$elMsg.success("登录成功");

              router.push({ path: "/list" });
              nextTick(() => {
                getUserInfo();
              });
            } else {
              proxy.$elMsg.error(rslt.msg);
              if (rslt.msg.includes("不存在")) {
                goRegister();
              }
            }
          });
        } else {
          return;
        }
      });
    };
    // 注册
    const onSubmit = () => {
      registerformref.value.validate((valid) => {
        if (valid) {
          const data = {
            nickname: registerform.nickname,
            account: registerform.account,
            password: md5(md5(registerform.password + "dfagrwe@a2")),
          };

          register(data).then((result) => {
            if (result.data.success) {
              proxy.$elMsg.success("注册成功");
              goLogin();
            } else {
              proxy.$elMsg.error(result.data.msg);
            }
          });
        } else {
          return;
        }
      });
    };

    function validatePass(rule, value, callback) {
      if (value !== registerform.password) {
        return callback(new Error("两次输入的密码不一样"));
      } else {
        return callback();
      }
    }
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

    return {
      loginformref,
      loginform,
      rules,
      onLogin,
      goRegister,
      goLogin,
      onSubmit,
      isLogin,
      registerformref,
      registerform,
      ...toRefs(registerform),
    };
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .login-intro {
    display: flex;
    flex-direction: column;
    width: 500px;
    flex: 0 1 auto;
    .title {
      font-size: 30px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 16px;
      margin-bottom: 10px;
      width: 360px;
      label {
        text-overflow: ellipsis;
        white-space: pre-wrap;
        overflow: hidden;
      }
    }
    .login-bg {
      width: 360px;
      height: 360px;
      margin-top: 10px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 6px;
      }
    }
  }

  .login-form {
    box-shadow: 0 -2px 10px #d1cfcf;
    flex: 0 1 auto;
    padding: 20px;
    border-radius: 6px;
    box-sizing: border-box;
    height: 300px;
    transition: all 1s ease-in-out;
    overflow: hidden;

    .form-box {
      .login-title {
        display: flex;
        justify-content: center;
        margin-bottom: 35px;
        font-size: 24px;
        letter-spacing: 6px;
      }
      :deep(.el-input) {
        width: 400px;
        height: 36px;
        margin-top: 5px;
        .el-input__inner {
          padding: 0 10px;
          height: 45px;
          line-height: 45px;
          color: #666;
          font-size: 16px;
        }
      }
      .submit {
        :deep(.el-button--primary) {
          width: 100%;
          margin-top: 10px;
          padding: 10px 10px;
          letter-spacing: 8px;
          font-size: 18px;
          height: 36px;
        }
      }
      .additional-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #909399;
        padding: 10px 0;
        .widget-box {
          cursor: pointer;
        }
        .widget-box:hover {
          color: #000000;
        }
        .widget-box:active {
          font-weight: 600;
        }
      }
    }
  }
}
.cotton-enter-active {
  animation: staleft 1s ease-in-out;
}
.cotton-leave-active {
  animation: lealeft 1s ease-in-out;
}
@keyframes staleft {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(-360px);
  }
}
@keyframes lealeft {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-800px);
  }
}
.cc-enter-active {
  animation: sta 1s ease-in-out;
}
.cc-leave-active {
  animation: lea 1s ease-in-out;
}
@keyframes sta {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: v-bind('isLogin? "translateY(-404px)":"translateY(-286px)"');
  }
}
@keyframes lea {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-500px);
  }
}
</style>
