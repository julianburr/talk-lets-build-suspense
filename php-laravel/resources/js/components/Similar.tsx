import { Link } from '@inertiajs/react';
import { Image } from './Image';

export function Similar({ data }: any) {
    return (
        <div>
            <h3>You might also like</h3>
            <div className="flex flex-row gap-2 overflow-auto">
                {data.moreLikeThisTitles.edges.map((edge: any) => (
                    <Link
                        key={edge?.node?.id}
                        href={`/inertia/${edge?.node?.id}`}
                        className="flex w-[130px] shrink-0 flex-col content-start justify-start overflow-hidden grayscale transition-all hover:grayscale-0"
                    >
                        <Image
                            src={edge.node?.primaryImage?.url}
                            alt={edge?.node?.titleText?.text}
                            className="aspect-[10/16] w-[130px] rounded-sm"
                        />
                        <div className="p-1">
                            <p className="text-xs opacity-50">
                                {edge?.node?.titleType?.text} ∙{' '}
                                {edge?.node?.releaseYear?.year}
                            </p>
                            <p className="truncate text-sm">
                                {edge?.node?.titleText?.text}
                            </p>
                        </div>
                    </Link>
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
                        className="flex w-[130px] shrink-0 flex-col content-start justify-start overflow-hidden"
                    >
                        <div className="flex aspect-[10/16] w-full shrink-0 animate-pulse rounded-sm bg-[#222]" />
                        <div className="flex flex-col gap-1 p-1">
                            <div className="flex h-[.9lh] w-[80%] animate-pulse rounded-md bg-[#222]" />
                            <div className="flex h-[.84lh] w-[60%] animate-pulse rounded-md bg-[#222]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
