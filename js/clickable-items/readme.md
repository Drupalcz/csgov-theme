# Clickable Items

Make the whole element respond to a click/touch pointing to a specified link inside that element.
It allows users to select text and click on other links if they are present.

## Example usage in Drupal
Clicking anywehere on a .gov-card item will trigger the link inside .gov-card__header.

```
(function (Drupal, once) {
  Drupal.behaviors.cardClickableItem = {
    attach: function (context, settings) {
      once('clickable-item', context).forEach(function () {
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
```
