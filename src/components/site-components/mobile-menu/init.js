import MobileMenu from './MobileMenu';

$(() => {
  const $mobileMenuButton = $('.js-mobile-menu__button');
  $mobileMenuButton.each((index, item) => {
    new MobileMenu($(item), index);
  });
});
