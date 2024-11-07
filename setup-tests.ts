import { afterEach, expect } from 'vitest';
import { installGlobals } from '@remix-run/node';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import * as axeMatchers from 'vitest-axe/matchers';

installGlobals();

expect.extend(matchers);
expect.extend(axeMatchers);

// Resolves a JS DOM concurrency bug https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented
HTMLCanvasElement.prototype.getContext = () => null;

afterEach(() => {
  cleanup();
});
