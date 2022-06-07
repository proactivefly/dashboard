export interface IWordItem {
  name: string; //名字
  light?: boolean; //是否突出显示
  id: string | number; //信息
  tag?: string; //字母
}

export interface IMoveToTagConfig {
  id: string | number; // ider
  index: number; // 词云数组中索引
  time?: number; //移动时间，默认500
  callback?: () => void; //移动后回调
  active?: boolean; //移动过程中是否高亮，默认true
}
