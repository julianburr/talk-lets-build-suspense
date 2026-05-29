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

  const baseUrl = `https://api.imdbapi.dev/titles`;
  const cachePath = resolve(cacheDir, `./${id}.json`);

  let data: any;
  if (existsSync(cachePath)) {
    const content = await promises.readFile(cachePath);
    data = JSON.parse(content.toString());
  } else {
    // Base data
    data = await fetch(`${baseUrl}/${id}`).then((res) => res.json());

    // Similar titles based on genre
    // Timeout to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2_000));
    const genreFilter =
      data.genres
        ?.map((genre: any) => `genres=${encodeURIComponent(genre)}`)
        .join("&") || "";
    const resSimilarTitles = await fetch(`${baseUrl}?${genreFilter}`).then(
      (res) => res.json() as any,
    );
    data.similarTitles =
      resSimilarTitles?.titles?.filter(
        (title: any) => title?.id !== data?.id,
      ) || [];

    await promises.writeFile(cachePath, JSON.stringify(data));
  }

  await sleep(delay);

  return data;
}
