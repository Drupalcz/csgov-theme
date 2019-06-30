/**
 * @file
 * JS for Back To Top link.
 */

(function ($) {

  Drupal.behaviors.csgov_theme_BackToTop = {
    attach: function (context, settings) {
      var $body = $('body, html');
      var backToTop = $('.back-to-top__link', context);

      // Toggle class on backToTop.
      $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
          backToTop.addClass('is-visible');
        } else {
          backToTop.removeClass('is-visible');
        }
      });

      // Scroll smoothly to top on click.
      backToTop.click(function (event) {
        $body.animate({
          scrollTop: 0
        }, 800, function () {
          $body.attr('tabindex','-1').focus().removeAttr('tabindex');
        });
        event.preventDefault();
      });

    }
  };

})(jQuery);

/**
 * @file
 * JS for Mobile menu 
 */

(function ($) {
  Drupal.behaviors.csgov_theme_MobileMenu = {
    attach: function (context, settings) {

        $('#menu .block-menu ul > li:has(ul)').each(function() {
            $(this).append( "<span></span>" );
        });

        $('#menu .block-menu li.menu-item--active-trail > span').each(function() {
            $(this).prev().addClass("open");
            $(this).addClass("open");
        });

        $("#menu .block-menu span").click(function(){
            if($(this).hasClass('open')) {
                $(this).prev().removeClass("open");
                $(this).removeClass("open");
            } else {
                $(this).prev().addClass("open");
                $(this).addClass("open");
            }
        });

    }
  };
})(jQuery);

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

//# sourceMappingURL=csgov_theme.js.map
