import $ from 'jquery';

/* Адаптивный шрифт */

setTimeout(() => {
  $('.percentage__value').css('font-size', $('.percentage').width() / 100 * 42 + 'px');
}, 4);

$( window ).resize(function() {
  $('.percentage__value').css('font-size', $('.percentage').width() / 100 * 42 + 'px');
});

/* Создание шкалы */

$('.percentage').each(function(){
  let val = $(this).find('.percentage__value').html();
  let circle = $(this).find('.percentage__bar');

  if (isNaN(val)) {
    val = 100;
  }
  else{
    let r = circle.attr('r');
    let c = Math.PI*(r*2);

    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}

    let pct = ((100-val)/100)*c;

    circle.css({ strokeDasharray: c});
    circle.css({ strokeDashoffset: pct});

  }
});

