import MenuAPI4Jeesite from "@/api/menu/impl/MenuAPI4Jeesite";
import MenuAPI from "@/api/menu/MenuAPI";
import store from "@/store";
import Menu from "@/model/menu/Menu";

// doParse是私有方法，不能外部调用，所以注释掉这个测试用例，已经经过单元测试了
// describe("测试doParse方法", () => {
//     let mockData = [
//         {
//             "childList": [
//                 {
//                     "isShow": "1",
//                     "permission": "email",
//                     "menuCode": "1164129394623102976",
//                     "sysCode": "default",
//                     "menuTarget": "",
//                     "menuIcon": "fa fa-cloud-download",
//                     "menuType": "1",
//                     "menuColor": "",
//                     "menuUrl": "/oa/a/email/inboxList",
//                     "menuName": "收件箱"
//                 },
//                 {
//                     "isShow": "1",
//                     "permission": "email",
//                     "menuCode": "1164129682394300416",
//                     "sysCode": "default",
//                     "menuTarget": "",
//                     "menuIcon": "fa fa-envelope",
//                     "menuType": "1",
//                     "menuColor": "",
//                     "menuUrl": "/oa/a/email/sndboxList",
//                     "menuName": "发件箱"
//                 }
//             ],
//             "isShow": "1",
//             "permission": "email",
//             "menuCode": "1164129143166189568",
//             "sysCode": "default",
//             "menuTarget": "",
//             "menuIcon": "fa fa-envelope-o",
//             "menuType": "1",
//             "menuColor": "",
//             "menuUrl": "/oa/a/email/inboxList",
//             "menuName": "公务邮箱"
//         }
//     ]
//     it("解析mock数据", () => {
//         let menuAPI: MenuAPI4Jeesite = new MenuAPI4Jeesite();
//         let menuTree: Array<Menu> = [];
//         menuAPI.doParse(mockData, menuTree);
//         expect(menuTree.length).toBe(1);
//         expect(menuTree[0].children?.length).toBe(2);
//     });
// });

describe("测试fetchMenuTree方法", () => {
  it("生成菜单树", async () => {
    const menuAPI: MenuAPI<Menu> = new MenuAPI4Jeesite();
    const menuTree: Array<Menu> | null = await menuAPI.fetchMenuTree();
    expect(menuTree).not.toBeNull();

    const stateMenuTree: Array<Menu> = store.getters["menu/getMenuTree"];
    expect(stateMenuTree).not.toBeNull();
  });
});
