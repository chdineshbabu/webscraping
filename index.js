import puppeteer from 'puppeteer';

const webSecarp=async()=>{
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
    });
    const page = await browser.newPage();
    await page.goto("https://www.imdb.com/search/title/?groups=top_250&sort=user_rating", {
        waitUntil: "domcontentloaded",
    });
    const quotes = await page.evaluate(() => {
        const quoteList = document.querySelectorAll(".lister-item-content");
        return Array.from(quoteList).map((quote) => {
          const movieName = quote.querySelector(".lister-item-header").innerText;
          const gross = quote.querySelector(".text-muted").innerText;
    
          return { movieName, gross };
        });
      });
      console.log(quotes);
      await browser.close();
}

webSecarp();
