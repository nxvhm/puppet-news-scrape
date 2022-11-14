import puppeteer from 'puppeteer';

export default async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
    );


    await page.setViewport({
        width: 1620, height: 920,
        deviceScaleFactor: 1
    });

    return page;

} 

