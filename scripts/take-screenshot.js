const puppeteer = require("puppeteer-core");
const path = require("path");

async function main() {
  const outputPath = process.argv[2] || "screenshot.png";
  const scrollY = parseInt(process.argv[3] || "0", 10);
  const waitMs = parseInt(process.argv[4] || "2000", 10);
  const viewportWidth = parseInt(process.argv[5] || "1440", 10);
  const viewportHeight = parseInt(process.argv[6] || "900", 10);

  const browser = await puppeteer.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--enable-webgl",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      `--window-size=${viewportWidth},${viewportHeight}`,
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: viewportWidth, height: viewportHeight });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });

  if (scrollY > 0) {
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, scrollY);
    await new Promise((r) => setTimeout(r, Math.max(1000, waitMs)));
  } else {
    await new Promise((r) => setTimeout(r, waitMs));
  }

  await page.screenshot({ path: outputPath, fullPage: false });
  await browser.close();
  console.log("Screenshot saved to", outputPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
