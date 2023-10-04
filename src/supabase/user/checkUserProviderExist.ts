import { Provider } from '../../types/index.js';
import { client } from '../client.js';

export type CheckUserProviderExistArgs = {
  userId: string;
  providerType: Provider;
};

/** Checks whether user's provider exists or not. */
export async function checkUserProviderExist({ userId, providerType }: CheckUserProviderExistArgs) {
  const { data, error } = await client
    .from('user_providers')
    .select()
    .eq('user_id', userId)
    .eq('provider_type', providerType);

  console.log(data);

  return data != null && data.length > 0;
}
