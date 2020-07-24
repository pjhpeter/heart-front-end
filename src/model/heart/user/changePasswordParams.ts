/**
 * 修改密码提交数据
 * @author 彭嘉辉
 */
export default interface ChangePasswordParams {
  // 旧密码
  oldPassword: string;
  // 新密码
  newPassword: string;
  // 验证密码
  confirmPassword: string;
}
