import { Deferred } from '@inertiajs/react';
import { Details, DetailsSkeleton } from '@/components/Details';
import { Header } from '@/components/Header';
import { Similar, SimilarSkeleton } from '@/components/Similar';
import { Title, TitleSkeleton } from '@/components/Title';

export default function Movie({ movie, movieDetails, movieSimilar }: any) {
    return (
        <>
            <Header />
            <Deferred data="movie" fallback={<TitleSkeleton />}>
                <Title data={movie} />
            </Deferred>
            <Deferred data="movieDetails" fallback={<DetailsSkeleton />}>
                <Details data={movieDetails} />
            </Deferred>
            <Deferred data="movieSimilar" fallback={<SimilarSkeleton />}>
                <Similar data={movieSimilar} />
            </Deferred>
        </>
    );
}
