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
