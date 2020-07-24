<template>
  <div class="changePassword-modal">
    <Form
      :model="psdItem"
      :label-width="0"
      :rules="ruleValidate"
      ref="passwordForm"
    >
      <FormItem label="" prop="oldPassword">
        <Input
          v-model="psdItem.oldPassword"
          placeholder="请输入旧密码"
          type="password"
          clearable
          autofocus
        />
      </FormItem>
      <FormItem label="" prop="newPassword">
        <Input
          v-model="psdItem.newPassword"
          placeholder="请输入新密码"
          type="password"
          clearable
        />
      </FormItem>
      <FormItem label="" prop="confirmPassword">
        <Input
          v-model="psdItem.confirmPassword"
          placeholder="请输入验证新密码"
          type="password"
          clearable
        />
      </FormItem>
      <!-- <FormItem>
        <Button type="primary" @click="submit">保存</Button>
        <Button type="default" @click="restForm">重置</Button>
      </FormItem> -->
    </Form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ChangePasswordParams from "../../../../model/heart/user/changePasswordParams";
import UserAPI4Jeesit from "../../../../api/heart/user/impl/UserAPI4Jeesite";
import UserAPI from "../../../../api/heart/user/UserAPI";
import UserInfo4Jeesite from "../../../../model/heart/user/UserInfo4Jeesite";
import { Message, FormItem, Form, Input, Button } from "view-design";
import { callbackify } from "util";
@Component({
  name: "changePassword-modal",
  components: {
    FormItem,
    Form,
    Input,
    Button,
    Message
  }
})
export default class ChangePasswordModal extends Vue {
  psdItem: ChangePasswordParams = {
    oldPassword: "" /* 旧密码 */,
    newPassword: "" /* 新密码 */,
    confirmPassword: "" /* 验证密码 */
  };
  ruleValidate: object = {
    oldPassword: [
      {
        required: true,
        message: "请输入旧密码",
        trigger: "blur"
      }
    ],
    newPassword: [
      {
        required: true,
        message: "请输入新密码",
        trigger: "blur"
      },
      // { validator: this.checkNewPassword, trigger: ["change", "blur"] },
      { validator: this.checkNewPassword, trigger: ["change", "blur"] }
    ],
    confirmPassword: [
      {
        required: true,
        message: "请再次输入新密码",
        trigger: "blur"
      },
      { validator: this.checkConfirmPassword, trigger: ["change", "blur"] }
    ]
  };
  /* 验证密码思路：
      前提：只需要验证相同或不同，别的条件不需要（如需要多少位这种），以新密码作为验证的基准(逐层向下)
      1.旧密码：只管输入，不做验证
      2.新密码：验证是否与旧密码相同
      3.验证密码：验证是否与新密码相同，并且调用新密码的 验证
      ?**4.新密码修改后，与验证密码不同，需要在新密码调用验证面密码，验证新与验证密码是否相同
      (this.$refs.passwordForm as any).validateField("confirmPassword");
  */
  private checkNewPassword(rule, value, callback) {
    const con = value == this.psdItem.oldPassword && this.psdItem.oldPassword;
    if (con) {
      callback(new Error("新密码与旧密码相同！"));
    }
    if (this.psdItem.confirmPassword) {
      (this.$refs.passwordForm as any).validateField("confirmPassword");
    }
    callback();
  }
  // private checkNewPassword(rule, value, callback) {
  //   let con =
  //     value !== this.psdItem.confirmPassword && this.psdItem.confirmPassword;
  //   if (con) {
  //     callback(new Error("新密码与验证密码不一致！"));
  //   }
  //   callback();
  // }
  private checkConfirmPassword(rule, value, callback) {
    let con;
    if (callback) {
      con = value !== this.psdItem.newPassword && this.psdItem.newPassword;
      if (con) {
        callback(new Error("验证密码与新密码不一致！"));
      }
      // (this.$refs.passwordForm as any).validateField("newPassword");
      callback();
    }
  }
  private submit(): void {
    (this.$refs.passwordForm as any).validate(async (valid: boolean) => {
      if (valid) {
        const userAPI: UserAPI<UserAPI4Jeesit> = new UserAPI4Jeesit();
        if (await userAPI.changePassword(this.psdItem)) {
          /* 这里返回boolean，true或false，false有捕捉，不用管
            定时器3秒后退出系统logout()，回到登录页this.$router.push("/login");
          */
          setTimeout(() => {
            userAPI.logout();
            this.$router.push("/login");
          }, 3000);
        }
      }
    });
  }
  restForm() {
    (this.$refs.passwordForm as any).resetFields();
  }
}
</script>
