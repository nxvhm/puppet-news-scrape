import 'dotenv/config'
import puppeteer from 'puppeteer-extra';
import { executablePath } from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

export default async () => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        headless: Boolean(Number(process.env.HEADLESS)),
        executablePath: executablePath(),
				args: [
					'--window-size=1920,1080',
				],
    });
    const page = await browser.newPage();

    // await page.setUserAgent(
    //     'Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0'
    // );


    await page.setViewport({
        width: 1620, height: 920,
        deviceScaleFactor: 1
    });

    return page;

}

