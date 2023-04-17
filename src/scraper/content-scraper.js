const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
require('events').EventEmitter.defaultMaxListeners = 0
const problems = require('./q5.json')

// const problems = {
//   "1": {
//     "id": 1,
//     "title": "Two Sum",
//     "url": "https://leetcode.com/problems/two-sum",
//     "difficulty": 1,
//     "paidOnly": 0,
//     "favor": 0,
//     "solved": 0,
//     "lastSubmit": "2000-01-16T00:00:00.000Z",
//     "noteUrl": ""
//   },
//   "2": {
//     "id": 2,
//     "title": "Add Two Numbers",
//     "url": "https://leetcode.com/problems/add-two-numbers",
//     "difficulty": 2,
//     "paidOnly": 0,
//     "favor": 0,
//     "solved": 0,
//     "lastSubmit": "2000-01-16T00:00:00.000Z",
//     "noteUrl": ""
//   },
// }

const fs = require('fs')

const map = {}

const fetchAll = async (problems) => {
  const urls = Object.values(problems)
    .map(data => [data.id, data.url, data.paidOnly])

  for (let [id, url, premium] of urls) {
    if (!premium) {
      console.log(`scrapping question: ${id}`)
      await scraper(id, url)
    }
  }
}

const scraper = async (id, url) => {
  const browser = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build()

  await browser.get(url)

  // Get question content
  // const data = await browser.wait(browser.findElement(By.className("_1l1MA")), 4000)

  const data = await browser.wait(browser.findElement(By.className("_1l1MA")), 4000)

  const content = await data.getAttribute('innerHTML')
  browser.close()
  map[id] = content
}

fetchAll(problems).then(() => {
  fs.writeFile(
    'content5.json',
    JSON.stringify(map),
    'utf8',
    () => console.log('Done!')
  )
})
