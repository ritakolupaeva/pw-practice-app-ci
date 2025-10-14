import {test, expect} from '@playwright/test'
import { asyncScheduler } from 'rxjs'
import { __await } from 'tslib'

test.skip('input in Vkusvill', async({page}) => {
    await page.goto('https://vkusvill.ru/')
    await page.locator('.HeaderSearchBlock__Input').fill('борщ')
    await page.keyboard.press("Enter")
    await page.waitForTimeout(4000)
    const allCards = await page.locator("//a[contains(@class, 'ProductCard__link')]").all()
    console.log(allCards.length)
    const allCardsLength = allCards.length - 1
    let counter = 0
        for (let i = 0; i < allCardsLength; i++) {
            let text = await allCards[i].innerText()
            if(text.toLowerCase().includes('борщ')){
                counter++
            }
            console.log(await allCards[i].innerText())
        }
    console.log(counter)
})