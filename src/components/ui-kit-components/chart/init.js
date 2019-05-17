import Chart from './Chart';

$(() => {
  const $chart = $('.js-chart');

  $chart.each((index, item) => {
    new Chart($(item), index);
  });
});
