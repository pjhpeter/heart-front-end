<template>
  <div class="login">
    <Layout class="layout">
      <Header class="header">
        <img class="logo" src="../../../assets/logo.png" alt="logo" />
        <p class="title">heart-随心所欲而不逾矩</p>
      </Header>
      <Content class="content">
        <login-form />
      </Content>
      <Footer class="footer">
        <p class="footer-text">Copyright @2019 - 2020 All Rights Reserved</p>
        <p class="footer-text">org-by-heart</p>
      </Footer>
    </Layout>
  </div>
</template>

<script lang="ts">
/**
 * 登录页面组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { Layout, Header, Content, Footer } from "view-design";

@Component({
  name: "login",
  components: {
    Layout,
    Header,
    Content,
    Footer,
    LoginForm: () => import("../../../components/heart/login/LoginForm.vue")
  }
})
export default class Login extends Vue {}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  .layout {
    height: 100%;
    .header {
      height: 12%;
      position: relative;
      background-color: white;
      .logo {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        height: 45px;
        width: 45px;
      }
      .title {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        left: 95px;
        margin-left: 20px;
        color: $title;
        font-size: 30px;
      }
    }
    .content {
      height: 76%;
      background: url("../../../assets/heart/login/images/login.jpg") center /
        100% 100% no-repeat;
    }
    .footer {
      height: 12%;
      background-color: white;
      text-align: center;
      color: $content;
    }
  }
}
</style>
