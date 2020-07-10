import { GlobalState } from "@/store/modules/heart/globals/types";
import { mutations } from "@/store/modules/heart/globals/mutations";
import { getters } from "@/store/modules/heart/globals/getters";
import OpenedInfo from "@/model/heart/global/OpenedInfo";

describe("测试mutations", () => {
  let globalState: GlobalState;
  let openedInfo: OpenedInfo;
  beforeEach(() => {
    globalState = {
      openedList: [],
      showedFooter: true,
      locked: true
    };
    openedInfo = {
      id: 1,
      backgroundColor: "#FFFFFF",
      url: "aa",
      title: "呵呵",
      active: true
    };
  });

  describe("测试addOpenedInfo方法", () => {
    it("添加数据", () => {
      mutations.addOpenedInfo(globalState, openedInfo);
      expect(globalState.openedList.length).toBe(1);
    });
  });

  describe("测试ramoveOpenedInfo方法", () => {
    it("删除数据", () => {
      globalState.openedList?.push(openedInfo);
      mutations.ramoveOpenedInfo(globalState, openedInfo);
      expect(globalState.openedList.length).toBe(0);
    });
  });

  describe("测试setShowedFooter方法", () => {
    it("设置为不显示", () => {
      mutations.setShowedFooter(globalState, false);
      expect(globalState.showedFooter).toBeFalsy();
    });
  });
});

describe("测试getters", () => {
  let globalState: GlobalState;
  beforeEach(() => {
    globalState = {
      openedList: [
        {
          id: 1,
          backgroundColor: "#FFFFFF",
          url: "aa",
          title: "呵呵",
          active: true
        },
        {
          id: 2,
          backgroundColor: "#FFFFFF",
          url: "aa",
          title: "嘻嘻",
          active: false
        }
      ],
      showedFooter: true,
      locked: true
    };
  });

  describe("测试getOpenedList方法", () => {
    it("获取列表", () => {
      const openedList: Array<OpenedInfo> = getters.getOpenedList(
        globalState,
        null,
        {},
        null
      );
      expect(openedList.length).toBe(2);
    });
  });

  describe("测试isShowFooter方法", () => {
    it("获取底部栏显示状态", () => {
      const showedFooter = getters.isShowedFooter(globalState, null, {}, null);
      expect(showedFooter).toBeTruthy();
    });
  });
});
