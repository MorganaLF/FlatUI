import $ from 'jquery';

class Button {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$currentElement = null;
    this.$ripple = null;
    this.init();
  }

  init() {
    this.$element.on(`click.buttonAddRipple${this.elementIndex}`, this._addRipple.bind(this));
  }

  _addRipple(event) {
    event.preventDefault();

    this.$currentElement = $(event.target.closest('.js-button'));
    this._createRippleElement(this.$currentElement);

    this.$ripple.removeClass('button__ripple_animated');

    const { xCoordinate, yCoordinate } = this._getRippleCoordinates(event.pageX, event.pageY);

    this.$ripple
      .css({ top: `${yCoordinate}px`, left: `${xCoordinate}px` })
      .addClass('button__ripple_animated')
      .on(`animationend.buttonRestoreDefault${this.elementIndex}`, this._restoreDefault.bind(this));
  }

  _createRippleElement() {
    if (this.$ripple === null) {
      this.$ripple = $('<span class="button__ripple"></span>');
      this._setRippleSize(this.$currentElement, this.$ripple);
      this.$currentElement.prepend(this.$ripple);
    }
  }

  _restoreDefault() {
    if (this.$currentElement.attr('href') !== undefined) {
      window.location.href = this.$currentElement.attr('href');
    }

    if (this.$currentElement.attr('type') === 'submit') {
      const $form = this.$currentElement.closest('form');
      $form.submit();
    }
  }

  _getRippleCoordinates(pageX, pageY) {
    return {
      xCoordinate: pageX - this.$currentElement.offset().left - this.$ripple.width() / 2,
      yCoordinate: pageY - this.$currentElement.offset().top - this.$ripple.height() / 2,
    };
  }

  _setRippleSize() {
    const rippleDiameter = Math.max(
      this.$currentElement.outerWidth(),
      this.$currentElement.outerHeight(),
    );

    this.$ripple.css({ height: rippleDiameter, width: rippleDiameter });
  }
}

function createButtonInstance(index) {
  new Button($(this), index);
}

const $button = $('.js-button');
$button.each(createButtonInstance);
