import { fetchSimilar } from "../api/similar.ts";
import { Image } from "./Image.tsx";

export async function Similar({ id }: { id: string }) {
  const data = await fetchSimilar({ id });

  return (
    <div>
      <h3>You might also like</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {data.moreLikeThisTitles.edges.map((edge: any) => (
          <a
            key={edge?.node?.id}
            href={`?id=${edge?.node?.id}`}
            className="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden grayscale hover:grayscale-0 transition-all"
          >
            <Image
              src={edge.node?.primaryImage?.url}
              alt={edge?.node?.titleText?.text}
              className="w-[130px] aspect-[10/16] rounded-sm"
            />
            <div className="p-1">
              <p className="opacity-50 text-xs">
                {edge?.node?.titleType?.text} ∙ {edge?.node?.releaseYear?.year}
              </p>
              <p className="truncate text-sm">{edge?.node?.titleText?.text}</p>
              </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function SimilarSkeleton() {
  return (
    <div>
      <h3>You might also like</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex flex-col content-start justify-start shrink-0 w-[130px] overflow-hidden"
          >
            <div className="flex w-full shrink-0 aspect-[10/16] rounded-sm bg-[#222] animate-pulse" />
            <div className="flex flex-col p-1 gap-1">
              <div className="flex h-[.9lh] w-[80%] rounded-md bg-[#222] animate-pulse" />
              <div className="flex h-[.84lh] w-[60%] rounded-md bg-[#222] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
