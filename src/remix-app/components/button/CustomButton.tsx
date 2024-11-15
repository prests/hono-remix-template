import { Slot } from '@radix-ui/react-slot';
import * as stylex from '@stylexjs/stylex';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { tokens } from '../../theme/theme.stylex';

/**
 * This button comes straight from shadcn's button. I simply converted the tailwind utility classes to stylex syntax
 *
 * https://ui.shadcn.com/docs/components/button
 *
 */

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const styles = stylex.create({
  base: {
    height: '2.5rem',
    padding: '0.5rem 1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    outline: {
      default: 'none',
      ':focus-visible': '2px solid transparent',
    },
    outlineOffset: {
      ':focus-visible': '2px',
    },
    transition: 'color 0.2s, background-color 0.2s',
    backgroundColor: {
      default: tokens.actionPrimary,
      ':hover': tokens.actionPrimaryHover,
    },
    color: tokens.textOnPrimary,
    pointerEvents: {
      ':disabled': 'none',
    },
    boxShadow: {
      ':focus-visible':
        'rgb(255, 255, 255) 0px 0px 0px 2px, rgb(24, 24, 27) 0px 0px 0px 4px, rgba(0, 0, 0, 0) 0px 0px 0px 0px',
    },
    opacity: {
      ':disabled': 0.5,
    },
  },
});

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} {...stylex.props(styles.base)} {...props} />;
  }
);
CustomButton.displayName = 'Custom Button';

export default CustomButton;
export type { CustomButtonProps };
