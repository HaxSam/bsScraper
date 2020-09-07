const ircBot = require("./irc-bot");
const Websocket = require("ws");
const IrcBot = require("./irc-bot");

let myProtocols = ["Bot"];
let clients = new Map();

myProtocols.forEach((prot) => {
	clients.set(prot, new Map());
});

let wss = new Websocket.Server({
	port: 1337,
	handleProtocols: (protocols, req) => {
		if (myProtocols.includes(protocols[0])) return myProtocols[myProtocols.indexOf(protocols[0])];
		return false;
	},
});

wss.on("connection", (ws) => {
	if (!ws.protocol) return;
	client = clients.get(ws.protocol);
	let protocol = `${ws.protocol}${client.size}`;
	if (client.has(protocol))
		for (let i in [...Array(clients.size)]) {
			if (clients.has(`Bot${i}`)) continue;
			client.set(`${ws.protocol}${i}`, new IrcBot(`${ws.protocol}${i}`));
			ws.protocol = `${ws.protocol}${i}`;
			break;
		}
	else {
		client.set(protocol, new IrcBot(protocol));
		ws.protocol = protocol;
	}

	client.get(ws.protocol).onMessage((from, to, message) => {
		ws.send(`${from} => ${to}: ${message}`);
	});

	ws.on("message", (message) => {
		client.get(ws.protocol).send(message, "#HaxZium-BotNet");
	});

	ws.on("close", (code, reason) => {
		client.delete(ws.protocol);
		console.debug(`${ws.protocol} => Exit code ${code} with the reason: ${reason}`);
	});
});
