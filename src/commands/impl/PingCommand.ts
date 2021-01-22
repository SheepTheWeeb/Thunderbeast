import Discord from 'discord.js';
import BotCommand from '../BotCommand';
import { emojiLookup } from '../../index';

export default class PingCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  constructor() {
    this.name = 'ping';
    this.alias = ['pong', 'test'];
    this.description = "Ping command, answers with 'Pong!'.";
    this.usage = `${process.env.PREFIX}ping`;
    this.enabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;
    msg.reply('Pong!');
    msg.react(emojiLookup.get('au'));
    return true;
  }
}
