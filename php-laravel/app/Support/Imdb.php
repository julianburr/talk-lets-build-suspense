<?php

namespace App\Support;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;


class Imdb
{
    private const bool DELAY_ENABLED = true;
    private const BASE_URL = 'https://search.imdbot.workers.dev/';

    /**
     * Fetch IMDb data for a given title id, with simple file caching.
     *
     * @return array<string, mixed>
     */
    public static function fetch(string $id, int $delayMs = 0): array
    {
        if ($delayMs > 0 && self::DELAY_ENABLED) {
            usleep($delayMs * 1000);
        }

        $cachePath = ".cache/{$id}.json";

        if (Storage::disk('local')->exists($cachePath)) {
            $contents = Storage::disk('local')->get($cachePath);

            return json_decode($contents, true) ?? [];
        }

        $response = Http::get(self::BASE_URL, ['tt' => $id]);
        $response->throw();

        $data = $response->json();

        Storage::disk('local')->put($cachePath, json_encode($data));

        return $data ?? [];
    }
}

