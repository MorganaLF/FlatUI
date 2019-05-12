class Slider {
  constructor(element) {
    this.$element = element;
    this.init();
  }

  init() {
    let options = {
      value: this.$element.data('value'),
      min: this.$element.data('min'),
      max: this.$element.data('max'),
      step: this.$element.data('step'),
    };

    if (this.$element.hasClass('slider_with-progress')) {
      options = {
        ...options,
        range: 'min',
      };
    }

    this.$element.slider(options);

    this._displaySliderValue();
  }

  _displaySliderValue() {
    const $tip = this.$element.find('.js-slider__tip');

    $tip.text(this.$element.slider('value'));

    this.$element.slider({
      slide(event, ui) {
        $tip.text(ui.value);
      },
    });
  }
}

$(() => {
  const $slider = $('.js-slider');

  $slider.each((index, item) => {
    new Slider($(item));
  });
});
