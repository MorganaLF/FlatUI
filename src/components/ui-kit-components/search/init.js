import Search from './search';

$(() => {
  const $search = $('.js-search');

  $search.each((index, item) => {
    new Search($(item), index);
  });
});
