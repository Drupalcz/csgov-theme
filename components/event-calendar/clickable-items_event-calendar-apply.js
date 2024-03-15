(function (Drupal, once) {
  Drupal.behaviors.eventCalendarClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', '.event-calendar', context).forEach(function () {
        // Example settings for initialization
        const clickableItemSettings = {
          selector: '.event-calendar', // This is your item selector
          linkSelector: '.event-calendar__title > a' // This is your link selector inside the item
        };

        // Initialize the ClickableItemWrapper with the settings
        new ClickableItemWrapper(clickableItemSettings);
      });
    }
  };
})(Drupal, once);
