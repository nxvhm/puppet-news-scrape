import Strategies from './Strategies'
import puppet from './puppet'
import Crawler from './Crawler'


let websites: string[] = [];

process.argv.forEach((arg, index) => {
    if (index <= 1) return;

    websites.push(arg);
})

type StrategyKey = keyof typeof Strategies;

const main = async  () => {

    const crawler = new Crawler(
        await puppet()
    );

    for (const site of websites) {

        if (!Strategies.hasOwnProperty(site)) continue;

        console.log("Scraping news for:", site);

        crawler.setStrategy(
            new Strategies[site as StrategyKey]
        );
        let links2Crawl = await crawler.getLinksToCrawl();
        console.log(links2Crawl.length, " links scraped and filtered");

        for (const link of links2Crawl) {
            console.log(`Scrape ${link}`);
            let data = await crawler.scrapeArticle(link);
            console.log(data);
        }
    }

    process.exit();
}

main();

