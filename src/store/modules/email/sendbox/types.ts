import EmailInfo4Jeesite from "@/model/example/send/EmailInfo4Jeesite";

export interface EmailState {
  sendList: Readonly<Array<EmailInfo4Jeesite>>;
}
