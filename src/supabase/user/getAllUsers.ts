import { Provider, User } from '../../types/index.js';
import { client } from '../client.js';

export async function getAllUsers(): Promise<User[]> {
  // prettier-ignore
  const { data, error } = await client
    .from('users')
    .select();

  if (error) throw error;

  return data;
}
