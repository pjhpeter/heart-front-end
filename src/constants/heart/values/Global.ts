/**
 * 全局常量放这里
 * @author 彭嘉辉
 */

/**
 * 菜单icon背景色
 */
export const MENU_ICON_COLORS: Array<string> = [
  "#C25D6B",
  "#2DB7F5",
  "#19BE6B",
  "#FF9900"
];

/**
 * 桌面快捷方式找不到对应菜单时，说明模块已经不存在，快捷方式设置为这个颜色
 */
export const LOSS_MENU_COLOR = "#808695";

export const WALLPAPER_URLS: Array<string> = [
  "/wallpapers/background0.jpg",
  "/wallpapers/background1.jpg",
  "/wallpapers/background2.jpg",
  "/wallpapers/background3.jpg"
];

// 如果不定义一个接口，通过THEMES[key]取值会报错
declare interface THEMES {
  [key: string]: string;
}

/**
 * 主题颜色映射
 */
export const THEMES: THEMES = {
  red: "#C14253",
  blue: "#2d8cf0",
  purple: "#7952b3",
  black: "#314351"
};
