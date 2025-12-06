const {test, expect} = require("@playwright/test")

test.only('More Validation', async({ page })=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.getByRole('button', {name :'Hide'}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
    await page.getByRole('button', {name :'Show'}).click();
    await expect(page.getByPlaceholder("Hide/Show Example")).not.toBeHidden();
    page.on('dialog',dialog=>dialog.accept());
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.locator("#mousehover").hover();
    await page.getByText('Top').click();
    const framesPage = await page.frameLocator("#courses-iframe");
    await framesPage.locator("[href*='all-access-subscription']").first().click();
    await expect(framesPage.getByText("Premium Access Plans")).toBeVisible();
    const subscribers = await framesPage.locator(".text-center").nth(1).locator("div").nth(1).textContent();
    console.log(subscribers)
});