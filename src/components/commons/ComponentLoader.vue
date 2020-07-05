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
    const url = $vm.url;
    // 获取模块名称
    // 如menuUrl为"/mb/secfileSign/list"，只要模块名"secfileSign"
    const componentName = ($vm.componentName = $vm.getComponentName(url));
    $vm.$options.components[componentName] = () =>
      import(`@/views${url}/index.vue`);
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
  url!: string;
  componentName!: string;

  /**
   * 获得组件名称，以后端的模块名称作为组件名称
   * @param 后端返回的模块路径
   * @returns 模块名称
   */
  private getComponentName(url: string): string {
    // 获取模块名称
    // 如url为"/mb/secfileSign/list"，只要模块名"secfileSign"
    url = url.substring(0, url.lastIndexOf("/"));
    return url.substring(url.lastIndexOf("/") + 1);
  }
}
</script>
