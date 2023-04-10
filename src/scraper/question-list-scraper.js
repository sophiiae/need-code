const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')

const baseUrl = 'https://leetcode.com/problems/'
const questionsEndpoint = 'https://leetcode.com/api/problems/algorithms/'
const initDate = new Date('2001-01-1')

const scraper = async (url) => {
  const browser = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build()

  await browser.get(url)

  // Get page source
  const data = (await browser.getPageSource()).toString()

  // Extract content
  const content = data.match(/{(.*)}/gm)[0]

  // Parse to JSON
  return JSON.parse(content)
}

scraper(questionsEndpoint)
  .then(data => {
    const list = data.stat_status_pairs
    const problems = list.map(item => ({
      id: item.stat.frontend_question_id, // id shows on the problem list
      title: item.stat.question__title,
      url: baseUrl + item.stat.question__title_slug,
      difficulty: item.difficulty.level,
      paidOnly: item.paid_only ? 1 : 0,
      favor: item.is_favor ? 1 : 0,
      solved: 0,
      lastSubmit: initDate,
      noteUrl: ''
    }))

    problems.sort((a, b) => a.id - b.id)

    fs.writeFile(
      'problems.json',
      JSON.stringify(problems),
      'utf8',
      () => console.log('Done!')
    )
  })
