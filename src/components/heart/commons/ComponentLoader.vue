<script lang="ts">
/**
 * 动态组件异步加载器
 * @author 彭嘉辉
 */
import { Vue, Component, Prop } from "vue-property-decorator";
import { CreateElement, RenderContext, VNode } from "vue";

@Component({
  name: "component-loader"
})
export default class ComponentLoader extends Vue {
  @Prop({
    type: String,
    required: true,
    default: "/error/404/page"
  })
  url!: string;
  componentName!: string;

  created(): void {
    // 动态注册组件
    // 获取模块名称
    // 如menuUrl为"/mb/secfileSign/list"，只要模块名"secfileSign"
    const componentName = (this.componentName = this.getComponentName(
      this.url
    ));
    if (this.url.indexOf(".vue") === -1) {
      // 不以.vue结尾，说明是模块入口组件，url是后端返回的访问地址，从views中读取组件
      (this as any).$options.components[componentName] = () =>
        import(`@/views${this.url}/index.vue`);
    } else {
      // 以.vue结尾，为模块中的子组件，从components中读取组件。
      (this as any).$options.components[componentName] = () =>
        import(`@/components${this.url}`);
    }
  }

  render(createElement: CreateElement): VNode {
    // 动态渲染组件
    const $vm = this as any;
    return createElement($vm.componentName);
  }

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
