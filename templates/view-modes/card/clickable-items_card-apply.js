(function (Drupal, once) {
  Drupal.behaviors.cardClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', '.gov-card', context).forEach(function () {
        // Example settings for initialization
        const clickableItemSettings = {
          selector: '.gov-card', // This is your item selector
          linkSelector: '.gov-card__header > a' // This is your link selector inside the item
        };
        // Initialize the ClickableItemWrapper with the settings
        new ClickableItemWrapper(clickableItemSettings);
      });
    }
  };
})(Drupal, once);
