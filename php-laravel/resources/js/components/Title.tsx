import { Image } from './Image';

export function Title({ data }: any) {
    return (
        <div className="flex flex-row items-start gap-2">
            <Image
                src={data.image}
                className="aspect-[10/16] w-[150px] rounded-sm"
            />
            <div className="flex flex-1 flex-col gap-2 p-2">
                <h2>{data.name}</h2>
                <p className="text-xs opacity-50">
                    {data.datePublished.substring(0, 4)} ∙{' '}
                    {data.genre.join(', ')}
                </p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: data.description?.replaceAll('--', '—'),
                    }}
                />
            </div>
        </div>
    );
}

export function TitleSkeleton() {
    return (
        <div className="flex flex-row gap-2">
            <div className="flex aspect-[10/16] w-[150px] shrink-0 animate-pulse rounded-sm bg-[#222]" />
            <div className="flex flex-1 shrink-0 flex-col gap-2 p-2">
                <div className="flex h-[2lh] w-[80%] animate-pulse rounded-md bg-[#222]" />
                <div className="flex h-[.84lh] w-[60%] animate-pulse rounded-md bg-[#222]" />
                <div className="flex flex-col gap-1">
                    <div className="flex h-[.9lh] w-[100%] animate-pulse rounded-md bg-[#222]" />
                    <div className="flex h-[.9lh] w-[100%] animate-pulse rounded-md bg-[#222]" />
                    <div className="flex h-[.9lh] w-[40%] animate-pulse rounded-md bg-[#222]" />
                </div>
            </div>
        </div>
    );
}
