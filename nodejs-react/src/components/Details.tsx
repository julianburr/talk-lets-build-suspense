import { fetchDetails } from "../api/details.ts";
import { Image } from "./Image.tsx";

export async function Details({ id }: { id: string }) {
  const data = await fetchDetails({ id });
  return (
    <section>
      <h3>Cast</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {data.cast.map((cast: any) => (
          <div
            key={cast?.id}
            className="flex flex-col content-start justify-start shrink-0 w-[100px] overflow-hidden grayscale"
          >
            <Image
              src={cast?.primaryImage?.url}
              alt={cast?.displayName}
              className="h-[100px] w-[100px] object-cover rounded-sm"
            />
            <div className="p-1">
              <p className="opacity-50 text-xs truncate">{cast?.displayName}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DetailsSkeleton() {
  return (
    <section>
      <h3>Cast</h3>
      <div className="flex flex-row gap-2 overflow-auto">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col content-start justify-start shrink-0 w-[100px] overflow-hidden"
          >
            <div className="flex w-full shrink-0 aspect-square rounded-md bg-[#333] animate-pulse" />
            <div className="flex flex-col p-1 gap-1">
              <div className="flex h-[.84lh] w-[80%] rounded-md bg-[#333] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
