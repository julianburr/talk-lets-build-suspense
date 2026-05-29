/** @jsxImportSource vue */

import { defineComponent, VNode } from "vue";

export let suspended: Record<number, VNode[]> = {};

let uid = 0;
export const Suspense = defineComponent({
  name: "Suspense",
  props: {
    fallback: {
      required: true,
    },
  },
  setup(props, { slots }) {
    const id = uid++;
    suspended[id] = slots.default?.() || [];

    return () => (
      <div data-suspense-id={id} class="contents">
        {props.fallback as VNode}
      </div>
    );
  },
});
