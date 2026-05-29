import type { VNodeChild } from "vue";

declare module "@vue/runtime-dom" {
  interface ReservedProps {
    children?: VNodeChild;
  }

  interface HTMLAttributes {
    children?: VNodeChild;
    className?: string;
  }

  interface SVGAttributes {
    children?: VNodeChild;
    className?: string;
  }
}

declare module "vue/jsx-runtime" {
  export namespace JSX {
    interface IntrinsicAttributes {
      children?: VNodeChild;
    }
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProps {
    children?: VNodeChild;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "stream-content": any;
  }

  namespace JSX {
    type ElementType = any;
    interface IntrinsicElements {
      "stream-content": any;
    }
  }
}

export {};
