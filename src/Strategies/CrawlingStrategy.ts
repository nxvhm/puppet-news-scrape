type ArticleDataSelectors = {
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
}

abstract class CrawlingStrategy {

    abstract url: string;
    abstract pagesToCrawl: string[];
    abstract filterLinks(link: string[]): string[];
    abstract contentSelectors: ArticleDataSelectors;
    
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