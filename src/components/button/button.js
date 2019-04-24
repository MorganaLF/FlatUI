class Button {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$currentElement = null;
    this.init();
  }

  init() {
    this.$element.on(`click.buttonAddRipple${this.elementIndex}`, this._addRipple.bind(this));
  }

  _addRipple(event) {
    event.preventDefault();

    this.$currentElement = $(event.target.closest('.js-button'));
    const $ripple = this._createRippleElement();

    const { xCoordinate, yCoordinate } = this._getRippleCoordinates(
      $ripple,
      event.pageX,
      event.pageY,
    );

    $ripple
      .css({ top: `${yCoordinate}px`, left: `${xCoordinate}px` })
      .addClass('button__ripple_animated')
      .on(`animationend.buttonRestoreDefault${this.elementIndex}`, this._restoreDefault.bind(this))
      .on(`animationend.buttonRemoveRipple${this.elementIndex}`, this._removeRipple.bind(this, $ripple));
  }

  _createRippleElement() {
    const $ripple = $('<span class="button__ripple"></span>');
    this._setRippleSize($ripple);
    this.$currentElement.append($ripple);

    return $ripple;
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

  _removeRipple($ripple) {
    this.$element.find($ripple).eq(0).remove();
  }

  _getRippleCoordinates($ripple, pageX, pageY) {
    return {
      xCoordinate: pageX - this.$currentElement.offset().left - $ripple.width() / 2,
      yCoordinate: pageY - this.$currentElement.offset().top - $ripple.height() / 2,
    };
  }

  _setRippleSize($ripple) {
    const rippleDiameter = Math.max(
      this.$currentElement.outerWidth(),
      this.$currentElement.outerHeight(),
    );

    $ripple.css({ height: rippleDiameter, width: rippleDiameter });
  }
}

$(() => {
  const $button = $('.js-button');

  $button.each((index, item) => {
    new Button($(item), index);
  });
});
