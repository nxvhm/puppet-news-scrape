import puppeteer from 'puppeteer';


let boostrap = async () => {
  try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0')
      const URL = "https://balkaninsight.com/2022/11/03/north-macedonia-detains-rightist-activist-over-school-bomb-threats/";

      await page.setViewport({
        width: 1620, height: 920,
        deviceScaleFactor: 1
      });

      await page.goto(URL, {
        waitUntil: 'networkidle2',
      });
      // h1 span.headline
      const element = await page.waitForSelector('h1 span.headline');
      if (element) {
        const value = await element.evaluate(el => el.textContent);
        console.log('H1 is:', value);
        process.exit(1)
      }

  } catch (e) {
    console.log("ERROR DURING BOOTSTRAP:", e);
  }
}

let main = async () => {
  await boostrap();
}

main()