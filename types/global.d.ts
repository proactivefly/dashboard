import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType
} from 'vue';

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }

  // 图片的/* images.d.ts文件 */
  declare module '*.svg';
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.bmp';
  declare module '*.tiff';
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
