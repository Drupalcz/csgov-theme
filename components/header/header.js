(function (Drupal, once) {
  Drupal.behaviors.csgovMainMenuToggle = {
    attach: function (context, settings) {
      let menuIsOpen = false; // State flag
      let lastWidth = window.innerWidth; // Track the last width to detect significant changes

      const [button] = once('js-csgov-header__toggle', '.csgov-header__toggle', context);
      if (!button) return;
      const buttonText = button.querySelector('.csgov-header__toggle-text');

      const [offCanvas] = once('js-region-off-canvas', '.region-off-canvas', context);
      const [offCanvasWrapper] = once('js-region-off-canvas', '.offcanvas__wrapper', context);
      const [header] = once('js-csgov-header', '.csgov-header', context);

      var settingsToggleSection = {
        enableDocumentClick: true,
        applyHiddenAttribute: false,
      };
      const toggleSection = new ToggleSection(button, offCanvas, settingsToggleSection);

      // Define a function that returns the current state of menuIsOpen
      const isMenuOpen = () => menuIsOpen;
      var settingsFocusTrap = {
        isOpenFunction: isMenuOpen,
        bodyDataAttribute: 'data-focus-trap-enabled',
      };

      // Pass isMenuOpen as the argument to FocusTrap
      const focusTrap = new FocusTrap(
        offCanvas,
        button,
        settingsFocusTrap
      );

      // Toggle menu state on button click
      button.addEventListener('click', function () {
        menuIsOpen = button.getAttribute('aria-expanded') === 'true';
        if (menuIsOpen == true) {
          focusTrap.activate();
          buttonText.innerHTML = button.getAttribute('data-text-open');
        }
        else {
          focusTrap.deactivate();
          buttonText.innerHTML = button.getAttribute('data-text-close');
        }
      });

      // Us resizeObserver to dynamically set height of offCanvas based on header.
      const resizeObserver = new ResizeObserver(items => {
        const header = items[0].target;
        headerHeight = header.offsetHeight;
        offCanvasWrapper.style.height = `calc(100dvh - ${headerHeight - 1}px)`;
        offCanvasWrapper.style.top = `calc(var(--drupal-displace-offset-top, 0) + ${headerHeight}px)`;
      });

      // Observe changes to header.
      resizeObserver.observe(header);

    }
  };
})(Drupal, once);
