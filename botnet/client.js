(async () => {
	const bot = new WebSocket("http://localhost:1337", "Bot");
	bot.onmessage = () => {};
	bot.onclose = () => {};
})();
