import $ from 'jquery';

$(function() {

  function buttonOnClick (e) {
    e.preventDefault();

    let ink, d, x, y;

    if ($(this).find(".button__shadow").length === 0)
      $(this).prepend("<span class='button__shadow'></span>");

    ink = $(this).find(".button__shadow");
    ink.removeClass("button__shadow_animated");

    if(!ink.height() && !ink.width())
    {
      d = Math.max($(this).outerWidth(), $(this).outerHeight());
      ink.css({height: d, width: d});
    }

    x = e.pageX - $(this).offset().left - ink.width()/2;
    y = e.pageY - $(this).offset().top - ink.height()/2;

    ink.css({top: y+'px', left: x+'px'}).addClass("button__shadow_animated");

    if ($(this).attr('href')) {
      let link = $(this).attr('href');
      setTimeout(function() { window.location.href = link; }, 650);
    }

  }

  $('.button').each(function(){
    $(this).on('click', buttonOnClick);
  });
});



