import {
  SlashCommandBuilder,
  Interaction,
  CacheType,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
  SlashCommandSubcommandBuilder,
} from 'discord.js';

type Builder =
  | SlashCommandBuilder
  | SlashCommandSubcommandsOnlyBuilder
  | SlashCommandOptionsOnlyBuilder;

type ExecuteFn = (interaction: Interaction<CacheType>) => Promise<void>;

type CustomizeCommandBuilderFn = (
  builder: SlashCommandBuilder
) => Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
type CustomizeSubcommandBuilderFn = (
  builder: SlashCommandSubcommandBuilder
) => SlashCommandSubcommandBuilder;

type CreateCommandArgs = {
  name: string;
  description: string;
  subcommands?: Subcommand[];
  customizeBuilder?: CustomizeCommandBuilderFn;
  execute: ExecuteFn;
};

type CreateSubcommandArgs = {
  name: string;
  description: string;
  customizeBuilder?: CustomizeSubcommandBuilderFn;
  execute: ExecuteFn;
};

export type Command = {
  name: string;
  builder: SlashCommandBuilder;
  execute: ExecuteFn;
};

export type Subcommand = {
  name: string;
  builder: SlashCommandSubcommandBuilder;
  execute: ExecuteFn;
};

export function createCommand({
  name,
  description,
  subcommands,
  customizeBuilder = b => b,
  execute,
}: CreateCommandArgs): Command {
  const baseBuilder = new SlashCommandBuilder().setName(name).setDescription(description);

  if (subcommands == null || subcommands.length === 0) {
    const command: Command = {
      name,
      builder: customizeBuilder(baseBuilder) as SlashCommandBuilder,
      execute,
    };
    return command;
  }

  const executeSubcommands: ExecuteFn = async interaction => {
    if (!interaction.isChatInputCommand() || !subcommands) return;

    const calledSubcommandName = interaction.options.getSubcommand();
    const calledSubcommand = subcommands.find(
      subcommand => subcommand.name === calledSubcommandName
    );

    if (!calledSubcommand) {
      await interaction.reply({
        content: 'Not implemented',
        ephemeral: true,
      });
      return;
    }

    calledSubcommand.execute(interaction);
  };

  const builderWithSubcommands = subcommands.reduce(
    (b, subcommand) => b.addSubcommand(subcommand.builder) as SlashCommandBuilder,
    baseBuilder
  );

  return {
    name,
    builder: customizeBuilder(builderWithSubcommands) as SlashCommandBuilder,
    execute: executeSubcommands,
  };
}

export function createSubcommand({
  name,
  description,
  customizeBuilder = b => b,
  execute,
}: CreateSubcommandArgs): Subcommand {
  const baseBuilder = new SlashCommandSubcommandBuilder().setName(name).setDescription(description);

  return {
    name,
    builder: customizeBuilder(baseBuilder),
    execute,
  };
}
