const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
require('events').EventEmitter.defaultMaxListeners = 0
const problems = require('../assets/prob.json')

const fs = require('fs')

const map = {}

const fetchAll = async (problems) => {
  const urls = Object.values(problems)
    .map(data => [data.id, data.url, data.paidOnly])

  for (let [id, url, premium] of urls) {
    if (!premium) {
      await scraper(id, url)
    }
  }
}

const scraper = async (id, url) => {
  const browser = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()

  await browser.get(url)

  // Get question content
  const data = await browser.wait(browser.findElement(By.className("_1l1MA")), 4000)

  const content = await data.getText()
  browser.close()
  map[id] = content
}

fetchAll(problems).then(() => {
  fs.writeFile(
    'contents.json',
    JSON.stringify(map),
    'utf8',
    () => console.log('Done!')
  )
})
