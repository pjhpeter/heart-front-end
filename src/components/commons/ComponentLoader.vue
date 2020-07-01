<script lang="ts">
/**
 * 动态组件异步加载器
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement, RenderContext, VNode } from "vue";

@Component({
  name: "component-loader",
  created() {
    // 动态注册组件
    const $vm = this as any;
    const menuUrl = $vm.menuUrl;
    // 获取模块名称
    // 如menuUrl为"/mb/secfileSign/list"，只要模块名"secfileSign"
    const componentName = ($vm.componentName = $vm.getComponentName(menuUrl));
    $vm.$options.components[componentName] = () =>
      import(`@/views${menuUrl}/index.vue`);
  },
  render(createElement: CreateElement): VNode {
    // 动态渲染组件
    const $vm = this as any;
    return createElement($vm.componentName);
  }
})
export default class ComponentLoader extends Vue {
  @Prop({
    type: String,
    required: true,
    default: "/error/404/page"
  })
  menuUrl!: string;
  componentName!: string;

  /**
   * 获得组件名称，以后端的模块名称作为组件名称
   */
  private getComponentName(menuUrl: string): string {
    // 获取模块名称
    // 如menuUrl为"/mb/secfileSign/list"，只要模块名"secfileSign"
    menuUrl = menuUrl.substring(0, menuUrl.lastIndexOf("/"));
    return menuUrl.substring(menuUrl.lastIndexOf("/") + 1);
  }
}
</script>
