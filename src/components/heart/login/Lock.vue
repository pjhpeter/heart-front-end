<template>
  <div class="lock">
    <transition name="fade">
      <div class="lock-image" v-if="showLockImage" @click="showLoginForm">
        <div class="date-time">
          <p class="time" v-text="time"></p>
          <p class="date" v-text="day"></p>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="login-form-box" v-if="!showLockImage">
        <div class="login-form-lock">
          <div class="form-content">
            <div class="user-icon">
              <i class="iconfont icon-user-lock"></i>
            </div>
            <p class="username" v-text="diplayUsername"></p>
            <Form
              class="form-lock"
              ref="loginFormLock"
              :model="loginParams"
              :rules="rules"
            >
              <FormItem prop="username" v-if="showUsername">
                <Input
                  v-model="loginParams.username"
                  type="text"
                  placeholder="用户名"
                ></Input>
              </FormItem>
              <FormItem prop="password">
                <Input
                  v-model="loginParams.password"
                  type="password"
                  placeholder="密码"
                >
                  <Button type="primary" slot="suffix" @click="login">
                    <i class="iconfont icon-arrow-right"></i>
                  </Button>
                </Input>
              </FormItem>
              <p class="other-user" @click="useOtherUser">使用其他用户登录</p>
            </Form>
          </div>
        </div>
        <div class="login-form-background-lock"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 * 锁屏组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { Form, FormItem, Input, Button } from "view-design";
import LoginParams from "../../../model/heart/user/LoginParams";
import UserAPI from "../../../api/heart/user/UserAPI";
import UserInfo from "../../../model/heart/user/UserInfo";
import UserAPI4Jeesit from "../../../api/heart/user/impl/UserAPI4Jeesite";

@Component({
  name: "lock",
  components: {
    Form,
    FormItem,
    Input,
    Button
  }
})
export default class Lock extends Vue {
  time = "";
  day = "";
  // 显示在中间的用户名
  diplayUsername = "";
  // 是否显示登录表单
  showLockImage = true;
  // 是否显示登录账号，使用其他用户登录时需要
  showUsername = false;

  loginParams: LoginParams = {
    username: "",
    password: ""
  };

  rules: object = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  mounted(): void {
    this.now();
    setInterval(this.now, 1000);
    // 初始化
    const userInfo: UserInfo = this.$store.getters["user/getUser"];
    if (userInfo) {
      this.diplayUsername = userInfo.userName;
      this.loginParams.username = userInfo.loginCode;
    }
  }

  /**
   * 计算当前事件
   */
  private now(): void {
    const dayArr: Array<string> = ["日", "一", "二", "三", "四", "五", "六"];
    const now: Date = new Date();
    const hours: number = now.getHours();
    const minutes: number = now.getMinutes();
    const dayOfWeek: number = now.getDay();
    this.time = `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }`;
    this.day = `${now.getMonth() + 1}月${now.getDate()}日，星期${
      dayArr[dayOfWeek]
    }`;
  }

  /**
   * 显示登录表单
   */
  private showLoginForm(): void {
    this.showLockImage = false;
  }

  /**
   * 登录
   */
  private login(): void {
    // TODO:按回车登录，不知道为什么一直不行
    (this.$refs["loginFormLock"] as any).validate(async (valid: boolean) => {
      if (valid) {
        const userAPI: UserAPI<UserInfo> = new UserAPI4Jeesit();
        if (await userAPI.login(this.loginParams)) {
          if (this.showUsername) {
            // 如果用其他用户登录，需要把打开的窗口全部关闭
            this.$store.commit("globals/clearOpenedInfoList");
          }
          this.$router.push("/");
        }
      }
    });
  }

  /**
   * 使用其他用户登录
   */
  useOtherUser(): void {
    this.loginParams.username = "";
    this.showUsername = true;
  }
}
</script>

<style lang="scss">
.lock {
  height: 100%;
  .lock-image {
    height: 100%;
    background: url("../../../assets/heart/login//images/lock.jpg") center /
      100% 100% no-repeat;
    .date-time {
      position: absolute;
      left: 60px;
      bottom: 50px;
      color: white;
      .time {
        font-size: 90px;
      }
      .date {
        font-size: 50px;
      }
    }
  }
  .login-form-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .login-form-lock {
      height: 100%;
      z-index: 1;
      background-color: rgba($color: black, $alpha: 0.1);
      .form-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 300px;
        width: 300px;
        color: white;
        .user-icon {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba($color: $content, $alpha: 0.8);
          text-align: center;
          line-height: 150px;
          height: 150px;
          width: 150px;
          border-radius: 75px;
          .icon-user-lock {
            font-size: 90px;
          }
        }
        .username {
          font-size: 40px;
          text-align: center;
        }
        .form-lock {
          padding: 10px;
          .ivu-input-suffix {
            width: 40px;
            button {
              width: 40px;
              padding: 0;
              .icon-arrow-right {
                color: white;
              }
            }
          }
        }
        .other-user {
          cursor: pointer;
          text-align: center;
          font-size: 15px;
        }
      }
    }
    .login-form-background-lock {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      background: url("../../../assets/heart/login//images/lock.jpg") center /
        100% 100% no-repeat;
      -webkit-filter: blur(10px);
      filter: blur(10px);
      z-index: -1;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
