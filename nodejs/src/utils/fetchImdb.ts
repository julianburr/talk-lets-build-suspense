import fetch from "node-fetch";
import { promises, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { sleep } from "./sleep.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function fetchImdb({ id, delay }: { id: string; delay: number }) {
  const cacheDir = resolve(__dirname, "../../.cache");
  if (!existsSync(cacheDir)) {
    await promises.mkdir(cacheDir, { recursive: true });
  }

  const imdbUrl = `https://search.imdbot.workers.dev/?tt=${id}`;
  const cachePath = resolve(cacheDir, `./${id}.json`);

  let data: any;
  if (existsSync(cachePath)) {
    const content = await promises.readFile(cachePath);
    data = JSON.parse(content.toString());
  } else {
    data = await fetch(imdbUrl).then((res) => res.json());
    await promises.writeFile(cachePath, JSON.stringify(data));
  }

  await sleep(delay);

  return data;
}
