import Discord from 'discord.js';
import BotCommand from '../commands/BotCommand';
import { commandLookup } from '../index';

export default class MessageHandler {
  prefix: string;

  constructor(prefix: string | undefined) {
    this.prefix = prefix;
  }

  async handle(msg: Discord.Message): Promise<void> {
    // If the message is from a bot, return
    if (msg.author.bot) return;

    let msgString: string = msg.content;

    // Validate and remove prefix
    if (msgString.startsWith(this.prefix)) {
      msgString = msgString.replace(this.prefix, '');
    } else {
      return;
    }

    // Get command arguments
    const splitCommand: Array<string> = msgString.split(' ');
    const primaryCommand: string = splitCommand[0];
    const args: Array<string> = splitCommand.slice(1);

    // Find command and execute it
    const command: BotCommand | undefined = commandLookup.get(primaryCommand);
    if (command) {
      await command.execute(msg, args);
    }
  }
}
