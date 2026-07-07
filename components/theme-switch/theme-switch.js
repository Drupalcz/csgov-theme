/**
 * Three-way theme switch: explicit light/dark with reset to OS preference.
 *
 * The preference lives in localStorage under `data-theme`; absence means
 * "follow the OS". The inline script in html.html.twig applies the stored
 * value before first paint, this behavior only handles interaction.
 */
((Drupal, once) => {
  'use strict';

  const KEY = 'data-theme';
  const html = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const stored = () => {
    try {
      const value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : null;
    }
    catch (e) {
      return null;
    }
  };

  const effective = () => stored() || (media.matches ? 'dark' : 'light');

  const apply = (value) => {
    try {
      if (value) {
        localStorage.setItem(KEY, value);
      }
      else {
        localStorage.removeItem(KEY);
      }
    }
    catch (e) {
      // Storage unavailable (private mode): the switch still works for the
      // current page view, the preference just won't survive a reload.
    }
    if (value) {
      html.setAttribute('data-theme', value);
    }
    else {
      html.removeAttribute('data-theme');
    }
  };

  Drupal.behaviors.csgovThemeSwitch = {
    attach(context) {
      once('theme-switch', '.theme-switch', context).forEach((wrapper) => {
        const govSwitch = wrapper.querySelector('.gov-theme-switch');
        const toggle = wrapper.querySelector('.theme-switch__toggle');
        const reset = wrapper.querySelector('.theme-switch__reset');

        const render = () => {
          const theme = effective();
          govSwitch.setAttribute('theme', theme);
          toggle.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
          reset.hidden = !stored();
        };

        toggle.addEventListener('click', () => {
          apply(effective() === 'dark' ? 'light' : 'dark');
          render();
        });

        reset.addEventListener('click', () => {
          apply(null);
          render();
        });

        // Keep the toggle in sync with the OS while no preference is stored.
        media.addEventListener('change', render);

        wrapper.hidden = false;
        render();
      });
    },
  };
})(Drupal, once);
