let uid = 0;

export let suspended: { [key: string | number]: Promise<any> } = {};

export function Suspense({ fallback, children }: any) {
  let id = uid++;
  suspended[id] = children;

  return (
    <div data-suspense-id={id} className="contents">
      {fallback}
    </div>
  );
}
