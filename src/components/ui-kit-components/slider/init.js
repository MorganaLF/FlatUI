import Slider from './slider';

$(() => {
  const $slider = $('.js-slider');

  $slider.each((index, item) => {
    new Slider($(item));
  });
});
