const irc = require("irc");

class IrcBot {
  constructor(botName) {
    this.client = new irc.Client("irc.freenode.com", botName, { channels: ["#HaxZium-BotNet"] });
  }

  onMessage(eventHandler) {
    this.client.addListener("message", eventHandler);
  }

  onChannel(eventHandler, channel) {
    this.client.addListener(`message#${channel}`, eventHandler);
  }

  onPM(eventHandler) {
    this.client.addListener("pm", eventHandler);
  }

  send(message, channel) {
    this.client.say(channel, message);
  }
  
  join(channel, ...arg = []) {
    this.client.join(`#${channel} ${arg[0]}`)
  }

  leave(channel) {
    this.client.part(`#${channel}`)
  }

	cmd(mode, channel, rwx) {
		this.client.send(mode, channel, rwx, this.botName);
	}
}
