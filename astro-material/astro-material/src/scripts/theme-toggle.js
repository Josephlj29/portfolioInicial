// theme-toggle.js
const THEME_KEY = 'theme-preference';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

const getThemePreference = () => {
  const storedPreference = localStorage.getItem(THEME_KEY);
  if (storedPreference) {
    return storedPreference;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
};

let currentTheme = getThemePreference();

const applyTheme = (theme) => {
  document.documentElement.classList.remove(THEME_DARK, THEME_LIGHT);
  document.documentElement.classList.add(theme);
  // Ensure <html> tag has the 'dark' class if in dark mode, otherwise not.
  if (theme === THEME_DARK) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

applyTheme(currentTheme);

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle-button');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      currentTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme(currentTheme);
    });
  } else {
    console.warn('Theme toggle button with ID "theme-toggle-button" not found.');
  }

  // Optional: Update theme if system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) { // Only if no user override
      currentTheme = e.matches ? THEME_DARK : THEME_LIGHT;
      applyTheme(currentTheme);
    }
  });
});
