<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="/favicon.png">
        <link rel="stylesheet" href="http://localhost:8010/index.css">
    </head>
    <body>
        @include('fragments.header')
        @include('fragments.title', ['data' => $data['movie']])
        @include('fragments.details', ['data' => $data['details']])
        @include('fragments.similar', ['data' => $data['similar'], "baseUrl" => $baseUrl])
    </body>
</html>