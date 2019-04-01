import $ from 'jquery';

class Percentage {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$valueElement = null;
    this.scale = null;
    this.value = 0;
    this.circumference = 0;
    this.init();
  }

  init() {
    this._setValue();
    this._setResponsiveFontSize();
    this._drawScale();
    this._animateValue();
    this._animateScale();
    this._addEventListeners();
  }

  _addEventListeners() {
    const $window = $(window);

    $window.on(
      `resize.percentageSetFont${this.elementIndex}`,
      this._setResponsiveFontSize.bind(this),
    );
  }

  _setValue() {
    this.$valueElement = this.$element.find('.js-percentage__value');

    this.value = this.$valueElement.html();

    const isPositiveValue = (this.value >= 0) && !Number.isNaN(this.value);
    if (!isPositiveValue) { this.value = 0; }

    const isAllowableValue = this.value <= 100;
    if (!isAllowableValue) { this.value = 100; }
  }

  _setResponsiveFontSize() {
    this.$valueElement.css('font-size', `${this.$element.width() / 100 * 42}px`);
  }

  _drawScale() {
    this.scale = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    $(this.scale).attr({
      class: 'percentage__bar',
      r: '47',
      cx: '50',
      cy: '50',
      fill: 'transparent',
    });

    const $svg = this.$element.find('.js-percentage__svg');
    $svg.prepend(this.scale);

    const radius = $(this.scale).attr('r');
    this.circumference = Math.PI * (radius * 2);

    $(this.scale).css({ strokeDashoffset: this.circumference });
  }

  _animateValue() {
    const $valueEl = this.$valueElement;

    $valueEl
      .prop('Counter', 0)
      .animate({
        Counter: $valueEl.text(),
      }, {
        duration: 2000,
        easing: 'swing',
        step(now) {
          $valueEl.text(Math.ceil(now));
        },
      });
  }

  _animateScale() {
    const scaleOffset = (100 - this.value) / 100 * this.circumference;

    setTimeout(() => {
      $(this.scale)
        .css({
          strokeDasharray: this.circumference,
          strokeDashoffset: scaleOffset,
        })
        .addClass('percentage__bar_primary');
    }, 10);
  }
}

function createPercentageInstance(index) {
  new Percentage($(this), index);
}

const $percentage = $('.js-percentage');
$percentage.each(createPercentageInstance);
