<?php

namespace App\Models;

use App\Support\Imdb;

class Movie
{
    /**
     * Load the basic movie data (title card).
     *
     * @return array<string, mixed>
     */
    public static function find(string $id): array
    {
        $data = Imdb::fetch($id, 500);
        return [
            'url' => data_get($data, 'short.url'),
            'name' => data_get($data, 'short.name'),
            'image' => data_get($data, 'short.image'),
            'genre' => data_get($data, 'short.genre', []),
            'datePublished' => data_get($data, 'short.datePublished'),
            'description' => data_get($data, 'short.description'),
        ];
    }
}

