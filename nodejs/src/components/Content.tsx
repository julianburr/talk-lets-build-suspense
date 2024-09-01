import { sleep } from "../utils/sleep.ts";

export async function Content() {
  await sleep(5000);
  return <p>[CONTENT]</p>;
}
