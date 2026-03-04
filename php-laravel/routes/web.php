<?php

use App\Models\Movie;
use App\Models\MovieDetail;
use App\Models\MovieSimilar;
use App\Support\DeferredRegistry;
use App\Support\Suspense;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/inertia/{id}', function (string $id): mixed {
    Inertia::setRootView('inertia');
    return Inertia::render('movie', [
        'id' => $id,
        'movie' => Inertia::defer(fn () => Movie::find($id), 'movie'),
        'movieDetails' => Inertia::defer(fn () => MovieDetail::find($id), 'movieDetails'),
        'movieSimilar' => Inertia::defer(fn () => MovieSimilar::list($id), 'movieSimilar'),
    ]);
});

Route::get('/classic/{id}', function (string $id): mixed {
    $data = [
        "movie" => Movie::find($id),
        "movieDetails" => MovieDetail::find($id),
        "movieSimilar" => MovieSimilar::list($id),
    ];

    return view('classic', ["data" => $data, "baseUrl" => "/classic/"]);
});

Route::get('/stream/{id}', function (string $id): mixed {
    return response()->stream(function () use ($id): Generator {
        yield view('stream-start', ['id' => $id])->render();

        $movie = Movie::find($id);
        yield view('fragments.title', ['data' => $movie])->render();

        $movieDetails = MovieDetail::find($id);
        yield view('fragments.details', ['data' => $movieDetails])->render();

        $movieSimilar = MovieSimilar::list($id);
        yield view('fragments.similar', ['data' => $movieSimilar, "baseUrl" => "/stream/"])->render();

        yield view('stream-end')->render();
    });
});

Route::get('/suspense/{id}', function (string $id, DeferredRegistry $registry): mixed {
    return response()->stream(function () use ($id, $registry): Generator {
        $suspense = Suspense::create(3);

        $data = [
            "movie" => $suspense->defer(fn () => Movie::find($id)),
            "movieDetails" => $suspense->defer(fn () => MovieDetail::find($id)),
            "movieSimilar" => $suspense->defer(fn () => MovieSimilar::list($id)),
        ];

        $registry->reset();

        yield view('suspense-start', ['data' => $data])->render();

        $suspense
            ->onResolve($data, function ($dataKey, $resolvedData) use ($registry) {
                $entries = $registry->entriesForDataKey($dataKey);

                array_map(function ($entry) use ($resolvedData) {
                    $html = view($entry['view'], ['data' => $resolvedData, "baseUrl" => "/suspense/"])->render();
                    echo "<template>{$html}</template>\n";
                    echo "<suspense-content target-id=\"{$entry['key']}\"></suspense-content>\n\n";
                }, $entries);

                @flush();
            })
            ->await();

        yield view('suspense-end')->render();
    });
});


require __DIR__.'/settings.php';
