// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40000,
  expect: {
    timeout: 20000
  },
  reporter : 'html',
  use: {
    browserName: 'chromium',
    trace: 'on-first-retry',
    headless: false
  },

});
/* testDir: './tests', - test directory from where it runs the test 
  timeout: 40000, - total time a test can take is 40000( upper limit of test run)
  expect: {
    timeout: 20000 - assertion timeout
  },
  reporter : 'html', - type of reporter
  use: {
    browserName: 'chromium', - browser name
    trace: 'on-first-retry',
  },
  for safari we use webkit, playwright specific engine drived from safari
  if set headless as  false then we dont need to use -- headed with npx playwright test setup
*/
