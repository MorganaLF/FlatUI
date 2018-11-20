import $ from 'jquery';

// jQuery(".percentage").progressPie({
//   size: 95,
//   ringWidth: 5,
//   strokeWidth: 0,
//   ringEndsRounded: true,
//   valueSelector: ".percentage__value",
//   color: "#e75735"
// });


/* Рассчитать длину для каждой диаграммы */
//let circleWidth = $('.percentages-and-charts__container').width();
//$('.percentage__value').css('font-size', circleWidth + 'px');

setTimeout(() => {
  let circleWidth = $('.percentage').width();
  $('.percentage__value').css('font-size', circleWidth / 100 * 42 + 'px');
}, 4);

$( window ).resize(function() {
  let circleWidth = $('.percentage').width();
  $('.percentage__value').css('font-size', circleWidth / 100 * 42 + 'px');
});

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

    circle.css({ strokeDasharray: Math.PI*(r*2)});
    circle.css({ strokeDashoffset: pct});

  }
});

