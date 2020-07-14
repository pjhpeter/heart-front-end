// 如果不定义一个接口，通过THEMES[key]取值会报错
declare interface THEMES {
  [key: string]: string;
}

/**
 * 主题颜色映射
 * @author 彭嘉辉
 */
export const THEMES: THEMES = {
  red: "#C14253",
  blue: "#2d8cf0",
  purple: "#7952b3",
  black: "#314351"
};
