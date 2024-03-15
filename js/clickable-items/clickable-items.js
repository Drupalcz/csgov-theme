/**
 * ClickableItemWrapper ensures clicks on the element trigger a specified link inside the element,
 * except when text is selected or clicks occur on nested links.
 * Apply script example is in readme.md.
 */
class ClickableItemWrapper {
  constructor(options) {
    this.options = options;
    this.attachBehavior();
  }

  attachBehavior() {
    document.querySelectorAll(this.options.selector).forEach((item) => {
      // Check if the behavior has already been attached.
      if (!item.dataset.clickableWrapped) {
        item.addEventListener('click', this.handleClick.bind(this, item));
        // Mark the element to prevent re-attaching.
        item.dataset.clickableWrapped = 'true';
      }
    });
  }

  handleClick(item, event) {
    // Check if text is selected, if so, do not proceed with the click.
    if (window.getSelection().toString()) {
      return;
    }

    // Check if the click originated from an element with the class "contextual" or its children.
    let targetElement = event.target;
    while (targetElement != null) {
      if (targetElement.classList.contains('contextual')) {
        // If the click came from within a "contextual" element, do not proceed.
        return;
      }
      if (targetElement === item) {
        // If we've bubbled up to the container, stop checking.
        break;
      }
      targetElement = targetElement.parentNode;
    }

    const link = item.querySelector(this.options.linkSelector);
    if (link && !link.contains(event.target)) {
      // Trigger the link only if the click didn't originate from the link itself or its children.
      link.click();
      link.focus();
    }
  }
}
