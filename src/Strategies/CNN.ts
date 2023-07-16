import CrawlingStrategy from "./CrawlingStrategy";

class CNN extends CrawlingStrategy {

    public url = 'https://edition.cnn.com';
    public name = 'CNN';
    public pagesToCrawl = [
        '/world/europe',
        // '/world/asia',
        // '/world/middle-east',
        // '/world/africa'
    ];

    public contentSelectors = {
        title: 'h1#maincontent',
        description: '.article__content p.paragraph',
        date: '.timestamp',
        author: '.byline__names',
        category: '',
        text: '.article__content',
    }

    public filterLinks(links: string[]): string[] {
        return links.filter(link => {

            // CNN Uses relative links at the moment
            if (link.includes('http://') || link.includes('https://')) {
                return false;
            }

            if (link[0] == '/') {
                link = this.getUrl() + link;
            }

            if (!this.isValidUrl(link)) {
                return false;
            }

            if (link.includes('/category')) {
                return false;
            }

            return link.split('/')
                .filter(part => part.length > 0)
                .length >= 7
        })
    }

}

export default CNN
