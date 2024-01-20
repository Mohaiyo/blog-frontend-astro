import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,mdx,ts,tsx,vue,md}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      typography: () => ({
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              padding: '4px',
              margin: '0 2px',
              backgroundColor: '#2563eb',
              color: '#fff',
              borderRadius: '4px'
            }
          }
        },
        invert: {
          css: {
            code: {
              backgroundColor: '#2563eb'
            },
            'pre code': {
              backgroundColor: 'transparent'
            }
          }
        }
      })
    }
  },
  plugins: [typography({ target: 'modern' })]
} satisfies Config
