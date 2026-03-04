<?php

namespace App\View\Components;

use App\Support\DeferredRegistry;
use Illuminate\View\Component;
use Illuminate\Support\Str;

final class Suspense extends Component
{
    private string $id;

    public function __construct(
        public string $dataKey,
        public string $view,
        public string $fallback,
        private DeferredRegistry $registry,
    ) {
        $this->id = Str::uuid()->toString();
        $this->registry->add($this->id, $this->dataKey, $this->view);
    }

    public function render()
    {
        return view('fragments.suspense', [
            "key" => $this->id,
            "fallback" => view($this->fallback)->render()
        ])->render();
    }
}