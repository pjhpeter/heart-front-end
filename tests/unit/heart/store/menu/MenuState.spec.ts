import Menu from "@/model/heart/menu/Menu";
import { getters } from "@/store/modules/heart/menu/getters";
import { mutations } from "@/store/modules/heart/menu/mutations";
import { MenuState } from "@/store/modules/heart/menu/types";

describe("测试mutations", () => {
  let state: MenuState;

  beforeEach(() => {
    state = {
      menuTree: []
    };
  });

  describe("测试setMenuTree方法", () => {
    it("保存menuTree", () => {
      const menuTree: Array<Menu> = [
        {
          menuUrl: "/test1",
          menuName: "测试模块1"
        },
        {
          menuUrl: "/test2",
          menuName: "测试模块2"
        }
      ];
      mutations.setMenuTree(state, menuTree);
      const stateMenuTree = state.menuTree;
      expect(stateMenuTree?.length).toBe(2);
    });
  });
});

describe("测试getters", () => {
  let state: MenuState;

  beforeAll(() => {
    state = {
      menuTree: [
        {
          menuUrl: "/test1",
          menuName: "测试模块1"
        },
        {
          menuUrl: "/test2",
          menuName: "测试模块2"
        }
      ]
    };
  });

  describe("测试getMenuTree方法", () => {
    it("获取菜单树", () => {
      const menuTree: Array<Menu> = getters.getMenuTree(state, null, {}, null);
      expect(menuTree.length).toBe(2);
    });
  });
});
