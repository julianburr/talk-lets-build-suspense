let uid = 0;

export let suspended: { [key: string | number]: Promise<any> } = {};

export function Suspense({ fallback, content }: any) {
  let id = uid++;
  suspended[id] = content;

  const element = fallback();
  return <div data-stream-id={id}>{element}</div>;
}
