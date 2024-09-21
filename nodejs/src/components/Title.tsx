import { fetchTitle } from "../api/title.ts";
import { Image } from "./Image.tsx";

export async function Title({ id }: { id: string }) {
  const data = await fetchTitle({ id });
  return (
    <div className="flex flex-row gap-2 items-start">
      <Image src={data.image} className="w-[150px] aspect-[10/16] rounded-sm" />
      <div className="flex flex-col p-2 gap-2 flex-1">
        <h2>{data.name}</h2>
        <p className="opacity-50 text-xs">
          {data.datePublished.substring(0, 4)} ∙ {data.genre.join(", ")}
        </p>
        <p dangerouslySetInnerHTML={{ __html: data.description?.replaceAll('--', '—') }} />
      </div>
    </div>
  );
}

export function TitleSkeleton() {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex w-[150px] shrink-0 aspect-[10/16] rounded-sm bg-[#222] animate-pulse" />
      <div className="flex flex-col shrink-0 p-2 gap-2 flex-1">
        <div className="flex h-[2lh] w-[80%] rounded-md bg-[#222] animate-pulse" />
        <div className="flex h-[.84lh] w-[60%] rounded-md bg-[#222] animate-pulse" />
        <div className="flex flex-col gap-1">
          <div className="flex h-[.9lh] w-[100%] rounded-md bg-[#222] animate-pulse" />
          <div className="flex h-[.9lh] w-[100%] rounded-md bg-[#222] animate-pulse" />
          <div className="flex h-[.9lh] w-[40%] rounded-md bg-[#222] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
