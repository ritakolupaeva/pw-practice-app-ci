import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test.skip('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    // await successButton.click()

    // const text = successButton.textContent()
    // expect(text).toContain('Data loaded with AJAX get request.')
    // expect(text).toEqual('Data loaded with AJAX get request.') // <----------------- для единичного текста

    // await successButton.waitFor({state: "attached"})
    // const text = successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.') // <----------------- для массивов

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})
    
    test.skip('alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    //await page.waitForSelector('.bg-success')

    //___ wait for particlular response <----------ждем ответ на запрос с бэка
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
    
})

test.skip('timeouts', async ({page}) => {
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    //await successButton.click({timeout: 16000})
    await successButton.click()
})


