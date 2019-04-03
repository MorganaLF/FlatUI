class Stage {
  constructor(element, elementIndex) {
    this.$stage = element;
    this.stageIndex = elementIndex;
    this.$stageItem = null;
    this.$stageContent = null;
    this.containerWidth = 0;
    this.currentStageItemIndex = 0;
    this.init();
  }

  init() {
    this._findElements();
    this._setContainerWidth();
    this._setContentHeight();
    this._addEventListeners();
  }

  setActiveStage(currentIndex) {
    this.currentStageItemIndex = currentIndex;

    this.$stageItem.each((index, item) => {
      const inactiveItemIndex = index > currentIndex;

      if (inactiveItemIndex) {
        $(item).addClass('stage__item_inactive');
      } else {
        $(item).removeClass('stage__item_inactive');
      }
    });

    const $stageLine = this.$stage.find('.js-stage__line');

    $stageLine.each((index, line) => {
      const inactiveLineIndex = index >= currentIndex;

      if (inactiveLineIndex) {
        $(line).addClass('stage__line_inactive');
      } else {
        $(line).removeClass('stage__line_inactive');
      }
    });

    this.scrollCarousel();
  }

  scrollCarousel(withTimeout) {
    this._setContainerWidth();

    this.$stageContent
      .css('transform', `translateX(-${this.containerWidth * this.currentStageItemIndex}px)`);

    if (withTimeout) {
      setTimeout(() => {
        this._setContentHeight();
      }, 1000);
    } else {
      this._setContentHeight();
    }
  }

  _addEventListeners() {
    this.$stageItem.each((index, item) => {
      $(item).on(
        `click.StageSetActive${this.stageIndex}`,
        this.setActiveStage.bind(this, index),
      );
    });

    const $window = $(window);

    $window.on(
      `resize.StageScroll${this.stageIndex}`,
      this.scrollCarousel.bind(this, true),
    );
  }

  _findElements() {
    this.$stageItem = this.$stage.find('.js-stage__item');
    this.$stageContent = this.$stage.find('.js-stage__content');
  }

  _setContainerWidth() {
    this.containerWidth = this.$stage.width();
    this.$stageContent.css('width', `${this.containerWidth * this.$stageItem.length}px`);
  }

  _setContentHeight() {
    const $currentSlide = this.$stage
      .find('.js-stage__content>*')
      .eq(this.currentStageItemIndex);

    const contentHeight = $currentSlide.outerHeight();

    this.$stageContent.css('height', contentHeight);
  }
}

$(() => {
  const $stage = $('.js-stage');

  $stage.each((index, item) => {
    new Stage($(item), index);
  });
});
