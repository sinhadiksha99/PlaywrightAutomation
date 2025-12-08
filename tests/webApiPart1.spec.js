const { test, expect, request } = require("@playwright/test");
const { log } = require("console");
/* request - Exposes API that can be used for the Web API testing.*/

const loginPayload = {userEmail: "shutterbug2706@gmail.com", userPassword: "Diksha@123"};
let token;

const orderPlacePayload = {orders: [{country: "Bahrain", productOrderedId: "68a961719320a140fe1ca57c"}]};
let orderId;

test.beforeAll(async ()=>{
    //Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
        data:loginPayload
    });
    await expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    //OrderPlace API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{ 
        data:orderPlacePayload,
        headers:{
            'Authorization': token,
            'Content-Type': 'application/json'
        }, 
    });
    await expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log(orderId)
});

test.only("API_1", async({ page })=>{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },token);
    await page.goto('https://rahulshettyacademy.com/client')
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