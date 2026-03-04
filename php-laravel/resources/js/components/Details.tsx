import { Image } from './Image';

export function Details({ data }: any) {
    return (
        <div>
            <h3>Cast</h3>
            <div className="flex flex-row gap-2 overflow-auto">
                {data.cast?.[0]?.credits?.map?.((edge: any) => (
                    <div
                        key={edge.name?.id}
                        className="flex w-[100px] shrink-0 flex-col content-start justify-start overflow-hidden grayscale"
                    >
                        <Image
                            src={edge.name?.primaryImage?.url}
                            alt={edge.name?.nameText?.text}
                            className="h-[100px] w-[100px] rounded-sm object-cover"
                        />
                        <div className="p-1">
                            <p className="truncate text-xs opacity-50">
                                {edge.name?.nameText?.text}
                            </p>
                            <p className="truncate text-sm">
                                {
                                    edge.creditedRoles?.edges?.[0]?.node
                                        ?.characters?.edges?.[0]?.node?.name
                                }
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
                        className="flex w-[100px] shrink-0 flex-col content-start justify-start overflow-hidden"
                    >
                        <div className="flex aspect-square w-full shrink-0 animate-pulse rounded-sm bg-[#222]" />
                        <div className="flex flex-col gap-1 p-1">
                            <div className="flex h-[.84lh] w-[80%] animate-pulse rounded-md bg-[#222]" />
                            <div className="flex h-[.84lh] w-[60%] animate-pulse rounded-md bg-[#222]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
