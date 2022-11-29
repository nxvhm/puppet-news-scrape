import Strategies from './Strategies'
import puppet from './puppet'
import Crawler from './crawler'
import {DB} from './db/DataSource'
import Article from './Models/Article';
import Site from './Models/Site';

let websites: string[] = [];

process.argv.forEach((arg, index) => {
    if (index <= 1) return;

    websites.push(arg);
})

type StrategyKey = keyof typeof Strategies;

const main = async  () => {
    await DB.initialize();

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


        const siteModel = await Site.findOneBy({
          name: crawler.strategy.name
        })
        if (!siteModel) {
          console.log(`Site with name ${crawler.strategy.name} not registered in database. Skip crawling`);
          continue;
        }

        console.log(links2Crawl.length, " links scraped and filtered");

        for (const link of links2Crawl) {

            let exists = await Article.exists(link);

            if (exists) {
              console.log(`Article with url ${link} already scraped`);
              continue;
            }

            console.log(`Scrape ${link}`);
            let data = await crawler.scrapeArticle(link);

            if (!data.date || isNaN(Date.parse(data.date))) {
              console.log(`Invalid date scraped: ${data.date}`);
              continue;
            }

            if (!data.title) {
              console.log(`No title scraped`);
              continue;
            }

            let article = new Article();
            article.url = link;
            article.title = data.title;
            article.date = Article.formatDateString(data.date);
            article.category = data.category;
            article.site_id = siteModel.site_id;
            await article.save();

            console.log(`Article saved: ${article.title}`);

        }
    }

    process.exit();
}

main();

