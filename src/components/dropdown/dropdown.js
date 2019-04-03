import $ from 'jquery';
import '../../../node_modules/select2/dist/js/select2.full.min';

class Dropdown {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.init();
  }

  init() {
    this._initSelectPlugin();
    this._addEventListeners();
  }

  _initSelectPlugin() {
    this.$element.select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'dropdown__option',
      placeholder: this.$element.data('placeholder'),
    });
  }

  _addEventListeners() {
    const $window = $(window);
    $window.on(`resize.dropdownResize${this.elementIndex}`, this._resizeDropdown.bind(this));
  }

  _resizeDropdown() {
    this.$element.select2('destroy');
    this._initSelectPlugin();
  }
}

$(() => {
  const $dropdown = $('.js-dropdown');

  $dropdown.each((index, item) => {
    new Dropdown($(item), index);
  });
});
