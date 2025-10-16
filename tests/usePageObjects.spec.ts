import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
// import { NavigationPage } from '../page-objects/navigationPage'
// import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
// import { DatepickerPage } from '../page-objects/datepickerPage'
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to page form @smoke',async ({page}) => {
    // const navigateTo = new NavigationPage(page)
    const pm = new PageManager(page)
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods @smoke @regression', async({page}) => {
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutsPage = new FormLayoutsPage(page)
    // const onDatePickerPage = new DatepickerPage(page)
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await page.screenshot({path: 'screenshots/formLayoutPage.png'})
    const buffer = await page.screenshot()
    // console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText:"Inline Form"}).screenshot({path: 'screenshots/inLineForm.png'})
    await pm.navigateTo().datepickerPage()
    // await pm.onDatepickerPage().selectCommondDatePickerDateFromToday(8)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})

test.only('testing with argos ci',async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layouts page");
    await pm.navigateTo().datepickerPage()
    await argosScreenshot(page, "datepicker page");

})

