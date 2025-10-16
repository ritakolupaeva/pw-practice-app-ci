import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  // globalTimeout: 60000,
  expect: {
    timeout: 2000,
    toHaveScreenshot: {maxDiffPixels: 50}
  },

  retries: 1,

  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: "argos_aafa8bef04cd853ee8db65eb2614acf883",
      },
    ],
    ['html'],
    // ['list'],
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    // ['junit', {outputFile: 'test-results/junitReport.xml'}],
    ['allure-playwright'],
  ],

  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
          : process.env.STAGING === '1' ? 'http://localhost:4202/'
          : 'http://localhost:4200/',
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode:'off',
      size: {width: 1920, height: 1080}
    }

  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200/' }
    },
    {
      name: 'chromium',
      // use: {
      //   viewport: {width: 1170, height: 2532}
      // }
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {
          mode:'off',
          size: {width: 1920, height: 1080}
    }
      },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        // ...devices['iPhone 13 Pro']
        viewport: {width: 414, height: 800}
      }
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 180000
  }
});
