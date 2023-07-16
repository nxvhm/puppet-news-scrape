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
        const strategy = new Strategies[site as StrategyKey];
        crawler.setStrategy(strategy);


        const siteModel = await Site.findOneBy({
          name: crawler.strategy.name
        })

        if (!siteModel) {
          console.log(`Site with name ${crawler.strategy.name} not registered in database. Skip crawling`);
          continue;
        }

        let links2Crawl = await crawler.getLinksToCrawl();
        console.log(links2Crawl);
        console.log(links2Crawl.length, " links scraped and filtered");

        for (const link of links2Crawl) {
            const fullLinkUrl = crawler.strategy.getFullUrl(link),
                  exists = await Article.exists(fullLinkUrl);

            if (exists) {
              console.log(`Article with url ${fullLinkUrl} already scraped`);
              continue;
            }

            console.log(`Scrape ${fullLinkUrl}`);

            let data = await crawler.scrapeArticle(fullLinkUrl);
            
            if (typeof (crawler.strategy as any).sanitizeDate === 'function') {
              data.date = (crawler.strategy as any).sanitizeDate(data.date);
            }

            if (typeof (crawler.strategy as any).sanitizeTitle === 'function') {
              data.title = (crawler.strategy as any).sanitizeTitle(data.title);
            }

            if (!data.date || isNaN(Date.parse(data.date))) {
              console.log(`Invalid date scraped: ${data.date}`);
              continue;
            }

            if (!data.title) {
              console.log(`No title scraped`);
              continue;
            }

            let article = new Article();
            article.url = fullLinkUrl;
            article.title = data.title;
            article.date = Article.formatDateString(data.date);
            article.category = data.category;
            article.site_id = siteModel.site_id;
            await article.save();

            console.log(`Article saved: ${article.title} [${article.date}]`);

        }
    }

    process.exit();
}

main();

