<?php

namespace App\Models;

use App\Support\Imdb;

class MovieDetail
{
    /**
     * Load detailed movie information.
     *
     * @return array<string, mixed>
     */
    public static function find(string $id): array
    {
        $data = Imdb::fetch($id, 5000);
        return [
            'description' => data_get($data, 'short.description'),
            'creators' => data_get($data, 'main.creators', []),
            'directors' => data_get($data, 'main.directors', []),
            'writers' => data_get($data, 'main.writers', []),
            'cast' => data_get($data, 'main.castV2', []),
            'episodes' => data_get($data, 'main.episodes'),
            'ratingsSummary' => data_get($data, 'main.ratingsSummary'),
        ];
    }
}

