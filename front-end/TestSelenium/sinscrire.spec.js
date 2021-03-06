// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('S'inscrire', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('S'inscrire', async function() {
    await driver.get("http://localhost:4200/home")
    await driver.manage().window().setRect(1366, 768)
    {
      const element = await driver.findElement(By.linkText("S\'inscrire"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    await driver.findElement(By.linkText("S\'inscrire")).click()
    await driver.findElement(By.id("mat-input-0")).click()
    await driver.findElement(By.id("mat-input-0")).sendKeys("alfred")
    await driver.findElement(By.id("mat-input-1")).sendKeys("alfred@gmail.om")
    await driver.findElement(By.id("mat-input-2")).sendKeys("reapsser")
    await driver.findElement(By.id("mat-input-2")).sendKeys(Key.ENTER)
  })
})
