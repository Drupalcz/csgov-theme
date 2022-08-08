/*
 * Demo for https://www.bram.us/2020/04/26/the-quest-for-the-perfect-dark-mode-using-vanilla-javascript/
 */

/**
 * @file
 * JS for switching the Light and Dark theme.
 */
 (function themeSwitcher(Drupal) {

  Drupal.behaviors.themeSwitcher = {
    attach(context) {
      context = context || document;

    const setColorMode = (mode) => {
      // Mode was given
      if (mode) {
        // Update data-* attr on html
        document.documentElement.setAttribute('data-force-color-mode', mode);
        // Persist in local storage
        window.localStorage.setItem('color-mode', mode);
        // Make sure the checkbox is up-to-date
        document.querySelector('#toggle-darkmode').checked = (mode === 'dark');
      }

      // No mode given (e.g. reset)
      else {
        // Remove data-* attr from html
        document.documentElement.removeAttribute('data-force-color-mode');
        // Remove entry from local storage
        window.localStorage.removeItem('color-mode');
        // Make sure the checkbox is up-to-date, matching the system preferences
        document.querySelector('#toggle-darkmode').checked = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }

    document.querySelector('#toggle-darkmode').addEventListener('click', (e) => {
      setColorMode(e.target.checked ? 'dark' : 'light');
    });

    document.querySelector('#reset-darkmode').addEventListener('click', (e) => {
      e.preventDefault();
      setColorMode(false);
    });

    // Keep an eye out for System Light/Dark Mode Changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if ('addEventListener' in mediaQuery) {
        // Ignore change if there's an override set
        if (document.documentElement.getAttribute('data-force-color-mode')) {
          return;
        }
        // Make sure the checkbox is up-to-date
        document.querySelector('#toggle-darkmode').checked = mediaQuery.matches;
      } 
    });

  }
};
})(Drupal);
