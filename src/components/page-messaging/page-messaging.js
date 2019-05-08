class PageMessaging {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.isMessagingOpened = false;
    this.init();
  }

  init() {
    this._addEventListeners();
  }

  handleMessagingButtonClick() {
    if (this.isMessagingOpened) {
      this.hideMessagingWindow();
    } else {
      this.showMessagingWindow();
    }

    this.isMessagingOpened = !this.isMessagingOpened;
  }

  hideMessagingWindow() {
    const $messagingContainer = this.$element
      .closest('.js-page-messaging')
      .find('.js-page-messaging__container');

    function handleMessagingContainerAnimationEnd() {
      $messagingContainer
        .css('display', 'none')
        .removeClass('page-messaging__container_closed')
        .off('animationend', handleMessagingContainerAnimationEnd);
    }

    $messagingContainer
      .addClass('page-messaging__container_closed')
      .on('animationend', handleMessagingContainerAnimationEnd);
  }

  showMessagingWindow() {
    const $messagingContainer = this.$element
      .closest('.js-page-messaging')
      .find('.js-page-messaging__container');

    function handleMessagingContainerAnimationEnd() {
      $messagingContainer
        .removeClass('page-messaging__container_opened-active')
        .off('animationend', handleMessagingContainerAnimationEnd);
    }

    $messagingContainer
      .css('display', 'block')
      .addClass('page-messaging__container_opened page-messaging__container_opened-active')
      .removeClass('page-messaging__container_opened')
      .on('animationend', handleMessagingContainerAnimationEnd);
  }

  _addEventListeners() {
    this.$element.on(
      `click.messagingToggle${this.elementIndex}`,
      this.handleMessagingButtonClick.bind(this),
    );
  }
}

$(() => {
  const $pageMessagingButton = $('.js-page-messaging__button');
  $pageMessagingButton.each((index, item) => {
    new PageMessaging($(item), index);
  });
});
