import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    //private readonly page: Page

    constructor(page: Page) {
        //this.page = page
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridEmailForm = this.page.locator('nb-card', {hasText:"Using the Grid"})
        await usingTheGridEmailForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridEmailForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridEmailForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridEmailForm.getByRole('button').click()
    }

    /**
     * This method fill out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText:"Inline form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()
    }

}