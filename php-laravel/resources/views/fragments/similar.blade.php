<div>
    <h3>You might also like</h3>

    <div class="flex flex-row gap-2 overflow-auto">
        @foreach(($data['moreLikeThisTitles']['edges'] ?? []) as $edge)
            @php
                $node = $edge['node'] ?? [];
            @endphp

            <a
                href="{{ url($baseUrl.$node['id']) }}"
                class="flex w-[130px] shrink-0 flex-col content-start justify-start overflow-hidden grayscale transition-all hover:grayscale-0"
            >
                <img
                    src="{{ $node['primaryImage']['url'] ?? '' }}"
                    alt="{{ $node['titleText']['text'] ?? '' }}"
                    class="aspect-[10/16] w-[130px] rounded-sm object-cover"
                />

                <div class="p-1">
                    <p class="text-xs opacity-50">
                        {{ $node['titleType']['text'] ?? '' }}
                        @if (($node['titleType']['text'] ?? null) && ($node['releaseYear']['year'] ?? null))
                            &nbsp;∙&nbsp;
                        @endif
                        {{ $node['releaseYear']['year'] ?? '' }}
                    </p>
                    <p class="truncate text-sm">
                        {{ $node['titleText']['text'] ?? '' }}
                    </p>
                </div>
            </a>
        @endforeach
    </div>
</div>
