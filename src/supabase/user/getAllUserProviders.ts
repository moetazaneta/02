import { UserProvider } from '../../types/index.js';
import { client } from '../client.js';

export async function getAllUserProviders(): Promise<UserProvider[]> {
  // prettier-ignore
  const { data, error } = await client
    .from('user_providers')
    .select();

  if (error) throw error;

  return data;
}
