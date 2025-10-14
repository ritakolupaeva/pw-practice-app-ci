import { Page, expect} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{

    //private readonly page: Page

    constructor(page: Page){
        //this.page = page
        super(page)
    }

    async selectCommondDatePickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField =  this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const dateToAsserted =  await this.selectDateInTheCalendar(numberOfDaysFromToday)
        
       await expect(calendarInputField).toHaveValue(dateToAsserted)
    }

    async selectDatepickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField =  this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart =  await this.selectDateInTheCalendar(startDayFromToday)
        const dateToAssertEnd =  await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAsserted = `${dateToAssertStart} - ${dateToAssertEnd}` 
        
        await expect(calendarInputField).toHaveValue(dateToAsserted)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday )
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleDateString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleDateString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAsserted = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
        return dateToAsserted

    }

}