export let suspended: Record<string, any> = {};

let uuid = 0;
export function Suspense({ children, fallback }: any) {
  const id = `suspense-${uuid++}`;
  suspended[id] = children;
  return (
    <div data-suspense-id={id} className="contents">
      {fallback}
    </div>
  );
}
