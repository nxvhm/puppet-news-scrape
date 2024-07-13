import CrawlingStrategy from "./CrawlingStrategy";

class Guardian extends CrawlingStrategy {
    public url = 'https://www.theguardian.com';
    public name = 'Guardian';
    public pagesToCrawl = [
			'/europe',
			'/world',
			'/uk/environment',
			'/global-development',
			'/environment/climate-crisis'
    ];

    public contentSelectors = {
			title: 'h1',
			description: '.dcr-4gwv1z > p',
			date: 'summary.dcr-1ybxn6r > span',
			author: 'a[rel="author"]',
			text: '#maincontent p',
			image: 'picture.dcr-evn1e9 > source'
    }

    public onlyFirst = [
			'title', 'description', 'date', 'author', 'image'
		];
		public acceptCookieButton = '.message-component.message-button.no-children.focusable.button.sp_choice_type_11';

    public filterLinks(links: string[]): string[] {
			return links.filter(link => {
				if (link[0] == '/') {
					link = this.getUrl() + link;
				}

				if (!this.isValidUrl(link))
					return false;

				if (link.includes('/category'))
					return false;

				const linkParts = link.split('/');
				return linkParts.filter(part => part.length > 0).length >= 8 && linkParts.includes('article')
			})
    }

		public sanitizeDate(dateString: string): string | null {
			if(!dateString)
				return null;

			return dateString.slice(0, 15);
		}

		public scrapeImage(node: Element): string | null {
			return node.getAttribute('srcset');
		}
}

export default Guardian
