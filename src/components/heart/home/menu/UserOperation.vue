<template>
  <div class="user-operation-box">
    <div class="user-operation">
      <img class="avatar" :src="avatarUrl" />
      <Menu class="operations" width="auto" @on-select="onMenuItemClick">
        <MenuItem name="individuation">
          <i class="iconfont icon-individuation"></i>
          个性化
        </MenuItem>
        <MenuItem name="editPassword">
          <i class="iconfont icon-edit"></i>
          修改密码
        </MenuItem>
        <MenuItem name="lock">
          <i class="iconfont icon-lock"></i>
          锁定
        </MenuItem>
      </Menu>
      <Button class="logout-button" @click="logout">退出</Button>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 用户操作组件
 * @author 彭嘉辉
 */
import { Vue, Component } from "vue-property-decorator";
import { WALLPAPER_URLS } from "../../../../constants/heart/values/Global";
import { Menu, MenuItem, Button, Modal } from "view-design";
import UserAPI from "../../../../api/heart/user/UserAPI";
import UserInfo4Jeesite from "../../../../model/heart/user/UserInfo4Jeesite";
import UserAPI4Jeesit from "../../../../api/heart/user/impl/UserAPI4Jeesite";
import ModalInfo from "../../../../model/heart/global/ModalInfo";
import Commons from "../../../../utils/heart/Commons";

// ts不识别require函数，必须要这样声明一下
declare function require(img: string): string;

@Component({
  name: "user-operation",
  components: {
    Menu,
    MenuItem,
    Button,
    Modal
  }
})
export default class UserOperation extends Vue {
  // 用户头像路径
  private avatarUrl: string = require("../../../../assets/heart/home/images/avatar.png");
  // 已打开的个性化模态框id
  private individuationModalId?: number;

  /**
   * 点击操作项
   */
  private onMenuItemClick(name: string): void {
    if (name === "individuation") {
      // 切换壁纸
      this.showIndividuationModal();
    } else if (name === "editPassword") {
      // TODO:修改密码
    } else if (name === "lock") {
      // 锁定
      this.$store.commit("globals/setLocked", true);
      // 清除token，防止重新登录时随便输入密码都正确
      this.$store.commit("user/setToken", "");
    }
  }

  /**
   * 打开个性化模态框
   */
  private showIndividuationModal(): void {
    // 模拟点击最外层div，关闭开始菜单
    document.getElementById("app")!.click();
    // 判断个性化模态框是否已经打开
    if (this.individuationModalId) {
      const modal: any = Commons.findModalById(this.individuationModalId);
      if (modal) {
        // 如果已经被打开，则不再次打开，只是让其显示
        modal.isShow = true;
        // 模拟点击模态框中ViewUI的Modal组件
        modal.$children[0].handleClickModal();
        return;
      }
    }
    const modalInfo: ModalInfo = {
      url: "/heart/home/menu/IndividuationModal.vue",
      backgroundColor: Commons.getIconColor(),
      title: "个性化",
      width: 650,
      className: "individuation",
      resizable: false,
      enabledFuscreen: false
    };
    this.individuationModalId = Commons.showModule(modalInfo);
  }

  /**
   * 登出
   */
  private logout(event: any): void {
    // 模拟点击最外层div，关闭开始菜单
    document.getElementById("app")!.click();
    // 确认是否要退出
    (Modal as any).confirm({
      title: "提醒",
      content: "确认退出系统吗？",
      onOk: async () => {
        // 退出
        const userAPI: UserAPI<UserInfo4Jeesite> = new UserAPI4Jeesit();
        if (await userAPI.logout()) {
          // 回到退出页面
          this.$router.push("/login");
        }
      }
    });
  }
}
</script>

<style lang="scss">
.individuation {
  .ivu-modal-body {
    height: 500px !important;
  }
}
</style>
