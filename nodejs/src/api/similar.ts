import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchSimilar({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 2000 });
  return {
    moreLikeThisTitles: data.main.moreLikeThisTitles,
  };
}
