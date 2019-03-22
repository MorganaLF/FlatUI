import $ from 'jquery';

$(function() {

  function buttonOnClick (e) {
    e.preventDefault();

    let ink, d, x, y;

    if ($(this).find(".button__ripple").length === 0)
      $(this).prepend("<span class='button__ripple'></span>");

    ink = $(this).find(".button__ripple");
    ink.removeClass("button__ripple_animated");

    if(!ink.height() && !ink.width())
    {
      d = Math.max($(this).outerWidth(), $(this).outerHeight());
      ink.css({height: d, width: d});
    }

    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;

    ink.css({top: y+'px', left: x+'px'}).addClass("button__ripple_animated");

    if ($(this).attr('href')) {
      let link = $(this).attr('href');
      setTimeout(function() { window.location.href = link; }, 650);
    }

    if($(this).attr('type') === 'submit') {
      let form = $(this).closest('form');
      setTimeout(function() { form.submit() }, 650);
    }
  }

  $('.button').each(function(){
    $(this).on('click', buttonOnClick);
  });
});



