<?php

namespace App\Support;

final class DeferredRegistry
{
    /**
     * @var array<string, array{value: Deferred, view: string}>
     */
    private array $items = [];

    public function reset(): void
    {
        $this->items = [];
    }

    public function add(string $key, string $dataKey, string $view): void
    {
        $this->items[$key] = [
            'key' => $key,
            'dataKey' => $dataKey,
            'view'  => $view,
        ];
    }

    public function entriesForDataKey(string $dataKey)
    {
        $entries = array_filter(
            $this->items, 
            fn (array $item) => $item['dataKey'] === $dataKey
        );

        return $entries;
    }
}