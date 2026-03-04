<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="stylesheet" href="http://localhost:8010/index.css">
    </head>
    <body>
        @include('fragments.header')
        @include('fragments.title', ['data' => $data['movie']])
        @include('fragments.details', ['data' => $data['movieDetails']])
        @include('fragments.similar', ['data' => $data['movieSimilar'], "baseUrl" => $baseUrl])
    </body>
</html>