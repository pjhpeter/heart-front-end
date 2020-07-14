<template>
  <div>
    <div class="login-form">
      <Form ref="loginForm" :model="loginParams" :rules="rules">
        <FormItem class="username" prop="username">
          <Input
            type="text"
            v-model="loginParams.username"
            placeholder="用户名"
            autofocus
            @keypress.enter.prevent.stop.native="login"
          >
            <i class="iconfont icon-user" slot="prefix"></i>
          </Input>
        </FormItem>
        <FormItem class="password" prop="password">
          <Input
            type="password"
            v-model="loginParams.password"
            password
            placeholder="密码"
            @keypress.enter.prevent.stop.native="login"
          >
            <i class="iconfont icon-password" slot="prefix"></i>
          </Input>
        </FormItem>
        <Checkbox class="remember-me" v-model="rememberMe">记住我</Checkbox>
        <FormItem>
          <Button type="primary" @click="login" class="login-button"
            >登录</Button
          >
        </FormItem>
      </Form>
    </div>
    <div class="login-form-background"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Form, FormItem, Button, Input, Checkbox, Message } from "view-design";
import LoginParams from "../../../model/heart/user/LoginParams";
import UserAPI4Jeesit from "../../../api/heart/user/impl/UserAPI4Jeesite";
import UserAPI from "../../../api/heart/user/UserAPI";
import UserInfo from "../../../model/heart/user/UserInfo";

@Component({
  name: "login-form",
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Checkbox
  }
})
export default class LoginForm extends Vue {
  rememberMe = false;

  loginParams: LoginParams = {
    username: "",
    password: ""
  };

  rules: object = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };

  private login(): void {
    (this.$refs["loginForm"] as any).validate(async (valid: boolean) => {
      if (valid) {
        const userAPI: UserAPI<UserInfo> = new UserAPI4Jeesit();
        if (await userAPI.login(this.loginParams)) {
          this.$router.push("/");
        }
      }
    });
  }
}
</script>
