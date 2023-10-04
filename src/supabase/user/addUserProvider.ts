import { Provider, UserProvider } from '../../types/index.js';
import { client } from '../client.js';

export type AddUserProviderArgs = {
  userId: string;
  providerType: Provider;
  providerUserId: string;
  providerUserName: string;
};

export async function addUserProvider({
  userId,
  providerType,
  providerUserId,
  providerUserName,
}: AddUserProviderArgs): Promise<UserProvider> {
  const { data, error } = await client
    .from('user_providers')
    .insert([
      {
        user_id: userId,
        provider_type: providerType,
        provider_user_id: providerUserId,
        provider_user_name: providerUserName,
      },
    ])
    .select();

  if (error) throw error;

  return data[0];
}
