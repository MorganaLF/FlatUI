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
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  $(circle).attr({
    'class': 'percentage__bar',
    'r': '47',
    'cx': '50',
    'cy': '50',
    'fill': 'transparent'
  });

  $(this).find('.percentage__svg').prepend(circle);

  if (isNaN(val)) {
    val = 100;
  }

    let r = $(circle).attr('r');
    let c = Math.PI*(r*2);

    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}

    let pct = ((100-val)/100)*c;

  $(circle).css({ strokeDashoffset: c});

  let valueEl = $(this).find('.percentage__value');

  valueEl.prop('Counter',0).animate({
    Counter: valueEl.text()
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      valueEl.text(Math.ceil(now));
    }
  });

    setTimeout(function () {
      $(circle).css({ strokeDasharray: c});
      $(circle).css({ strokeDashoffset: pct});
      $(circle).css('stroke', '#e75735');
    }, 10)


});

