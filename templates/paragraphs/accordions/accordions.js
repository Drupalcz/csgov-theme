(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.csgovAccordion = {
    attach: function (context) {
      // Select all accordion trigger elements.
      const accordionElements = once('csgovAccordion', '.accordion-item__trigger', context);

      accordionElements.forEach(function (buttonEl) {
        // Retrieve the ID of the content controlled by the button.
        const controlsId = buttonEl.getAttribute('aria-controls');
        // Get the content element based on its ID
        const contentEl = document.getElementById(controlsId);
        // Find the toggle text element within the button.
        const buttonElText = buttonEl.querySelector('.accordion-item__toggle__text');
        // Determine if the accordion is initially open or closed.
        let isOpen = buttonEl.getAttribute('aria-expanded') === 'true';

        // Add 'hidden="until-found"' attribute to content elements
        // during initial page load which should be closed.
        if (!isOpen) {
          contentEl.setAttribute('hidden', 'until-found');
        }

        // Function to toggle the individual accordion.
        function toggleAccordion() {
          // Invert the value of isOpen.
          isOpen = !isOpen;
          // Set the aria-expanded attribute to reflect the new state.
          buttonEl.setAttribute('aria-expanded', isOpen);
          // Show or hide the content based on the state.
          isOpen ? contentEl.removeAttribute('hidden') : contentEl.setAttribute('hidden', 'until-found');
          // Set the button text based on the state.
          buttonElText.innerHTML = isOpen ? buttonElText.dataset.accToggleTextClose : buttonElText.dataset.accToggleTextOpen;
          // Set the aria-label attribute of the button based on the state.
          buttonEl.setAttribute('aria-label', buttonEl.dataset.accButtonTitle + ' – ' + (isOpen ? buttonEl.dataset.accButtonClose : buttonEl.dataset.accButtonOpen));
        }

        // Add click event listener to the button.
        buttonEl.addEventListener('click', toggleAccordion);
      });

      // We have an optional button to open/close all accordions in group at once.
      // It ignores accordions which are already open/close.
      // Select all "toggle all" elements.
      const toggleAllElements = once('csgovAccordionToggleAll', '.accordion-toggle-all', context);

      toggleAllElements.forEach(function (toggleAllEl) {
        // Find the toggle text element within the "toggle all" element.
        const toggleAllTextEl = toggleAllEl.querySelector('.accordion-toggle-all-text');
        // Determine if the "toggle all" button is initially open or closed.
        let isOpen = toggleAllEl.getAttribute('aria-expanded') === 'true';
        // Get the appropriate toggle text based on the initial state.
        let toggleText = isOpen ? toggleAllEl.dataset.accordionToggleAllOpen : toggleAllEl.dataset.accordionToggleAllClose;

        // Add click event listener to the "toggle all" button.
        toggleAllEl.addEventListener('click', function () {
          // Invert the value of isOpen.
          isOpen = !isOpen;
          // Set the toggle text based on the new state.
          toggleText = !isOpen ? toggleAllEl.dataset.accordionToggleAllOpen : toggleAllEl.dataset.accordionToggleAllClose;
          // Update the aria-expanded attribute of the "toggle all" button.
          toggleAllEl.setAttribute('aria-expanded', isOpen);
          // Update the toggle text within the "toggle all" button.
          toggleAllTextEl.innerHTML = toggleText;

          // Find all accordion buttons elements within the same accordion group.
          const accordionToggles = toggleAllEl.closest('.accordion').querySelectorAll('.accordion-item__trigger');
          // Determine the desired state (open or close) for the accordion buttons.
          const toggleState = isOpen ? 'true' : 'false';

          // Iterate over each accordion trigger and simulate a click to toggle their state.
          accordionToggles.forEach(function (accordionToggle) {
            // Only runs it for accordions with different state.
            if (accordionToggle.getAttribute('aria-expanded') !== toggleState) {
              // Simulate a click on the accordion trigger to toggle its state.
              accordionToggle.click();
            }
          });
        });
      });
    }
  };
})(Drupal, once);
