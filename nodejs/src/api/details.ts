import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchDetails({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 5000 });
  return {
    description: data.short.description,
    creators: data.main.creators,
    directors: data.main.directors,
    writers: data.main.writers,
    cast: data.main.cast,
    episodes: data.main.episodes,
    ratingsSummary: data.main.ratingsSummary,
  };
}
