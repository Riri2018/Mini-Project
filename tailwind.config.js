/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ss-teal': '#1D9E75',
        'ss-teal-light': '#5DCAA5',
        'ss-ocean': '#028090',
        'ss-violet': '#6C63FF',
        'ss-violet-light': '#9F96FF',
        'ss-mint': '#02C39A',
        'ss-amber': '#EF9F27',
        'ss-danger': '#E24B4A',
        'ss-bg': '#0a0e1a',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        number: ['Outfit', 'DM Sans', 'sans-serif'],
      },
      backdropBlur: {
        glass: '16px',
        modal: '24px',
        nav: '20px',
        tooltip: '12px',
      },
      borderRadius: {
        glass: '16px',
        'glass-sm': '12px',
        'glass-lg': '20px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.25)',
        'glow-teal': '0 0 24px rgba(29,158,117,0.4)',
        'glow-violet': '0 0 24px rgba(108,99,255,0.4)',
        'glow-mint': '0 0 24px rgba(2,195,154,0.35)',
        modal: '0 24px 64px rgba(0,0,0,0.6)',
      },
      transitionDuration: {
        250: '250ms',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
