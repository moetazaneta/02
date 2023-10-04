import { Provider } from '../../types/index.js';
import { client } from '../client.js';

export async function getProviderUserIdByName(
  provider: Provider,
  name: string
): Promise<string | null> {
  const { data, error } = await client.functions.invoke(`${provider}_getUserId`, {
    body: { name },
  });
  return data != null ? String(data) : null;
}
