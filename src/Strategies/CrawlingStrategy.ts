export interface ArticleData {
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
}

abstract class CrawlingStrategy {

    /**
     * The name of the website as is used in databasr
     */
    abstract name: string;

    /**
     * The base url of the website
     */
    abstract url: string;

    /**
     * Array of page urls to be crawled
     */
    abstract pagesToCrawl: string[];

    /**
     * Declare function to filter out the invalid links that are scraped
     * on the initial pages crawling
     * @param link
     */
    abstract filterLinks(link: string[]): string[];

    /**
     * Object with all the content selectors required to scrape the article data
     */
    abstract contentSelectors: ArticleData;

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

    public getFullUrl(link: string):string {
        return link.includes('https://') || link.includes('http://')
            ? link : this.getUrl() + link;
    }

}

export default CrawlingStrategy
