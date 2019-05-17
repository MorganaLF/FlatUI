import Map from './map';

$(() => {
  const $map = $('.js-map__body');

  $map.each((index, item) => {
    new Map($(item), index);
  });
});
