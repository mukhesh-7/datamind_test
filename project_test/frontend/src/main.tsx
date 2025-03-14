import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const storageKey = 'theme-preference';

const onClick = () => {
  console.log('Theme toggle button clicked');
  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light';

  console.log('Theme changed to:', theme.value);
  setPreference();
};

const getColorPreference = () => {
  const storedPreference = localStorage.getItem(storageKey);
  if (storedPreference) return storedPreference;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  const rootElement = document.firstElementChild;
  if (rootElement) {
    rootElement.setAttribute('data-theme', theme.value);
    rootElement.classList.add('transition-colors', 'duration-300');
  }

  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme.value);
  }
};

const theme = {
  value: getColorPreference(),
};

// set early so no page flashes / CSS is made aware
reflectPreference();

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', onClick);
  }
};

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
