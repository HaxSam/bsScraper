let vivoLinkDownloader = async () => {
	console.log("Start!");

	class MyBolbBuilder {
		constructor() {
			this.parts = [];
		}
		append(part) {
			this.parts.push(part);
			this.blob = undefined;
		}
		getBlob() {
			if (!this.blob) this.blob = new Blob(this.parts, { type: "text/plain" });
			return this.blob;
		}
	}

	let myBlobBuilder = new MyBolbBuilder();

	async function getLid(href) {
		let res = await fetch(href);
		let doc = $(new DOMParser().parseFromString(await res.text(), "text/html"));
		return doc.find("section.serie .hoster-player").data("lid");
	}

	async function vivoScraper(ticket) {
		async function vivoScraper(ticket) {
			if (!lids.length) {
				const a = document.createElement("a");
				let vivo = myBlobBuilder.getBlob();

				a.href = URL.createObjectURL(vivo);
				a.download = "vivoLink.txt";
				a.click();
				return;
			}

			let { link } = await $.post("ajax/embed.php", { LID: lids.pop(), ticket: ticket });
			if (!link) return;

			console.log(link);
			myBlobBuilder.append(link + "\n");
			grecaptcha.reset();
			grecaptcha.execute();
		}
	}

	grecaptcha.render("challenge", {
		sitekey: "6LeiZSYUAAAAAI3JZXrRnrsBzAdrZ40PmD57v_fs",
		size: "invisible",
		callback: vivoScraper,
	});

	let links = $(`li[class^='e'] > a[href*='${document.URL.match(/\/\d+\//)[0]}'][href$='/de']`);
	let lids = [];
	for (let a of links) lids.push(await getLid(a.href));
	grecaptcha.execute();
};

$("div[class='episode']").append($("<button id='vivoDownloader'>Vivo Link Downloader</button>"));
$("#vivoDownloader").on("click", vivoLinkDownloader);
