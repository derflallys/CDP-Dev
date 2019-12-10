// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Se connecter et Créer un projet Ouvrir le projet et ajouter un collaborateur', function() {
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
  it('Se connecter et Créer un projet Ouvrir le projet et ajouter un collaborateur', async function() {
    await driver.get("http://localhost:4200/home")
    await driver.manage().window().setRect(1347, 748)
    await driver.findElement(By.css(".mt-3 > .mat-button-wrapper")).click()
    await driver.findElement(By.id("mat-input-0")).click()
    await driver.findElement(By.id("mat-input-0")).sendKeys("fred@gmail.com")
    await driver.findElement(By.id("mat-input-1")).sendKeys("repasser")
    await driver.findElement(By.id("mat-input-1")).sendKeys(Key.ENTER)
    await driver.findElement(By.linkText("Liste de Projets")).click()
    await driver.findElement(By.css(".button-add > .mat-button-wrapper")).click()
    await driver.findElement(By.id("mat-input-3")).click()
    await driver.findElement(By.id("mat-input-3")).sendKeys("Test Projet")
    await driver.findElement(By.css(".ng-tns-c9-11 .mat-form-field-infix")).click()
    {
      const element = await driver.findElement(By.css(".content"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    {
      const element = await driver.findElement(By.css(".content"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.css(".content"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    await driver.findElement(By.css(".content")).click()
    await driver.findElement(By.id("mat-input-4")).sendKeys("52")
    await driver.findElement(By.id("mat-input-5")).click()
    await driver.findElement(By.id("mat-input-5")).sendKeys("LA description du projet")
    await driver.findElement(By.id("mat-input-6")).click()
    await driver.findElement(By.id("mat-input-6")).click()
    await driver.findElement(By.css(".ng-tns-c9-12 .mat-form-field-infix")).click()
    await driver.findElement(By.css(".contentForm")).click()
    {
      const element = await driver.findElement(By.css(".mr-1 > .mat-button-wrapper"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    await driver.findElement(By.css(".mr-1 > .mat-button-wrapper")).click()
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css(".mat-row:nth-child(7) #view")).click()
    await driver.findElement(By.id("addCollab")).click()
    await driver.findElement(By.css(".input-field .mat-form-field-infix")).click()
    await driver.findElement(By.css(".input-field .mat-form-field-infix")).click()
    await driver.findElement(By.id("mat-input-8")).sendKeys("azer")
    await driver.findElement(By.id("collabAdd")).click()
  })
})
