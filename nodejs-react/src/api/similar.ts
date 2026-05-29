import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchSimilar({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 1000 });
  return {
    similarTitles: data.similarTitles,
  };
}
