const fs = require('fs')
const { promisify } = require('util')
const webdriver = require('selenium-webdriver')

const { Builder, Capabilities } = require('selenium-webdriver')

var capabilities = Capabilities.chrome();
(async function helloSelenium () {
  const driver = new Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(capabilities)
    .build()
  try {
    console.log('-----test 1')
    await driver.get('http://www.google.com')
    console.log('-----test 2')
  } finally {
    try {
      await driver.quit()
    } finally {
    }
  }
})()

// var webdriverio = require('webdriverio')
//
// var client = webdriverio
//   .remote({ baseUrl: 'http://localhost:4444', path: '/', desiredCapabilities: { browserName: 'chrome' } })
//   .init()
//   .url('https://www.google.com/')
//
// client
//   .getTitle()
//   .then(function (title) {
//     console.log(title)
//   })
//   .getHTML('body')
//   .then(function (data) {
//     console.log(data)
//   })
//   .end()

//
// const capabilities = webdriver.Capabilities.chrome()
// capabilities.set('chromeOptions', {
//   args: [
//     '--headless',
//     '--no-sandbox',
//     '--disable-gpu',
//     '--window-size=1980,1200'
//   ]
// })
//
// // awaitを使うので、asyncで囲む
// (async () => {
//   // ブラウザ立ち上げ
//   const driver = await new Builder()
//     .usingServer('http://localhost:4444')
//     .withCapabilities(capabilities)
//     .build()
//
//   // Youtubeへ移動
//   await driver.get('https://www.youtube.com/')
//
//   // 検索ボックスが表示されるまで待つ
//   await driver.wait(until.elementLocated(By.id('search')), 10000)
//
//   const base64 = await driver.takeScreenshot()
//   const buffer = Buffer.from(base64, 'base64')
//
//   // bufferを保存
//   await promisify(fs.writeFile)('screenshot.jpg', buffer)
//
//   // ブラウザ終了
//   driver.quit()
// })()
