import Calendar from './Calendar';

$(() => {
  const $calendar = $('.js-calendar__body');

  $calendar.each((index, item) => {
    new Calendar($(item), index);
  });
});
