const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const inFile = process.argv[2] || 'standalone.html';
  const outFile = process.argv[3] || 'output.pdf';
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(inFile));
  await page.waitForTimeout(400);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: outFile,
    printBackground: true,
    preferCSSPageSize: true,
  });
  await browser.close();
  console.log('wrote', outFile);
})();
