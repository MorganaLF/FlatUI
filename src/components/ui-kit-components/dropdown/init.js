import Dropdown from './dropdown';

$(() => {
  const $dropdown = $('.js-dropdown__select');

  $dropdown.each((index, item) => {
    new Dropdown($(item), index);
  });
});
