import $ from 'jquery';

class MobileMenu {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$body = null;
    this.$menu = null;
    this.init();
  }

  init() {
    this._addEventListeners();
  }

  toggleMobileMenu() {
    if (this.$body === null) this.$body = $('.js-body-wrapper');
    if (this.$menu === null) this.$menu = $('.js-mobile-menu');
    this.$body.toggleClass('body-wrapper_opened');
    this.$menu.toggleClass('mobile-menu_opened');
  }

  hideMobileMenu() {
    if (this.$body === null) this.$body = $('.js-body-wrapper');
    if (this.$menu === null) this.$menu = $('.js-mobile-menu');
    this.$body.removeClass('body-wrapper_opened');
    this.$menu.removeClass('mobile-menu_opened');
  }

  _addEventListeners() {
    const $window = $(window);
    $window.on(`resize.mobileMenuHide${this.elementIndex}`, this.hideMobileMenu.bind(this));

    this.$element.on(`click.mobileMenuToggle${this.elementIndex}`, this.toggleMobileMenu.bind(this));
  }
}

function createMobileMenuInstance(index) {
  new MobileMenu($(this), index);
}

const $mobileMenuButton = $('.js-mobile-menu__button');
$mobileMenuButton.each(createMobileMenuInstance);
