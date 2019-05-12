class Search {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.init();
  }

  init() {
    const $searchButton = this.$element.find('.js-search__button');

    $searchButton.on(
      `click.search${this.elementIndex}`,
      this._handleSearchButtonClick.bind(this)
    );

    const $searchInput = this.$element.find('.js-search__input');

    $searchInput.on(
      `blur.search${this.elementIndex}`,
      this._handleSearchInputBlur.bind(this)
    );

    $searchButton.on(
      `blur.search${this.elementIndex}`,
      this._handleSearchInputBlur.bind(this)
    );
  }

  _handleSearchButtonClick(event) {
    event.preventDefault();

    const $searchInput = this.$element.find('.js-search__input');

    $searchInput
      .addClass('search__input_primary')
      .val('')
      .attr('placeholder', $searchInput.data('error-placeholder'));
  }

  _handleSearchInputBlur() {
    const $searchInput = this.$element.find('.js-search__input');

    $searchInput
      .removeClass('search__input_primary')
      .attr('placeholder', $searchInput.data('placeholder'));
  }
}

$(() => {
  const $search = $('.js-search');

  $search.each((index, item) => {
    new Search($(item), index);
  });
});
