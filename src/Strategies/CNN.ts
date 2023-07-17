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
        text: '.article__content-container p',
        image: 'img.image__dam-img'
    }
    /**
     * Specifies for whic content selectors only the first node element
     * should be considered for the result
     */
    public onlyFirst = [
        'title', 'description', 'date', 'author', 'image'
    ];

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

    public sanitizeDate(dateString: string): string {
        dateString = dateString.replace(/(?:\r\n|\r|\n)/g, '')
        .trim()
        .replace(/ +/, " ")
        .trim();

      if (dateString.includes("Published ")) {
        dateString = dateString.replace("Published ", "");
      }

      if (dateString.includes("Updated ")) {
        dateString = dateString.replace("Updated ", "");
      }

      const [, day, year] = dateString.trim().split(", ") 

      return [day, year].join(" ");
    }

}

export default CNN
