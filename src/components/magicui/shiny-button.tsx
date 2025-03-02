'use client';

import { cn } from '@/lib/utils';
import { motion, MotionProps, type AnimationProps } from 'motion/react';
import React from 'react';

const animationProps = {
  initial: { '--x': '100%', scale: 0.8 },
  animate: { '--x': '-100%', scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: 'loop',
    repeatDelay: 1,
    type: 'spring',
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      mass: 0.5
    }
  }
} as AnimationProps;

interface ShinyButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>, MotionProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative rounded-lg px-6 py-2 font-medium transition-shadow duration-300 ease-in-out',
          'bg-gradient-to-r from-blue-500 to-blue-600 text-neutral-100 shadow-md',
          'hover:shadow-lg hover:brightness-110',
          'dark:from-blue-600 dark:to-blue-700 dark:hover:brightness-125',
          className
        )}
        {...animationProps}
        {...props}
      >
        <span
          className="relative block size-full text-sm uppercase tracking-wide text-neutral-100"
          style={{
            maskImage:
              'linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))'
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: 'linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))',
            maskComposite: 'exclude'
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
        ></span>
      </motion.button>
    );
  }
);

ShinyButton.displayName = 'ShinyButton';
