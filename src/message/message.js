import $ from 'jquery'

$('.message__button').on('click', function () {
  $('.message').find('.messaging').slideToggle();
  $('.message__button').find('i').toggleClass('far fas fa-comments fa-times');
});