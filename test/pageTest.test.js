import puppeteer from "puppeteer";

test("Validating page title", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const app =
    "https://demo.opencart.com/index.php?route=product/category&path=33";
  await page.goto(app);
  const element = await page.$x("//h2[normalize-space()='Cameras']");
  const elementTitle = await page.evaluate((el) => el.textContent, element[0]);
  expect(elementTitle).toBe("Cameras");
  await browser.close();
});

test("Validating add to favorite click", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const app =
    "https://demo.opencart.com/index.php?route=product/category&path=33";
  await page.goto(app);
  const buttonElement = await page.waitForXPath(
    "//div[@id='content']//div[1]//div[1]//div[2]//div[2]//button[2]"
  );
  await buttonElement.click({ clickCount: 1 });
  await page.waitForTimeout(3000);
  const wishList = await page.$x("//span[contains(text(),'Wish List')]");
  const elementTitle = await page.evaluate((el) => el.textContent, wishList[0]);
  const totalItems = elementTitle
    .toString()
    .substring(elementTitle.toString().length - 2);
  const noElementsAdded = totalItems.substring(0, 1);
  expect(noElementsAdded).toBe("1");
  await browser.close()
});

test("Validating add to compare product click", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const app =
    "https://demo.opencart.com/index.php?route=product/category&path=33";
  await page.goto(app);
  const buttonElement = await page.waitForXPath(
    "//body//div[@id='product-category']//div[@class='row']//div[@class='row']//div[2]//div[1]//div[2]//div[2]//button[3]"
  );
  await buttonElement.click({ clickCount: 1 });
  await page.waitForTimeout(1000);
  const wishList = await page.$x("//a[@id='compare-total']");
  const elementTitle = await page.evaluate((el) => el.textContent, wishList[0]);
  const totalItems = elementTitle
    .toString()
    .substring(elementTitle.toString().length - 2);
  const noElementsAdded = totalItems.substring(0, 1);
  expect(noElementsAdded).toBe("1");
  await browser.close()
});
