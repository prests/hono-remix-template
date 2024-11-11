import { test as base } from '@playwright/test';

import { type PlaywrightEnv, getPlaywrightEnv } from './env/playwright-env';

interface SetupFixture {
  env: PlaywrightEnv;
}

const playwrightEnv = getPlaywrightEnv();

const test = base.extend<SetupFixture>({
  /**
   * Inject playwright env variables into each test
   */
  env: playwrightEnv,
});

export { test };
