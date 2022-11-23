import CrawlingStrategy from "./Strategies/CrawlingStrategy";
import { Page } from "puppeteer";

export default class Crawler { 

    strategy:CrawlingStrategy;
    puppet:Page;

    constructor(puppet: Page) {
        this.puppet = puppet;
    }

    public setStrategy(strategy: CrawlingStrategy) {
        this.strategy = strategy;
    }

    /**
     * Open each of the pages/urls specified in a given strategy
     * and get all links from them
     */
    public async getLinksToCrawl(): Promise<string[]> {
        let links: string[] = [];

        for (const url of this.strategy.getPagesToCrawl()) {
            
            console.log(`Fetch links from ${url}`);
            
            // Open URL
            await this.puppet.goto(url, {
                waitUntil: 'networkidle2'
            });
            
            // Get me the <a> tags
            const anchors = await this.puppet.$$('a[href]');


            // loop through the anchors and get the href attribute
            for (let i = 0; i < anchors.length; i++) {
                const linkHandle = anchors[i];

                const href = await this.puppet.evaluate(
                    linkElem => linkElem.getAttribute('href'), 
                    linkHandle
                );

                if (href) {
                    links.push(href);
                }
                
            }

            // Wait some time before doing the next request
            await this.sleep(2500);
        }
        console.log('Links fetched before filtering:', links.length);

        return [...new Set(this.strategy.filterLinks(links))];
    }

    public async sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}