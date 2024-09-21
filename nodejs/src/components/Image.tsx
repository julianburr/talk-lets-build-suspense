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
      className={`flex shrink-0 bg-[#111] overflow-hidden ${className}`}
      dangerouslySetInnerHTML={{
        __html: `
          <img 
            src="${src}" 
            alt="${alt || ""}" 
            class="w-full h-full object-cover" 
            onerror="this. remove()"
          />
        `,
      }}
    />
  );
}
