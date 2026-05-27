import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        c24: {
          blue: '#0071BC',
          blueDark: '#005a96',
          blueDeep: '#0E1F8A',
          blueTint: '#E8EEFF',
          orange: '#F7931E',
          orangeDark: '#E27F00',
          orangeTint: '#FFE9CC',
          appBg: '#F5F8FA',
          text: '#0B1F2A',
          textSecondary: '#5E6B78',
          textMuted: '#8A94A6',
          border: '#E5EAF0',
          success: '#1A9A50',
          successTint: '#E9F7EE',
          error: '#E5483E',
          purple: '#5B47D6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-bricolage)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
