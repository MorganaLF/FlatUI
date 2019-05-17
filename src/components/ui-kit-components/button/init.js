import Button from './button';

$(() => {
  const $button = $('.js-button');

  $button.each((index, item) => {
    new Button($(item), index);
  });
});
