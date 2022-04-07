const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://demo.opencart.com/index.php?route=product/category&path=33"
  );
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitForXPath(
    "//div[@class='button-group']/button[@data-original-title='Compare this Product']"
  );
  const linkEx = await page.$x(
    "//div[@class='button-group']/button[@data-original-title='Compare this Product']"
  );
  if (linkEx.length > 0) {
    await page.waitForTimeout(3000);
    await linkEx[0].click();
  }
  await page.waitForTimeout(10000);
  await browser.close();
})();
