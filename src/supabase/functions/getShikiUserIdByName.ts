import { client } from '../client.js';

export async function getShikiUserIdByName(name: string): Promise<string | null> {
  const { data, error } = await client.functions.invoke('shiki_getUserId', { body: { name } });
  return data != null ? String(data) : null;
}
