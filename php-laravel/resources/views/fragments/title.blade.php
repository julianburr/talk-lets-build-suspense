<div class="flex flex-row items-start gap-2">
    <img
        src="{{ $data['image'] ?? '' }}"
        alt="{{ $data['name'] ?? '' }}"
        class="aspect-[10/16] w-[150px] rounded-sm object-cover"
    />

    <div class="flex flex-1 flex-col gap-2 p-2">
        <h2>{{ $data['name'] ?? '' }}</h2>

        @php
            $year = isset($data['datePublished']) ? substr($data['datePublished'], 0, 4) : null;
            $genres = isset($data['genre']) && is_array($data['genre']) ? implode(', ', $data['genre']) : null;
        @endphp

        @if ($year || $genres)
            <p class="text-xs opacity-50">
                {{ $year }}
                @if ($year && $genres)
                    &nbsp;∙&nbsp;
                @endif
                {{ $genres }}
            </p>
        @endif

        @if (! empty($data['description']))
            <p>{!! str_replace('--', '—', $data['description']) !!}</p>
        @endif
    </div>
</div>
