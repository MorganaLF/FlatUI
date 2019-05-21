import Calendar from './Calendar';

$(() => {
  const $calendar = $('.js-calendar');

  $calendar.each((index, item) => {
    new Calendar($(item), index);
  });
});
