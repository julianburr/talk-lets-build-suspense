<?php

namespace App\Support;

use Closure;
use Illuminate\Support\Str;

final class Deferred
{
    private string $key;

    public function __construct(private Closure $resolver) {
        $this->key = Str::uuid()->toString();
    }

    public function resolver(): Closure
    {
        return $this->resolver;
    }

    public function key(): string
    {
        return $this->key;
    }
}