import { fetchDetails } from "../api/details.ts";
import { Image } from "./Image.tsx";

export async function Details({ id }: { id: string }) {
  const data = await fetchDetails({ id });
  return (
    <div>
      <h3>Cast</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {data.cast.edges.map((edge: any) => (
          <div
            key={edge.node?.name?.id}
            className="flex flex-col content-start justify-start shrink-0 w-[100px] overflow-hidden grayscale"
          >
            <Image
              src={edge.node?.name?.primaryImage?.url}
              alt={edge.node?.name?.nameText?.text}
              className="h-[100px] w-[100px] object-cover rounded-sm"
            />
            <div className="p-1">
              <p className="opacity-50 text-xs truncate">
                {edge.node?.name?.nameText?.text}
              </p>
              <p className="text-sm truncate">
                {edge.node?.characters?.[0]?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div>
      <h3>Cast</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col content-start justify-start shrink-0 w-[100px] overflow-hidden"
          >
            <div className="flex w-full shrink-0 aspect-square rounded-sm bg-[#222] animate-pulse" />
            <div className="flex flex-col p-1 gap-1">
              <div className="flex h-[.84lh] w-[80%] rounded-md bg-[#222] animate-pulse" />
              <div className="flex h-[.84lh] w-[60%] rounded-md bg-[#222] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
