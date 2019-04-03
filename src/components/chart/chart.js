import $ from 'jquery';

class Chart {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$valueContainer = null;
    this.value = 0;
    this.circumference = 0;
    this.type = 'percentage';
    this.series = [];
    this.init();
  }

  init() {
    this.type = this.$element.data('type');

    if (this.type === 'percentage') {
      this._drawPercentage();
      this._addEventListeners();
    } else {
      this._drawPieChart();
    }
  }

  _addEventListeners() {
    const $window = $(window);

    $window.on(
      `resize.percentageSetFont${this.elementIndex}`,
      this._setResponsiveFontSize.bind(this),
    );
  }

  _setValue() {
    this.$valueContainer = this.$element.find('.js-chart__value');

    this.value = this.$valueContainer.html();

    const isPositiveValue = (this.value >= 0) && !Number.isNaN(this.value);
    if (!isPositiveValue) { this.value = 0; }

    const isAllowableValue = this.value <= 100;
    if (!isAllowableValue) { this.value = 100; }
  }

  _setResponsiveFontSize() {
    this.$valueContainer.css('font-size', `${this.$element.width() / 100 * 42}px`);
  }

  _drawPercentage() {
    this._setValue();
    this._setResponsiveFontSize();

    const $scale = this._drawScale('47');
    this._animateScale($scale, 0, 'primary');

    this._animateValue();
  }

  _drawPieChart() {
    this.series = this.$element.data('series').split(', ');
    const colorModifiers = ['dark-grey', 'primary', 'secondary', 'light-grey'];

    this.series.forEach((val, index) => {
      this.value = val;
      let offset = 0;

      if (index === 0) {
        offset = 0;
      } else {
        offset = this.series.slice(0, index).reduce((sum, current) => Number(sum) + Number(current));
      }

      const $scale = this._drawScale('40', 'wide');
      this._animateScale($scale, offset, colorModifiers[index]);
    });
  }

  _drawScale(radius, sizeModifier) {
    const scale = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    const scaleClass = sizeModifier
      ? `chart__bar chart__bar_${sizeModifier}`
      : 'chart__bar';

    $(scale).attr({
      class: scaleClass,
      r: radius,
      cx: '50',
      cy: '50',
      fill: 'transparent',
    });

    const $svg = this.$element.find('.js-chart__svg');
    $svg.prepend(scale);

    this.circumference = Math.PI * (radius * 2);
    $(scale).css({ strokeDashoffset: this.circumference });

    return $(scale);
  }

  _animateValue() {
    const $valueEl = this.$valueContainer;

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

  _animateScale($scale, offset, colorModifier) {
    const scaleOffset = (100 - this.value - offset) / 100 * this.circumference;

    setTimeout(() => {
      $scale
        .css({
          strokeDasharray: this.circumference,
          strokeDashoffset: scaleOffset,
        })
        .addClass(`chart__bar_${colorModifier}`);
    }, 10);
  }
}

$(() => {
  const $chart = $('.js-chart');

  $chart.each((index, item) => {
    new Chart($(item), index);
  });
});
