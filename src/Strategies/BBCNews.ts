import CrawlingStrategy from "./CrawlingStrategy";
import { DateTime } from "luxon";

class BBCNews extends CrawlingStrategy {
    public url = 'https://www.bbc.com';
    public name = 'BBCNews';
    public pagesToCrawl = [
			'/news/war-in-ukraine',
			'/news/world/asia',
			'/news/world/latin_america',
			'/news/topics/c2vdnvdg6xxt'
    ];

    public contentSelectors = {
			title: '[data-component="headline-block"]',
			description: '[data-component="text-block"] > p',
			date: 'time',
			author: '[data-testid="byline-name"]',
			text: '[data-component="text-block"]',
			image: '[data-component="image-block"] img'
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
				return linkParts.filter(part => part.length > 0).length >= 3 && linkParts.includes('articles')
			})
    }

		public sanitizeDate(dateString: string): string | null {
			if(!dateString)
				return null;

			let date;
			if(dateString.includes('days ago')) {

				date = DateTime.now().minus({
					days: Number(dateString.substring(0, dateString.indexOf(' days ago')))
				}).toFormat('yyyy-MM-dd');

			} else if(dateString.includes('hours ago')) {

				date = DateTime.now().minus({
					hours: Number(dateString.substring(0, dateString.indexOf(' hours ago')))
				}).toFormat('yyyy-MM-dd');

			} else if (dateString.includes('minutes ago')) {

				date = DateTime.now().minus({
					minutes: Number(dateString.substring(0, dateString.indexOf(' minutes ago')))
				}).toFormat('yyyy-MM-dd');

			} else {
				date = dateString
			}

			return date;
		}
}

export default BBCNews
