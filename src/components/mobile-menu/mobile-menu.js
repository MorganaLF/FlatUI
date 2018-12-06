import $ from 'jquery'

$('.mobile-menu__button').on('click', function () {
  $('.body-wrapper').toggleClass('body-wrapper_opened');
  $('.mobile-menu').toggleClass('mobile-menu_opened');
});

$(window).resize(function () {
  $('.body-wrapper').removeClass('body-wrapper_opened');
  $('.mobile-menu').removeClass('mobile-menu_opened');
});