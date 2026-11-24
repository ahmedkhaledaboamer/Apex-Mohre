export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Apex Aora identity — sampled from the logo: navy wordmark, violet→blue infinity, gold accents.
        navy: { DEFAULT: '#0A1A45', 2: '#13265C', 3: '#253A7C' },
        primary: { DEFAULT: '#4A35D8', hover: '#3E2BBE', strong: '#3322A0', soft: '#EEEBFD' },
        brand: { violet: '#7A1FD1', blue: '#0A78F0', gold: '#C9962E' },
        ink: { DEFAULT: '#0E1726', 2: '#3B4656' },
        muted: '#687283',
        line: { DEFAULT: '#E4E7EB', strong: '#CBD2DA' },
        canvas: '#F5F6F8',
        surface: '#FFFFFF',
        subtle: '#F0F2F5',
        success: { DEFAULT: '#1D8556', soft: '#E7F4ED' },
        warning: { DEFAULT: '#A86B12', soft: '#FBF2E2' },
        danger: { DEFAULT: '#BE3B35', soft: '#FBEBEA' },
        info: { DEFAULT: '#2D6AAE', soft: '#E9F0F9' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(14,23,38,0.04), 0 1px 1px rgba(14,23,38,0.03)',
        pop: '0 12px 32px -8px rgba(14,23,38,0.18), 0 2px 6px rgba(14,23,38,0.06)',
      },
    },
  },
  plugins: [],
};
