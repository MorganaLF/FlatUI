import Calendar from './calendar';

$(() => {
  const $calendar = $('.js-calendar__body');

  $calendar.each((index, item) => {
    new Calendar($(item), index);
  });
});
