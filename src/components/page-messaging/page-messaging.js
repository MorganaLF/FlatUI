import $ from 'jquery'

$('.page-messaging__button').on('click', function () {
  $('.page-messaging').find('.page-messaging__container').slideToggle();
  $('.page-messaging__button').find('i').toggleClass('far fas fa-comments fa-times');
});