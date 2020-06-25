import { mutations } from "@/heart/store/modules/menu/mutations";
import { getters } from "@/heart/store/modules/menu/getters";
import { MenuState } from "@/heart/store/modules/menu/types";
import { Menu } from "@/heart/model/menu/Menu";
import VueRouter from "vue-router";
import { createLocalVue } from "@vue/test-utils";
import { VueConstructor } from "vue/types/umd";

let localValue: VueConstructor<Vue>;
let router: VueRouter;
beforeAll(() => {
  localValue = createLocalVue();
  localValue.use(VueRouter);
  router = new VueRouter();
});

describe("测试mutations", () => {
  let state: MenuState;

  beforeEach(() => {
    state = {
      menuTree: null,
      router: null
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

  describe("测试setRouter方法", () => {
    it("保存router", () => {
      mutations.setRouter(state, router);
      const stateRouter = state.router;
      expect(stateRouter).not.toBeNull();
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
      ],
      router
    };
  });

  describe("测试getMenuTree方法", () => {
    it("获取菜单树", () => {
      const menuTree: Array<Menu> = getters.getMenuTree(state, null, {}, null);
      expect(menuTree.length).toBe(2);
    });
  });

  describe("测试getRouter方法", () => {
    it("获取router", () => {
      const router: VueRouter = getters.getRouter(state, null, {}, null);
      expect(router).not.toBeNull();
    });
  });
});
