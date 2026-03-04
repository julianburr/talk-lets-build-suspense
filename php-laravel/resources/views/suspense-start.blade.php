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

        <x-suspense dataKey="movie" view="fragments.title" fallback="fragments.skeleton.title"></x-suspense>
        <x-suspense dataKey="movieDetails" view="fragments.details" fallback="fragments.skeleton.details"></x-suspense>
        <x-suspense dataKey="movieSimilar" view="fragments.similar" fallback="fragments.skeleton.similar"></x-suspense>
        
        <script>
          window.customElements.define('suspense-content',
            class SuspenseContent extends HTMLElement {
              connectedCallback () {
                const tpl = this.previousElementSibling;
                const id = this.getAttribute('target-id');
                const target = document.querySelector('[data-suspense-id="' + id + '"]');
                if (!tpl || !tpl.content || !target) return;

                target.innerHTML = '';
                target.appendChild(tpl.content.cloneNode(true));
              }
            }
          );
        </script>