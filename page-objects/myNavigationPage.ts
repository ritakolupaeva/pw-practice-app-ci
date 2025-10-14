import { test, expect, chromium, Page } from '@playwright/test'

export class MyNavigationPage{

    readonly page: Page
    
    constructor(page: Page){
        this.page = page

    }
    
    async createTabInBrowser(){
        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()
        return page
    }

    async datpickerPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }
}
