import $ from 'jquery';

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

  toggleMessagingWindow() {
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

    function removeClosingStyles() {
      $messagingContainer
        .css('display', 'none')
        .removeClass('page-messaging__container_closed')
        .off('animationend', removeClosingStyles);
    }

    $messagingContainer
      .addClass('page-messaging__container_closed')
      .on('animationend', removeClosingStyles);
  }

  showMessagingWindow() {
    const $messagingContainer = this.$element
      .closest('.js-page-messaging')
      .find('.js-page-messaging__container');

    function removeOpeningStyles() {
      $messagingContainer
        .removeClass('page-messaging__container_opened-active')
        .off('animationend', removeOpeningStyles);
    }

    $messagingContainer
      .css('display', 'block')
      .addClass('page-messaging__container_opened page-messaging__container_opened-active')
      .removeClass('page-messaging__container_opened')
      .on('animationend', removeOpeningStyles);
  }

  _addEventListeners() {
    this.$element.on(
      `click.messagingToggle${this.elementIndex}`,
      this.toggleMessagingWindow.bind(this),
    );
  }
}

function createPageMessagingInstance(index) {
  new PageMessaging($(this), index);
}

const $pageMessagingButton = $('.js-page-messaging__button');
$pageMessagingButton.each(createPageMessagingInstance);
