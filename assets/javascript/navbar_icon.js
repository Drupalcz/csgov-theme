/**
 * @file
 * JS for Navbar menu.
 */

(function ($) {
  Drupal.behaviors.csgov_theme_NavbarMenu = {
    attach: function (context, settings) {

      $(".icon-menu").click(function() {
        if ($('body').hasClass('menu-open')) {
            $("body").removeClass("menu-open");
        }
        else {
            $("body").addClass("menu-open");
        }
      });

    }
  };
})(jQuery);
