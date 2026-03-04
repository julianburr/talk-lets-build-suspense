<div>
  <h3>Cast</h3>
  <div class="flex flex-row gap-2 overflow-auto">
    @for ($i = 0; $i < 3; $i++)
      <div
        key={i}
        class="flex flex-col content-start justify-start shrink-0 w-[100px] overflow-hidden"
      >
        <div class="flex w-full shrink-0 aspect-square rounded-sm bg-[#222] animate-pulse"></div>
        <div class="flex flex-col p-1 gap-1">
          <div class="flex h-[.84lh] w-[80%] rounded-md bg-[#222] animate-pulse"></div>
          <div class="flex h-[.84lh] w-[60%] rounded-md bg-[#222] animate-pulse"></div>
        </div>
      </div>
    @endfor
  </div>
</div>