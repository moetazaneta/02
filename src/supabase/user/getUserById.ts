import { client } from '../client.js';

export async function getUserById(userId: string) {
  // prettier-ignore
  const { data, error } = await client
    .from('users')
    .select('*')
    .or(`id.eq.${userId}`);

  return data?.[0] ?? null;
}
