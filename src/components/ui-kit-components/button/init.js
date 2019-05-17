import Button from './Button';

$(() => {
  const $button = $('.js-button');

  $button.each((index, item) => {
    new Button($(item), index);
  });
});
