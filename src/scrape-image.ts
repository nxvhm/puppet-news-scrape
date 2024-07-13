import { program } from "commander";
import Sanitizer from "./lib/Sanitizer";
import puppet from './puppet'
import Crawler from './crawler'
program.option('--url <url>');
program.parse();

const url = program.getOptionValue('url');
if(typeof url == 'undefined')
	throw new Error("No url provided");

if(!Sanitizer.isValidUrl(url))
	throw new Error(`Invalid url provided:${url}`);

const main = async () => {
	const strategy = Crawler.findStrategyByUrl(url);

	if (!strategy) {
		console.error(`No available strategy for url: ${url}`);
		process.exit();
	}

	if (!strategy.contentSelectors.hasOwnProperty('image')) {
		console.error(`Strategy ${strategy.name} does not have image selector`);
		process.exit();
	}

	const crawler = new Crawler(await puppet());
	crawler.setStrategy(strategy);
	const imageUrl = await crawler.scrapeImage(url);

	process.stdout.write(String(imageUrl));
	process.exit();
}

main();
