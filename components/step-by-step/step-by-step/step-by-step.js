(function (Drupal, once) {
  Drupal.behaviors.govczStepperItem = {
    attach: function (context, settings) {
      const stepperItems = once('js-step-by-step', '.gov-stepper-item.step-by-step--has-content', context);
      if (!stepperItems.length > 0) {
        return;
      }
      stepperItems.forEach(item => {
        const button = item.querySelector('.step-by-step__trigger');
        const content = item.querySelector('.gov-stepper-item__content');
        var settings = {
          enableDocumentClick: false,
          applyHiddenAttribute: true,
        };
        const toggleSection = new ToggleSection(button, content, settings);

        // Check if the stepper item should be expanded by default
        if (item.getAttribute('is-expanded') === 'true') {
          toggleSection.expand();
        } else {
          toggleSection.collapse();
        }
      });

    }
  };
})(Drupal, once);
