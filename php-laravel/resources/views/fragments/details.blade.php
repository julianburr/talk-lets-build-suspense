<div>
    <h3>Cast</h3>

    <div class="flex flex-row gap-2 overflow-auto">
        @foreach(($data['cast'][0]['credits'] ?? []) as $edge)
            <div class="flex w-[100px] shrink-0 flex-col content-start justify-start overflow-hidden grayscale">
                <img
                    src="{{ $edge['name']['primaryImage']['url'] ?? '' }}"
                    alt="{{ $edge['name']['nameText']['text'] ?? '' }}"
                    class="h-[100px] w-[100px] rounded-sm object-cover"
                />

                <div class="p-1">
                    <p class="truncate text-xs opacity-50">
                        {{ $edge['name']['nameText']['text'] ?? '' }}
                    </p>
                    <p class="truncate text-sm">
                        {{ $edge['creditedRoles']['edges'][0]['node']['characters']['edges'][0]['node']['name'] ?? '' }}
                    </p>
                </div>
            </div>
        @endforeach
    </div>
</div>
