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

  }

  function buttonRemoveClick () {
    setTimeout(() => {
      $(this).find('.button__shadow').css('display', 'none');
    }, 50);
  }

  $('button').each(function(){
    $(this).on('mousedown', buttonOnClick);
    $(this).on('mouseup', buttonRemoveClick);
  });
});



