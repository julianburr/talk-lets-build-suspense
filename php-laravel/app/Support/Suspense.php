<?php

namespace App\Support;

use Closure;

final class Suspense
{
    private function __construct()
    {
    }

    public static function create(int $concurrency = 3): self
    {
        return new self();
    }

    // “defer” is just a marker/handle you keep in your $data array
    public function defer(Closure $resolver): Deferred
    {
        return new Deferred($resolver);
    }

    /**
     * Run deferred resolvers in the same process so Laravel facades/container are available.
     *
     * @param array<string, Deferred> $deferred
     * @param callable(string $key, mixed $result): void $then
     */
    public function onResolve(array $deferred, callable $then): self
    {
        foreach ($deferred as $key => $d) {
            $result = ($d->resolver())();
            $then($key, $result);
        }

        return $this;
    }

    public function await(): self
    {
        return $this;
    }
}