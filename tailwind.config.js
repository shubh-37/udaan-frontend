/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      animation: {
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(100%)'
          },
          '100%': {
            transform: 'translateX(-100%)'
          },
          from: {
            transform: 'translateX(0)'
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))'
          }
        },
        'marquee-vertical': {
          from: {
            transform: 'translateY(0)'
          },
          to: {
            transform: 'translateY(calc(-100% - var(--gap)))'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))', // Dark gray (0 0% 20%) in light, light gray (0 0% 80%) in dark
          foreground: 'hsl(var(--primary-foreground))' // White (0 0% 100%) in light, black (0 0% 0%) in dark
        },
        background: 'hsl(var(--background))', // White (0 0% 100%) in light, black (0 0% 0%) in dark
        ring: 'hsl(var(--ring))', // Dark gray (0 0% 20%) in light, light gray (0 0% 80%) in dark
        border: 'hsl(var(--border))', // Light gray (0 0% 80%) in light, dark gray (0 0% 20%) in dark
        input: 'hsl(var(--input))', // Light gray (0 0% 90%) in light, very dark gray (0 0% 15%) in dark
        foreground: 'hsl(var(--foreground))', // Black (0 0% 0%) in light, white (0 0% 100%) in dark
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // Light gray (0 0% 90%) in light, dark gray (0 0% 20%) in dark
          foreground: 'hsl(var(--secondary-foreground))' // Black (0 0% 0%) in light, white (0 0% 100%) in dark
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // Red (0 84.2% 60.2%) in light, darker red (0 62.8% 30.6%) in dark
          foreground: 'hsl(var(--destructive-foreground))' // White (0 0% 100%) in both
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // Very light gray (0 0% 95%) in light, very dark gray (0 0% 15%) in dark
          foreground: 'hsl(var(--muted-foreground))' // Medium gray (0 0% 40%) in light, medium light gray (0 0% 60%) in dark
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // Light gray (0 0% 90%) in light, dark gray (0 0% 20%) in dark
          foreground: 'hsl(var(--accent-foreground))' // Black (0 0% 0%) in light, white (0 0% 100%) in dark
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))', // White (0 0% 100%) in light, black (0 0% 0%) in dark
          foreground: 'hsl(var(--popover-foreground))' // Black (0 0% 0%) in light, white (0 0% 100%) in dark
        },
        card: {
          DEFAULT: 'hsl(var(--card))', // Very light gray (0 0% 98%) in light, very dark gray (0 0% 10%) in dark
          foreground: 'hsl(var(--card-foreground))' // Black (0 0% 0%) in light, white (0 0% 100%) in dark
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
