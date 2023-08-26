import { client } from '../client.js';

export async function getAnilistUserIdByName(name: string): Promise<number | null> {
  const { data, error } = await client.functions.invoke('anilist_getUserId', { body: { name } });
  return data;
}
