import { client } from '../client.js';

export type AddUserArgs = {
  discordUserId: string;
  anilistId: number;
};

export async function addUser({ discordUserId, anilistId }: AddUserArgs) {
  return client
    .from('users')
    .insert([{ discord_id: discordUserId, anilist_id: anilistId }])
    .select();
}
