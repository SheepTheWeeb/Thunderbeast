import Discord from 'discord.js';

export default interface BotCommand {
  name: string;
  alias: Array<string>;
  description: string;
  usage: string;
  enabled: boolean;

  execute(
    msg: Discord.Message,
    args: Array<string>
  ): boolean | Promise<boolean>;
}
