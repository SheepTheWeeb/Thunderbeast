import BotCommand from '../commands/BotCommand';
import PingCommand from '../commands/impl/PingCommand';
import OkCommand from '../commands/impl/OkCommand';

export default class CommandLookup {
  commands: Array<BotCommand>;

  constructor() {
    const commands = [new PingCommand(), new OkCommand()];

    this.commands = commands;
  }

  public get(commandName: string): BotCommand | undefined {
    let foundCommand = this.commands.find((e) => e.name === commandName);
    if (foundCommand) return foundCommand;
    foundCommand = this.commands.find((e) => e.alias.indexOf(commandName) > -1);
    return foundCommand;
  }
}
