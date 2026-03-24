export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        cyan: '#00d4ff',
        accent: '#6366f1'
      },
      ringColor: {
        focus: 'var(--focus-ring)'
      }
    }
  }
};