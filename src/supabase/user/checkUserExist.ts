import { client } from '../client.js';

export type CheckUserExistArgs = {
  discordId: string;
  anilistId: number;
};

export async function checkUserExist({ discordId, anilistId }: CheckUserExistArgs) {
  const { data, error } = await client
    .from('users')
    .select('*')
    .or(`discord_id.eq.${discordId},anilist_id.eq.${anilistId},`)
    .select();

  return data != null && data.length > 0;
}
