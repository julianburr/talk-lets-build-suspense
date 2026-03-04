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

    public function add(string $key, array $dataKeys, string $view): void
    {
        $this->items[$key] = [
            'key' => $key,
            'dataKeys' => $dataKeys,
            'view'  => $view,
        ];
    }

    public function remove(string $key): void
    {
        unset($this->items[$key]);
    }

    public function entriesForDataKey(string $dataKey)
    {
        $entries = [];
        foreach ($this->items as $key => $item) {
            $item['dataKeys'] = array_filter(
                $item['dataKeys'], 
                fn ($k) => $k !== $dataKey
            );

            if (empty($item['dataKeys'])) {
                $entries[] = $item;
                $this->remove($key);
            }
        }

        return $entries;
    }
}