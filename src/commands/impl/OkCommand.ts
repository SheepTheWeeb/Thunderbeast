import Discord from 'discord.js';
import BotCommand from '../BotCommand';
import { config } from '../../config/thunderbeast.config.json';

export default class OkCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  constructor() {
    this.name = 'ok';
    this.alias = ['oksign', 'okhand'];
    this.description = 'Shows that you are ok.';
    this.usage = `${process.env.PREFIX}ok`;
    this.enabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    // create embed message
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('OK')
      .setImage(config.gifs.ok)
      .setTimestamp()
      .setFooter('Het is oke');

    msg.channel.send(embed);
    return true;
  }
}
