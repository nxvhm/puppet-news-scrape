import CrawlingStrategy from "./CrawlingStrategy";

class Balkaninsight extends CrawlingStrategy {

    public url = 'https://balkaninsight.com';
    public name = 'Balkan Insight';
    public pagesToCrawl = [
        '/bulgaria-home',
        '/albania-home',
        '/romania-home',
        '/croatia-home',
        '/greece-home',
        '/kosovo-home',
        '/macedonia-home',
        '/turkey-home',
    ];

    public contentSelectors = {
        title: 'h1 > span.headline',
        description: '.btArticleExcerpt',
        date: 'span.btArticleDate',
        author: 'a.author',
        category: '.btSubTitle',
    }

    public filterLinks(links: string[]): string[] {
        return links.filter(link => {

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
                .length >= 6
        })
    }

}

export default Balkaninsight
