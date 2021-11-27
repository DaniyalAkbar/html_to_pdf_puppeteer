const puppeteer = require("puppeteer");
const fs = require("fs");


exports.hello_world = async (req, res) => res.send('Hello World');

exports.generate_pdf = async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const html = await `${fs.readFileSync(`./dummy.html`, "utf8")}`;
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: false,
    preferCSSPageSize: true,
    displayHeaderFooter: true,

    headerTemplate: `<div class="header" style="font-size:20px; padding-left:15px;"><h1>Main Heading</h1></div> `,
    footerTemplate: '<footer><h5>Page <span class="pageNumber"></span> of <span class="totalPages"></span></h5></footer>',
    margin: { top: "200px", bottom: "150px", right: "20px", left: "20px"},
  });

  //  SENDING BACK PDF IN RESPONCE TO API CALL
  res.contentType("application/pdf");
  res.send(pdf);  
};