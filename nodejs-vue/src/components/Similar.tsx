/** @jsxImportSource vue */

import { defineComponent } from "vue";

import { fetchSimilar } from "../api/similar.ts";
import { Image } from "./Image.tsx";

const TYPES = {
  movie: "Movie",
  tvSeries: "TV Series",
  tvEpisode: "TV Episode",
  tvMovie: "TV Movie",
  tvShort: "TV Short",
  tvSpecial: "TV Special",
};

export const Similar = defineComponent({
  name: "Similar",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async setup(props) {
    const data = await fetchSimilar({ id: props.id });

    return () => (
      <section>
        <h3>You might also like</h3>
        <div class="flex flex-row gap-2 overflow-auto">
          {data.similarTitles.map((title: any) => (
            <a
              key={title?.id}
              href={`?id=${title?.id}`}
              class="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={title?.primaryImage?.url}
                alt={title?.primaryTitle}
                className="w-[130px] aspect-[10/16] rounded-sm"
              />
              <div class="p-1">
                <p class="opacity-50 text-xs">
                  {TYPES[title?.type as keyof typeof TYPES] || "Movie"} ∙{" "}
                  {title?.startYear}
                </p>
                <p class="truncate text-sm">{title?.primaryTitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    );
  },
});

export function SimilarSkeleton() {
  return (
    <section>
      <h3>You might also like</h3>
      <div class="flex flex-row gap-2 overflow-auto">
        {[0, 1].map((i) => (
          <div
            key={i}
            class="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden"
          >
            <div class="flex w-full shrink-0 aspect-[10/16] rounded-md bg-[#333] animate-pulse" />
            <div class="flex flex-col p-1 gap-1">
              <div class="flex h-[.9lh] w-[80%] rounded-md bg-[#333] animate-pulse" />
              <div class="flex h-[.84lh] w-[60%] rounded-md bg-[#333] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
