const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://demo.opencart.com/index.php?route=product/category&path=33"
  );
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
