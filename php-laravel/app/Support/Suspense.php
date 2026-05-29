<?php

namespace App\Support;

use Closure;

final class Suspense
{
    private array $resolved = [];

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
     * @param callable(string $key, mixed $result, array $resolvedKeys): void $then
     */
    public function resolve(array $deferred, callable $then): self
    {
        $keys = array_keys($deferred);
        shuffle($keys);
        
        foreach ($keys as $key) {

            $this->resolved[] = $deferred[$key]->dataKey();

            $result = ($deferred[$key]->resolver())();
            $then($deferred[$key]->dataKey(), $result, $this->resolved);
        }

        return $this;
    }

    public function resolved(): array
    {
        return $this->resolved;
    }

    public function await(): self
    {
        return $this;
    }
}