import $ from 'jquery'

$('.page-messaging__button').on('click', function () {
  $('.page-messaging').find('.messaging').slideToggle();
  $('.page-messaging__button').find('i').toggleClass('far fas fa-comments fa-times');
});