import Discord from 'discord.js';

export default class RoleSelectListener {
  listenDiscord = '801871273151299588';
  listenChannel = '801880821992128572';
  listenMessage = '802294912946405416';
  roles = [
    { emoji: '🌲', role: 'Terraria' },
    { emoji: 'peepoMinecraft', role: 'Minecraft' },
    { emoji: '☀️', role: 'Stardew Valley' },
    { emoji: 'bobfly', role: 'Animal Crossing' },
    { emoji: 'SafestChicken', role: 'Guild Wars 2' },
    { emoji: 'Nice', role: 'Runescape' },
    { emoji: 'amongdead', role: 'Among Us' },
    { emoji: 'GhostHug', role: 'Phasmophobia' },
    { emoji: 'skaffabent', role: 'OSU!' }
  ];

  listen(client: Discord.Client): void {
    const guild = client.guilds.cache.get(this.listenDiscord);
    const channel = guild.channels.cache.get(this.listenChannel);

    if (channel.type === 'text') {
      (channel as Discord.TextChannel).messages
        .fetch(this.listenMessage)
        .then((msg) => {
          const collector = msg.createReactionCollector(() => true, {
            dispose: true
          });
          collector.on('collect', (reaction, user) => {
            const { guild } = reaction.message;
            const role = guild.roles.cache.find(
              (role) =>
                role.name ===
                this.roles.find((r) => r.emoji === reaction.emoji.name)?.role
            );
            if (!role) return;

            const member = guild.members.cache.find(
              (member) => member.id === user.id
            );

            if (!member.roles.cache.find((r) => r.id === role.id)) {
              member.roles.add(role);
            }
          });

          collector.on('remove', (reaction, user) => {
            const { guild } = reaction.message;
            const role = guild.roles.cache.find(
              (role) =>
                role.name ===
                this.roles.find((r) => r.emoji === reaction.emoji.name)?.role
            );
            if (!role) return;

            const member = guild.members.cache.find(
              (member) => member.id === user.id
            );

            if (member.roles.cache.find((r) => r.id === role.id)) {
              member.roles.remove(role);
            }
          });
        });
    }
  }
}
