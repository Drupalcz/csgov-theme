(function (Drupal, once) {
  Drupal.behaviors.teaserClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', '.teaser', context).forEach(function () {
        // Example settings for initialization
        const clickableItemSettings = {
          selector: '.teaser', // This is your item selector
          linkSelector: '.teaser__title > a' // This is your link selector inside the item
        };

        // Initialize the ClickableItemWrapper with the settings
        new ClickableItemWrapper(clickableItemSettings);
      });
    }
  };
})(Drupal, once);
