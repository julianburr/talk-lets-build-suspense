<?php

namespace App\View\Components;

use App\Support\Deferred;
use App\Support\DeferredRegistry;
use Illuminate\View\Component;
use Illuminate\Support\Str;

final class Suspense extends Component
{
    private string $id;

    /**
     * @param array<Deferred> $values
     * @param string $view
     * @param string $fallback
     * @param DeferredRegistry $registry
     */
    public function __construct(
        public array $values,
        public string $view,
        public string $fallback,
        private DeferredRegistry $registry,
    ) {
        $this->id = Str::uuid()->toString();
        $this->registry->add(
            $this->id, 
            array_map( fn ($v) => $v->dataKey(), $this->values), 
            $this->view
        );
    }

    public function render()
    {
        return view('fragments.suspense', [
            "key" => $this->id,
            "fallback" => view($this->fallback)->render()
        ])->render();
    }
}