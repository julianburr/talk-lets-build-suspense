import { fetchImdb } from "../utils/fetchImdb.ts";

export async function fetchTitle({ id }: { id: string }) {
  const data = await fetchImdb({ id, delay: 500 });
  return {
    url: data.short.url,
    name: data.short.name,
    image: data.short.image,
    genre: data.short.genre,
    datePublished: data.short.datePublished,
    description: data.short.description,
  };
}
