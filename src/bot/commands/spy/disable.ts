import { createCommand, createSubcommand } from '../utils/createCommand.js';

const response_map: Record<string, string> = {
  '112597655342837760': 'Здарова',
  '155716577096892416':
    'Здравствуйте Александр Нянович! Для того чтобы отключить слежение за вами на этом сервере, вам нужно посмотреть величайшее произведение (после ЛоГГ и ряда других), перевернувшие представление о жанре повседневности (или сделавшее попытку), (возможно) демонстрирующее проблемы социофоба в социуме, технически качественно исполненное (по меркам аниме) — «Боччи За Рок».',
  '112957787830501376': 'когда нибудь точно..',
  default: 'тебе нельзя',
};

export const spyDisableCommand = createSubcommand({
  name: 'disable',
  description: 'Disable constant chat monitoring and saving every sent message.',
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    await interaction.reply({
      content: interaction.member ? response_map[interaction.member.user.id] : response_map.default,
      ephemeral: true,
    });
  },
});
