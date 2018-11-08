import jQuery from 'jquery';

jQuery("#container").radialProgress("init", {
  'size': 100,
  'fill': 5
}).radialProgress("to", {'perc': 100, 'time': 10000});