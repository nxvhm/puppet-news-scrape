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
    
}

export default CrawlingStrategy