import Search from './Search';

$(() => {
  const $search = $('.js-search');

  $search.each((index, item) => {
    new Search($(item), index);
  });
});
