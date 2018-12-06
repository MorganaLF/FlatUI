import $ from 'jquery';

$(function() {

  function buttonOnClick (e) {

    let child = $(e.target).find('.button__shadow');
    let parentCoord = this.getBoundingClientRect();
    let parentTop = parentCoord.top;
    let parentLeft = parentCoord.left;

    child.css('top', e.clientY - parentTop - 25 + 'px');
    child.css('left', e.clientX - parentLeft - 25 + 'px');
    child.css('display', 'block');
    child.eq(0).addClass('button__shadow_animated');

    setTimeout(() => {
      $(this).find('.button__shadow').removeClass('button__shadow_animated').css('display', 'none');
    }, 300);

  }

  $('.button').each(function(){
    $(this).on('click', buttonOnClick);
  });
});



