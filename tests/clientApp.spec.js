const {test, expect} = require('@playwright/test');

test('Client App', async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('anshika@gmail.com')
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.locator('.card-body h5').last().waitFor();
    console.log(await page.locator('.card-body h5').allTextContents());
});

test('Handling ui elements', async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    await dropDown.selectOption('consult');
    await page.locator("input[value='user']").click();
    await page.locator('#okayBtn').click();
    await expect(page.locator("input[value='user']")).toBeChecked();
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    await expect(dropDown).toHaveValue('consult');
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    const docText = page.locator("a[href*='documents-request']");
    await expect(docText).toHaveClass('blinkingText');
    await expect(docText).toHaveAttribute('class','blinkingText');
});

test('Child windows handling', async ({ browser })=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const docText = page.locator("a[href*='documents-request']");
    const page1Promise = context.waitForEvent('page');
    await docText.click(); // it opens a new page 
    const page1 = await page1Promise;
    console.log(await page1.locator('.red').textContent());
    const wholeText = await page1.locator('.red').textContent();
    const mailId = wholeText.split('@')[1].split(' ')[0];
    console.log(mailId);
    await username.fill(mailId)
});

/*
await page.waitForLoadState
'load' - wait for the load event to be fired.
'domcontentloaded' - wait for the DOMContentLoaded event to be fired.
'networkidle' - DISCOURAGED wait until there are no network connections for at least 500 ms. 
                Don't use this method for testing, rely on web assertions to assess readiness instead.(do not use)
*/


/*
await expect(page.locator('#terms')).not.toBeChecked(); - here await at starting coz actual action 
                                                                is performed outside of locator brackets
expect(await page.locator('#terms').isChecked()).toBeFalsy() - here await inside coz actual action is performed 
                                                                    inside of locator brackets(.isChecked())
*/