export interface IColumn {
  name: string;
  width: number | string;
  key: string;
  [key: string]: any;
}

export interface Props {
  columns: Array<IColumn>;
  data: [];
  maxHeight?: number;
}
