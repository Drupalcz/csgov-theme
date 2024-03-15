(function (Drupal, once) {
  Drupal.behaviors.calendarItemClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', '.calendar-item', context).forEach(function () {
        // Example settings for initialization
        const clickableItemSettings = {
          selector: '.calendar-item', // This is your item selector
          linkSelector: '.calendar-item__title > a' // This is your link selector inside the item
        };

        // Initialize the ClickableItemWrapper with the settings
        new ClickableItemWrapper(clickableItemSettings);
      });
    }
  };
})(Drupal, once);
