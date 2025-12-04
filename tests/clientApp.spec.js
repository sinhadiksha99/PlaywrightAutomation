const {test, expect} = require('@playwright/test');

test('Client App', async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('anshika@gmail.com')
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator('#login').click();
    await page.locator('.card-body h5').last().waitFor();
    console.log(await page.locator('.card-body h5').allTextContents());
});

test.only('Handling ui elements', async ({ page })=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const username = await page.locator('#username');
    const password = await page.locator('#password');
    const signIn = await page.locator('#signInBtn');
    const dropDown = await page.locator('select.form-control');
    await dropDown.selectOption('consult');
    await page.locator("input[value='user']").click();
    await page.locator('#okayBtn').click();
    await expect(page.locator("input[value='user']")).toBeChecked();
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();
    await expect(dropDown).toHaveValue('consult');
    expect(await page.locator('#terms').isChecked()).toBeFalsy()
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