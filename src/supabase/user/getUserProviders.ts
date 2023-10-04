import { UserProvider } from '../../types/index.js';
import { client } from '../client.js';

export async function getUserProviders(userId: string): Promise<UserProvider[]> {
  // prettier-ignore
  const { data, error } = await client
    .from('user_providers')
    .select()
    .eq('user_id', userId)

  if (error) throw error;

  return data;
}
