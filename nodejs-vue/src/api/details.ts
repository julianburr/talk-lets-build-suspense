import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchDetails({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 5000 });
  return {
    description: data.plot,
    creators: [],
    directors: data.directors,
    writers: data.writers,
    cast: data.stars,
    episodes: [],
    ratingsSummary: null,
  };
}
