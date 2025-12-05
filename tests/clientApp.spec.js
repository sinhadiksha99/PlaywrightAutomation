const {test, expect} = require('@playwright/test');

test.only('Client App', async ({ page })=>{
    const productName = 'ADIDAS ORIGINAL'
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill('shutterbug2706@gmail.com')
    await page.locator('#userPassword').fill('Diksha@123');
    await page.locator('#login').click();
    await page.locator('.card-body b').last().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());
    const product = await page.locator('.card-body')
    const totalProducts = await page.locator('.card-body').count();
    for(let i =0 ; i<totalProducts ; i++){
        if(await product.nth(i).locator("b").textContent() === productName){
            await product.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await expect(page.locator("h3:has-text('ADIDAS ORIGINAL')")).toBeVisible({timeout:5000});
    await page.locator('text=Checkout').click();
    await page.locator('input[placeholder="Select Country"]').pressSequentially("Ind");
    const dropdownSection = page.locator(".ta-results");
    await dropdownSection.waitFor();
    const options = await dropdownSection.locator("button").count();
    for(let i =0 ;i<options ;i++){
        if(await dropdownSection.locator("button").nth(i).textContent() === ' India'){
            await dropdownSection.locator("button").nth(i).click();
            break;
        }
    }
    expect(await page.locator('input[placeholder="Select Country"]').inputValue()).toBe("India")
    expect(await page.locator(".user__name label").textContent()).toBe('shutterbug2706@gmail.com');
    await page.locator(".user__name .actions a").click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")
    const orderId = await page.locator("table tr label.ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator(`button[routerlink*="myorders"]`).click();
    await page.locator(`[scope="row"]`).first().waitFor();
    const orderIds = await page.locator(`tbody tr`).count();
    let isOrderPresent = false;
    for(let i=0; i<orderIds; i++){
        const orderIdFOrCUrrentRow = await page.locator(`tbody tr`).nth(i).locator('th').textContent();
        if(orderId.includes(orderIdFOrCUrrentRow)){
            isOrderPresent = true;
            await await page.locator(`tbody tr`).nth(i).locator('td button').first().click();
            break;
        }
    }
    const orderDetailsOrderID = await page.locator('.-main').textContent();
    const correctOrderID = orderId.includes(orderDetailsOrderID);
    await expect(correctOrderID).toBeTruthy();
});

/*await page.locator('input[placeholder="Select Country"]') - here if we type country it will show suggestion 
 in which we have to click on the country which we want to select, kind of like suggestive dropdown
 hence will not use fill as we want o put keywords one by one
*/


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