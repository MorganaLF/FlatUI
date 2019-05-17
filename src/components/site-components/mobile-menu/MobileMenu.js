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
    $window.on(`resize.mobileMenuHide${this.elementIndex}`, this._handleWindowResize.bind(this));

    this.$element.on(`click.mobileMenuToggle${this.elementIndex}`, this._handleMenuClick.bind(this));
  }

  _handleWindowResize() {
    this.hideMobileMenu();
  }

  _handleMenuClick() {
    this.toggleMobileMenu();
  }
}

export default MobileMenu;
