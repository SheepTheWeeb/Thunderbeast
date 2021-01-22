import Discord from 'discord.js';

export default class EmojiLookup {
  emojis: Array<Discord.GuildEmoji>;

  constructor() {
    this.emojis = [];
  }

  init(client: Discord.Client): void {
    client.guilds.cache.forEach((guild: Discord.Guild) => {
      guild.emojis.cache.forEach((emoji: Discord.GuildEmoji) =>
        this.emojis.push(emoji)
      );
    });
  }

  public get(emojiName: string): Discord.GuildEmoji {
    return this.emojis.find((e) => e.name === emojiName);
  }
}
