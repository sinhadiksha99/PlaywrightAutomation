const {test, expect} = require('@playwright/test');

test('E2E Order Place', async ({ page })=>{
    const productName = 'ADIDAS ORIGINAL'
    await page.goto('https://rahulshettyacademy.com/client')
    await page.getByPlaceholder("email@example.com").fill('shutterbug2706@gmail.com')
    await page.getByPlaceholder('enter your passsword').fill('Diksha@123');
    await page.getByRole('button', { name:'Login' }).click();
    await page.locator('.card-body b').last().waitFor();
    const product = await page.locator('.card-body')
    await product.filter({ hasText:productName }).getByRole('button',{ name:'Add To Cart' }).click();
    await page.getByRole("listitem").getByText("Cart").click();
    await expect(page.getByText(productName)).toBeVisible({timeout:5000});
    await page.getByRole('button', { name:'Checkout' }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    const dropdownSection = page.locator(".ta-results");
    await dropdownSection.waitFor();
    await dropdownSection.getByText("India",{ exact:'true'}).click();
    expect(await page.getByPlaceholder("Select Country").inputValue()).toBe("India");
    await expect(page.getByText('shutterbug2706@gmail.com')).toBeVisible();
    await expect(await page.locator(".user__name label").textContent()).toBe("shutterbug2706@gmail.com");
    await page.getByText('Place Order ').click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
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

/* 
    here test using getBys
*/