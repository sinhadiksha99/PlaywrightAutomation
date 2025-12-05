const {test, expect} = require('@playwright/test');

test('Get BYs', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill(""); // getByPlaceholder - when tag has placeholder attribute
    await page.getByRole("button", { name : 'Submit'}).click();
    const isVisible = await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await expect(isVisible).toBeTruthy();
    await page.getByRole("link", {name : 'Shop'}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button", {name : "Add"}).click();
});

/*
    1.if we want to run automatically the tests on save using
        npx playwright test --ui then click "eye" in the opened box
    2. getByRole("button", {name : "Add"}). here name means basically what we see in ui on page not dom thingy
        example : <button>Sign in</button> await page.getByRole('button', { name: 'Sign in' }).click();
 */