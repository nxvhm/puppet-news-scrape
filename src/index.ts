import Strategies from './Strategies'
import puppet from './puppet'


let websites: string[] = [];

process.argv.forEach((arg, index) => {
    if (index <= 1) return;

    websites.push(arg);
})

type StrategyKey = keyof typeof Strategies;

const main = async  () => {

    let crawler = await puppet();

    for (const site of websites) {
        if (!Strategies.hasOwnProperty(site)) continue;
        console.log("Scraping news for:", site);
        let strategy = new Strategies[site as StrategyKey];
        let links2Crawl = await strategy.getLinks2Crawl(crawler);
        console.log(links2Crawl.length, " links scraped");   
    }

    process.exit();
}

main();

