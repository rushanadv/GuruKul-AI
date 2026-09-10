const puppeteer = require("puppeteer-core");

async function testScroll() {
  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--window-size=1440,900",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Take Hero screenshot
  await page.screenshot({ path: "/Users/rushanadvani/.gemini/antigravity-ide/brain/62c69281-a0f9-40f2-becb-00bcaa08d9ef/scroll_0_hero.png" });

  const scrollPoints = [
    { y: 1100, name: "timeline_start" },
    { y: 1800, name: "timeline_beat2" },
    { y: 2600, name: "timeline_beat3" },
    { y: 3400, name: "timeline_beat4" },
  ];

  for (const pt of scrollPoints) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), pt.y);
    await new Promise((r) => setTimeout(r, 800));

    // Read choreography status text
    const status = await page.evaluate(() => {
      const text = document.body.innerText;
      const match = text.match(/CHOREOGRAPHY:\s*(\d{2}\s*\/\s*\d{2})/);
      const week = text.match(/WEEK\s*(\d{2})/);
      return {
        choreography: match ? match[0] : "not found",
        week: week ? week[0] : "not found",
      };
    });

    console.log(`Scrolled to Y=${pt.y} (${pt.name}):`, status);
    await page.screenshot({ path: `/Users/rushanadvani/.gemini/antigravity-ide/brain/62c69281-a0f9-40f2-becb-00bcaa08d9ef/scroll_${pt.name}.png` });
  }

  // Scroll back up to verify reverse
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
  await new Promise((r) => setTimeout(r, 800));
  const reverseStatus = await page.evaluate(() => {
    const text = document.body.innerText;
    const match = text.match(/CHOREOGRAPHY:\s*(\d{2}\s*\/\s*\d{2})/);
    return match ? match[0] : "not found";
  });
  console.log("Reversed scroll to Y=1200:", reverseStatus);

  await browser.close();
}

testScroll().catch((err) => {
  console.error(err);
  process.exit(1);
});
