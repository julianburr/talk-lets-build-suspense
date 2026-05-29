/** @jsxImportSource vue */

import { defineComponent } from "vue";

import { fetchTitle } from "../api/title.ts";
import { Image } from "./Image.tsx";

export const Title = defineComponent({
  name: "Title",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const data = await fetchTitle({ id: props.id });

    return () => (
      <section class="flex flex-row gap-2 items-start">
        <Image
          src={data.image}
          className="w-[150px] aspect-[10/16] rounded-sm"
        />
        <div class="flex flex-col p-2 gap-2 flex-1">
          <h2>{data.name}</h2>
          <p class="opacity-50 text-xs">
            {data.yearPublished} ∙ {data.genre.join(", ")}
          </p>
          <p innerHTML={data.description?.replaceAll("--", "—")} />
        </div>
      </section>
    );
  },
});

export function TitleSkeleton() {
  return (
    <section class="flex flex-row gap-2">
      <div class="flex w-[150px] shrink-0 aspect-[10/16] rounded-md bg-[#333] animate-pulse" />
      <div class="flex flex-col shrink-0 p-2 gap-2 flex-1">
        <div class="flex h-[2lh] w-[80%] rounded-md bg-[#333] animate-pulse" />
        <div class="flex h-[.84lh] w-[60%] rounded-md bg-[#333] animate-pulse" />
        <div class="flex flex-col gap-1">
          <div class="flex h-[.9lh] w-[100%] rounded-md bg-[#333] animate-pulse" />
          <div class="flex h-[.9lh] w-[100%] rounded-md bg-[#333] animate-pulse" />
          <div class="flex h-[.9lh] w-[40%] rounded-md bg-[#333] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
