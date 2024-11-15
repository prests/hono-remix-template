import * as stylex from '@stylexjs/stylex';

const actionPrimaryBase = '0, 0%, 0%' as const;

export const tokens = stylex.defineVars({
  actionPrimary: `hsl(${actionPrimaryBase})`,
  actionPrimaryHover: `hsla(${actionPrimaryBase}, 0.8)`,
  textOnPrimary: `hsl(0, 0%, 100%)`,
});
