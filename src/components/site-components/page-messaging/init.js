import PageMessaging from './PageMessaging';

$(() => {
  const $pageMessagingButton = $('.js-page-messaging__button');
  $pageMessagingButton.each((index, item) => {
    new PageMessaging($(item), index);
  });
});
