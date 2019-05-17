import Chart from './chart';

$(() => {
  const $chart = $('.js-chart');

  $chart.each((index, item) => {
    new Chart($(item), index);
  });
});
