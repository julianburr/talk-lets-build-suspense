<?php

namespace App\Models;

use App\Support\Imdb;

class MovieSimilar
{
    /**
     * Load similar titles data.
     *
     * @return array<string, mixed>
     */
    public static function list(string $id): array
    {
        $data = Imdb::fetch($id, 2000);
        return [
            'moreLikeThisTitles' => data_get($data, 'main.moreLikeThisTitles'),
        ];
    }
}

