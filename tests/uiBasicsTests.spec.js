const {test, expect} = require('@playwright/test');

// test('Browser Context Test', async ({ browser })=>{
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://rahulshettyacademy.com/')
// });

test('Page Fixture Test', async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const username = await page.locator('#username')
    const password = await page.locator('#password')
    await username.fill('rahulshetty');
    await password.fill('learning');
    await page.locator('#signInBtn').click();
    const alertOnWrongIDPwd = await page.locator('[style*=block]');
    await expect(alertOnWrongIDPwd).toContainText('Incorrect');
    await username.fill('rahulshettyacademy');
    await page.locator('#signInBtn').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop')
});

/* 
browser and page are fixtures
test will run sequentially
test.only will run that test case only
on failure report opens automatically
fill() - wipe off teh existing content and enter given data
*/