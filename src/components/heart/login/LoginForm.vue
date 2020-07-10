<template>
  <div>
    <div class="login-form">
      <Form ref="loginForm" :model="loginParams" :rules="rules">
        <FormItem class="username" prop="username">
          <Input
            type="text"
            v-model="loginParams.username"
            placeholder="用户名"
          >
            <i class="iconfont icon-user" slot="prefix"></i>
          </Input>
        </FormItem>
        <FormItem class="password" prop="password">
          <Input
            type="password"
            v-model="loginParams.password"
            placeholder="密码"
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

  login(): void {
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

<style lang="scss">
.login-form {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  height: 320px;
  width: 320px;
  background-color: rgba($color: white, $alpha: 0.7);
  border-radius: 5px;
  padding: 30px;
  z-index: 1;
  box-shadow: 0 0 3px $border;
  .ivu-form {
    .username.ivu-form-item {
      margin-bottom: 40px;
    }
    .ivu-form-item {
      .ivu-form-item-content {
        line-height: 50px;
        .ivu-input {
          height: 50px;
          font-size: 16px;
          padding-left: 40px;
        }
        .ivu-input-prefix {
          width: 40px;
          i {
            color: rgba($color: $primary, $alpha: 0.7);
            line-height: 50px;
            font-size: 25px;
          }
        }
      }
      .login-button {
        width: 100%;
        height: 50px;
        font-size: 18px;
      }
    }
    .remember-me {
      margin-bottom: 5px;
    }
  }
}
.login-form-background {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  height: 320px;
  width: 320px;
  border-radius: 5px;
  background: url("../../../assets/heart/login/images/login.jpg") center / 100%
    100% no-repeat;
  z-index: -1;
  -webkit-filter: blur(5px);
  filter: blur(5px);
}
</style>
