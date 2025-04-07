// Page object model template
// Import necessary Playwright classes
import { type Page, type Locator, expect } from '@playwright/test'
import dotenv from "dotenv"

dotenv.config()
const BASE_URL= process.env.BASE_URL

export default class LoginPage {
    readonly page: Page;
    readonly username: Locator
    readonly password: Locator
    readonly loginBurron: Locator
    readonly errorMessage: Locator

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('xpath=//input[@name="username"]')
        this.password = page.locator('xpath=//input[@name="password"]')
        this.loginBurron = page.locator('xpath=//button')
        this.errorMessage = page.locator('xpath=//p[contains(@class,"oxd-alert-content-text")]')
    }

    async visitURL() {
        if(!BASE_URL) {
            throw new Error("The environment variable is not set!")
        }

        await this.page.goto(BASE_URL)
    }

    async login(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginBurron.click()
    }

    async checkDestinationPage() {
        await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    }

    async checkInvalidCredentialsMessage() {
        await expect(this.errorMessage).toHaveText("Invalid credentials")
    }
}
