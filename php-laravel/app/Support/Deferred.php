<?php

namespace App\Support;

use Closure;
use Illuminate\Support\Str;

final class Deferred
{
    private string $key;
    private string $dataKey;

    public function __construct(private Closure $resolver) {
        $this->key = Str::uuid()->toString();
        $this->dataKey = $dataKey ?? Str::uuid()->toString();
    }

    public function resolver(): Closure
    {
        return $this->resolver;
    }

    public function key(): string
    {
        return $this->key;
    }

    public function dataKey(): string
    {
        return $this->dataKey;
    }
}