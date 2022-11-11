import CrawlingStrategy from "./CrawlingStrategy";

class Aljazeera extends CrawlingStrategy {
    public url = 'https://balkaninsight.com/';

    public pagesToCrawl = [
        '/topics/regions/middleeast.html',
        '/topics/regions/africa.html',
        '/topics/regions/asia.html',
        '/topics/regions/asia-pacific.html'
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

export default Aljazeera