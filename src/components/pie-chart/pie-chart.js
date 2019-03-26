import $ from 'jquery';

let pieChart;

$('.pie-chart').each(function(){
  let colors = ['#747474', '#e75735', '#4eb7a8', '#e5e5e5'];

  let series = $(this).data('series').split(', ');

  for (let i = 0; i < series.length; i++) {
    let val = series[i];
    let offset = 0;

    if (i === 0) {
      offset = 0;
    } else {
      for (let j = 0; j < i; j ++) {
        offset = offset + +series[j];
      }
    }

    console.log(offset);

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    $(circle).attr({
      'class': 'pie-chart__bar',
      'r': '40',
      'cx': '50',
      'cy': '50',
      'fill': 'transparent'
    });

    $(this).find('.pie-chart__svg').prepend(circle);

    let r = $(circle).attr('r');
    let c = Math.PI*(r*2);

    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}

    let pct = ((100 - val - offset)/100)*c;

    $(circle).css({strokeDashoffset: c});

    setTimeout(function () {
      $(circle).css('stroke', colors[i]);
      $(circle).css({ strokeDasharray: c});
      $(circle).css({ strokeDashoffset: pct});
    }, 1)

  }

});




