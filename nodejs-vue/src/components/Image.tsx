/** @jsxImportSource vue */

function escapeAttribute(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function Image({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className: string;
}) {
  return (
    <div
      class={`flex shrink-0 bg-[#222] overflow-hidden ${className}`}
      innerHTML={`
        <img
          src="${escapeAttribute(src)}"
          alt="${escapeAttribute(alt)}"
          class="w-full h-full object-cover"
          onerror="this.remove()"
        />
      `}
    />
  );
}
