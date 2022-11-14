import puppeteer from "puppeteer/lib/types";

abstract class CrawlingStrategy {

    abstract url: string;
    abstract pagesToCrawl: string[];
    abstract filterLinks(link: string[]): string[];

    getUrl(): string {
        return this.url;
    }

    public getPagesToCrawl(): string[] {
        return this.pagesToCrawl.map(page => {
            return this.getUrl() + page;
        })
    }

    public isValidUrl(link: string): boolean {
        let url;
        try {
          url = new URL(link);
        } catch (_) {
          return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    
    public async getLinks2Crawl(crawler: puppeteer.Page): Promise<string[]> {
        let links: string[] = [];

        for (const url of this.getPagesToCrawl()) {

            await crawler.goto(url, {
                waitUntil: 'networkidle2'
            });

            const anchors = await crawler.$$('a[href]');

            for (let i = 0; i < anchors.length; i++) {
                const linkHandle = anchors[i];

                const href = await crawler.evaluate(
                    linkElem => linkElem.getAttribute('href'), 
                    linkHandle
                );

                if (href) {
                    links.push(href);
                }
                
            }
        }

        return this.filterLinks(links);
    }

    
}

export default CrawlingStrategy