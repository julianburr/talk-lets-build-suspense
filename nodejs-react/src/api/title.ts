import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchTitle({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 2000 });
  return {
    name: data.primaryTitle,
    image: data.primaryImage.url,
    genre: data.genres,
    yearPublished: data.startYear,
    description: data.plot,
  };
}
