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

export async function Similar({ id }: { id: string }) {
  const data = await fetchSimilar({ id });

  return (
    <section>
      <h3>You might also like</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {data.similarTitles.map((title: any) => (
          <a
            key={title?.id}
            href={`?id=${title?.id}`}
            className="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden grayscale hover:grayscale-0 transition-all"
          >
            <Image
              src={title?.primaryImage?.url}
              alt={title?.primaryTitle}
              className="w-[130px] aspect-[10/16] rounded-sm"
            />
            <div className="p-1">
              <p className="opacity-50 text-xs">
                {TYPES[title?.type as keyof typeof TYPES] || "Movie"} ∙{" "}
                {title?.startYear}
              </p>
              <p className="truncate text-sm">{title?.primaryTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function SimilarSkeleton() {
  return (
    <section>
      <h3>You might also like</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden"
          >
            <div className="flex w-full shrink-0 aspect-[10/16] rounded-md bg-[#333] animate-pulse" />
            <div className="flex flex-col p-1 gap-1">
              <div className="flex h-[.9lh] w-[80%] rounded-md bg-[#333] animate-pulse" />
              <div className="flex h-[.84lh] w-[60%] rounded-md bg-[#333] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
