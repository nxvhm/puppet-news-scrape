import CrawlingStrategy from "./CrawlingStrategy";

class Balkaninsight extends CrawlingStrategy {
    public url = 'https://balkaninsight.com';

    public pagesToCrawl = [
        '/albania-home',
        '/bulgaria-home',
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
        text: '.btArticleBody',
    }

    public filterLinks(links: string[]): string[] {
        return links.filter(link => {

            if (link[0] == '/') {
                link = this.getUrl() + link;

            }

            if (!this.isValidUrl(link)) {
                return false;
            }

            return link.split('/')
                .filter(part => part.length > 0)
                .length >= 7            
        })
    }

}

export default Balkaninsight