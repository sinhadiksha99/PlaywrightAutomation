const { test, expect } = require('@playwright/test');

test('Calendar Test', async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2026";
    const expected =[monthNumber,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    let yearsInView = page.locator(".react-calendar__navigation__label")
    let yearscurrRange = await yearsInView.textContent();
    let yearsRange = yearscurrRange.trim().split(/[––—]/).map(y => y.trim());
    while (true) {
        if (parseInt(year)>=parseInt(yearsRange[0]) && parseInt(year)<=parseInt(yearsRange[1])) {
            await page.getByText(year).click();
            break;
        }
        else if (parseInt(year)<parseInt(yearsRange[0])) {
            await page.locator(".react-calendar__navigation__prev-button").click();
            await expect(yearsInView).not.toHaveText(yearsRange, { timeout: 10000 });
            yearscurrRange = await page.locator(".react-calendar__navigation__label").textContent();
            yearsRange = yearscurrRange.split("-");
        }
        else {
            await page.locator(".react-calendar__navigation__next-button").click();
            await expect(yearsInView).not.toHaveText(yearsRange, { timeout: 10000 });
            yearscurrRange = await page.locator(".react-calendar__navigation__label").textContent();
            yearsRange = yearscurrRange.split("-");
        }
    }
    await page.locator(".react-calendar__year-view__months__month").first().waitFor();
    await page.locator(".react-calendar__year-view__months__month").nth(parseInt(monthNumber) - 1).click();
    await page.locator('button').filter({ hasText: date }).first().click();
    await page.locator(".react-calendar").waitFor({state: 'hidden'});
    const dateInput = page.locator('input.react-date-picker__inputGroup__input');
    for(let i=0; i<expected.length; i++){
        console.log(await dateInput.nth(i).inputValue())
        await expect(expected[i]).toBe(await dateInput.nth(i).inputValue());
    }
});