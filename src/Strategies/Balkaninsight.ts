import CrawlingStrategy from "./CrawlingStrategy";

class Balkaninsight extends CrawlingStrategy {
    public url = 'https://balkaninsight.com/';

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

}

export default Balkaninsight