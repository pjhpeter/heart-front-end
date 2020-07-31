<template>
  <div class="lock">
    <transition name="fade">
      <div
        class="lock-image"
        v-if="showLockImage"
        @click="showLoginForm"
        :style="backgroundStyles"
      >
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
            <p
              class="username"
              v-text="diplayUsername"
              v-if="!showUsername"
            ></p>
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
                  @keypress.enter.prevent.stop.native="login"
                ></Input>
              </FormItem>
              <FormItem prop="password">
                <Input
                  v-model="loginParams.password"
                  type="password"
                  placeholder="密码"
                  autofocus
                  @keypress.enter.prevent.stop.native="login"
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
        <div
          class="login-form-background-lock"
          :style="blurBackgroundStyles"
        ></div>
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
import UserInfo4Jeesite from "../../../model/heart/user/UserInfo4Jeesite";
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
  private time = "";
  private day = "";
  // 显示在中间的用户名
  private diplayUsername = "";
  // 是否显示登录表单
  private showLockImage = true;
  // 是否显示登录账号，使用其他用户登录时需要
  private showUsername = false;

  private loginParams: LoginParams = {
    username: "",
    password: ""
  };

  private rules: object = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  // 锁屏样式
  private backgroundStyles: any = {
    background: `url(${this.$store.getters["user/getLockImageUrl"]}) center / 100% 100% no-repeat`
  };
  // 毛玻璃效果样式
  private blurBackgroundStyles: any = {
    background: `url(${this.$store.getters["user/getLockImageUrl"]}) center / 100% 100% no-repeat fixed`
  };

  mounted(): void {
    this.now();
    const timer: number = setInterval(this.now, 1000);
    this.$once("hook:beforeDestroy", () => {
      // 销毁组件前清空计时器
      clearInterval(timer);
    });
    // 初始化
    const userInfo: UserInfo4Jeesite = this.$store.getters["user/getUser"];
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
    (this.$refs["loginFormLock"] as any).validate(async (valid: boolean) => {
      if (valid) {
        const userAPI: UserAPI<UserInfo4Jeesite> = new UserAPI4Jeesit();
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
