const getCleanSummaryForServer = (html) => {
	if (!html) return "";

	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

	doc.querySelectorAll("span.spoiler--client").forEach(span => {
		const tgSpoiler = span.querySelector("tg-spoiler");
		if (tgSpoiler) {
			span.replaceWith(tgSpoiler);
		} else {
			span.replaceWith(...span.childNodes);
		}
	});

	doc.querySelectorAll("*").forEach(el => {
		if (!["TG-SPOILER", "CODE", "BLOCKQUOTE"].includes(el.tagName)) {
			el.removeAttribute("style");
		}
	});

	return doc.body.innerHTML;
};
export default getCleanSummaryForServer;
