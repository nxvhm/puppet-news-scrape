import CrawlingStrategy from "./CrawlingStrategy";

class Aljazeera extends CrawlingStrategy {

    public url = 'https://www.aljazeera.com';
    public name = 'Aljazeera';
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

    public filterLinks(links: string[]): string[] {
			return links.filter(link => {
				if (link[0] == '/')
					link = this.getUrl() + link;

				if (!this.isValidUrl(link))
					return false;

				return link.split('/')
					.filter(part => part.length > 0)
					.length >= 7
			}).map(link => {
				return link[0] == '/' ? this.getUrl()+link : link;
			})
    }

}

export default Aljazeera
