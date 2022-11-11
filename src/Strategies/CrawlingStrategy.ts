abstract class CrawlingStrategy {

    abstract url: string;
    abstract pagesToCrawl: string[];

    getUrl(): string {
        return this.url;
    }

    public getPagesToCrawl(): string[] {
        return this.pagesToCrawl.map(page => {
            return this.getUrl() + page;
        })
    }
}

export default CrawlingStrategy