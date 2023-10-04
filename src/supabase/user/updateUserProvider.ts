import { Provider, UserProvider } from '../../types/index.js';
import { client } from '../client.js';

export type UpdateUserProviderArgs = {
  userId: string;
  providerType: Provider;
  providerUserId: string;
  providerUserName: string;
};

export async function updateUserProvider({
  userId,
  providerType,
  providerUserId,
  providerUserName,
}: UpdateUserProviderArgs): Promise<UserProvider> {
  const { data, error } = await client
    .from('user_providers')
    .update({ provider_user_id: providerUserId, provider_user_name: providerUserName })
    .eq('user_id', userId)
    .eq('provider_type', providerType)
    .select();

  console.log(data?.[0], error?.message);
  if (error) throw error;

  return data[0];
}
