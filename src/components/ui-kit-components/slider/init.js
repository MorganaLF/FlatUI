import Slider from './Slider';

$(() => {
  const $slider = $('.js-slider');

  $slider.each((index, item) => {
    new Slider($(item));
  });
});
