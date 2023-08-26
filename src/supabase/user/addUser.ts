import { client } from '../client.js';

export type AddUserArgs = {
  discordGuildId: string;
  discordUserId: string;
  anilistId: number;
};

export async function addUser({ discordGuildId, discordUserId, anilistId }: AddUserArgs) {
  // create user
  const { data: addedUser, error: usersError } = await client
    .from('users')
    .insert([{ discord_id: discordUserId, anilist_id: anilistId }])
    .select();

  if (usersError) {
    return { error: usersError };
  }

  // add user to server subscribers
  const { error: serverUsersError } = await client
    .from('discord_server_users')
    .insert([{ guild: discordGuildId, user: addedUser[0].id }])
    .select();

  return { error: serverUsersError };
}
