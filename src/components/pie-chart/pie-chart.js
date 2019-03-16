import $ from 'jquery';

let pieChart;

$('.ct-chart').each(function(){

  pieChart = new Chartist.Pie(this,
      {
        series: $(this).data('series').split(', ')
      },
      {
        donut: true,
        showLabel: false,
        chartPadding: -22,
        fullWidth: true
      }
      )/*.on('draw', function(data) {
    if(data.type === 'slice') {

      let pathLength = data.element._node.getTotalLength();

      data.element.attr({
        'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
      });

      let animationDefinition = {
        'stroke-dashoffset': {
          id: 'anim' + data.index,
          dur: 1000 / 7,
          from: -pathLength + 'px',
          to:  '0px',
          fill: 'freeze'
        }
      };

      if(data.index !== 0) {
        animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
      }

      data.element.attr({
        'stroke-dashoffset': -pathLength + 'px'
      });

      data.element.animate(animationDefinition, false);
    }
  })*/;
});

let changeStrokeWidth = function () {
  $('.ct-slice-donut').css('strokeWidth', '18%');
};

$(function() {
  changeStrokeWidth();
});

$(window).on('resize', function () {

  $('.ct-chart').each(function(){

    pieChart = new Chartist.Pie(this,
        {
          series: $(this).data('series').split(', ')
        },
        {
          donut: true,
          showLabel: false,
          chartPadding: -22,
          fullWidth: true
        }
    );
  });

  $(function() {
    changeStrokeWidth();
  });

});




