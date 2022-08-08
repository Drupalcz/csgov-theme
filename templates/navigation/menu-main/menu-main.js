(function mainMenu(Drupal, once) {
  /**
   * Add necessary event listeners and create aria attributes
   * @param {element} el - List item element that has a submenu.
   */
  function initSubmenu(el) {
    const button = el.querySelector('.menu__link--button');
    button.setAttribute('aria-controls', button.dataset.ariacontrols);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', e => toggleSubmenu(e.currentTarget, !getButtonState(e.currentTarget)));
    el.addEventListener('mouseover', toggleSubmenu(button, true));
    el.addEventListener('mouseout', toggleSubmenu(button, false));
  }

  /**
   * Toggles the aria-expanded attribute of a given button to a desired state.
   * @param {element} button - Button element that should be toggled.
   * @param {boolean} toState - State indicating the end result toggle operation.
   */
  function toggleSubmenu(button, toState) {
    button.setAttribute('aria-expanded', toState);
  }

  /**
   * Get the current aria-expanded state of a given button.
   * @param {element} button - Button element to return state of.
   */
  function getButtonState(button) {
    return button.getAttribute('aria-expanded') === 'true';
  }

  Drupal.behaviors.submenu = {
    attach(context) {
      context.querySelectorAll('.menu__item--has-children').forEach(el => {
        initSubmenu(el);
      });
    },
  };

  /**
   * Handles the mobile button for hiding/showing the menu.
   */
  Drupal.behaviors.mainMenu = {
    attach(context) {
      context = context || document;

      const mainNavigationTrigger = once('main-navigation-trigger', '.menu-main__trigger', document);
      const mainNavigation = context.querySelector('.main-navigation');
      const header = context.querySelector('header');

      mainNavigationTrigger.forEach((mainNavigationTrigger, listIndex) => {
        function initMenu() {
          mainNavigationTrigger.addEventListener('click', function () {
            let expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            mainNavigation.classList.toggle('main-navigation--shown');
            header.classList.toggle('main-navigation--shown');
          });
        }
        initMenu();
      });
    },
  };

})(Drupal, once);
