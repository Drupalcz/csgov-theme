/**
 * @file
 * JS for Back To Top link.
 */
(function BackToTop(Drupal) {

  Drupal.behaviors.BackToTop = {
    attach(context) {
      context = context || document;
      const backToTopTrigger = context.querySelector('.back-to-top__link');
      const backToTopProcessedClass = 'js-back-to-top__link';

      if (!backToTopTrigger || backToTopTrigger.classList.contains(backToTopProcessedClass)) {
        return;
      }

      // Toggle class on backToTopTrigger.
      function scroll() {
        var scroll_target = 250;
        var scroll = window.scrollY;
        if (scroll >= scroll_target) {
          backToTopTrigger.classList.add('is-visible');
        } else {
          backToTopTrigger.classList.remove('is-visible');
        }
      };

      // Scroll the window content up.
      function scrollUp(e) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        e.preventDefault();
      };

      // Add event listeners.
      window.addEventListener('scroll', Drupal.debounce(scroll, 250));
      backToTopTrigger.addEventListener('click', scrollUp);
      backToTopTrigger.addEventListener('touch', scrollUp);

      // Add the processed class.
      backToTopTrigger.classList.add(backToTopProcessedClass);
    }
  };

})(Drupal);
