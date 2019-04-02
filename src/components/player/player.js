import $ from 'jquery';

class Player {
  constructor(element, elementIndex) {
    this.$element = element;
    this.playerNode = null;
    this.elementIndex = elementIndex;
    this.$playerContainer = null;
    this.$playButton = null;
    this.$fullScreenButton = null;
    this.$progressLineContainer = null;
    this.$progressLine = null;
    this.isFullScreen = false;
    this.init();
  }

  init() {
    this._findElements();
    this._addEventListeners();
  }

  playVideo() {
    let updateInterval;

    if (this.playerNode.paused) {
      this.$playButton.addClass('player__play-button_playing');
      this.playerNode.play();
      updateInterval = setInterval(this._updateProgressBar.bind(this), 1000);
    } else {
      this.$playButton.removeClass('player__play-button_playing');
      this.playerNode.pause();
      clearInterval(updateInterval);
    }
  }

  rewindVideo(event) {
    const progressLineWidth = this.$progressLineContainer.width();
    const cursorXCoordinate = event.pageX - this.$progressLineContainer.offset().left;

    this.playerNode.currentTime = this.playerNode.duration
      * (cursorXCoordinate / progressLineWidth);

    this._updateProgressBar.bind(this);
  }

  playInFullScreen() {
    if (!this.isFullScreen) {
      this.$fullScreenButton.addClass('player__full-button_opened');
      this.$playerContainer[0].requestFullscreen();
    } else {
      this.$fullScreenButton.removeClass('player__full-button_opened');
      document.exitFullscreen();
    }

    this.isFullScreen = !this.isFullScreen;
  }

  _findElements() {
    this.playerNode = this.$element[0];
    this.$playerContainer = this.$element.closest('.js-player__wrapper');
    this.$playButton = this.$playerContainer.find('.js-player__play-button');
    this.$fullScreenButton = this.$playerContainer.find('.js-player__full-button');
    this.$progressLineContainer = this.$playerContainer.find('.js-player__progress-container');
    this.$progressLine = this.$playerContainer.find('.js-player__progress');
  }

  _addEventListeners() {
    this.$element
      .on(`click.playerPlayVideo${this.elementIndex}`, this.playVideo.bind(this));

    this.$playButton
      .on(`click.playerPlayVideo${this.elementIndex}`, this.playVideo.bind(this));

    this.$fullScreenButton
      .on(`click.playerFullScreen${this.elementIndex}`, this.playInFullScreen.bind(this));

    this.$progressLineContainer
      .on(`click.playerRewindVideo${this.elementIndex}`, this.rewindVideo.bind(this));
  }

  _updateProgressBar() {
    const progressLineWidth = this.$progressLineContainer.width();
    const passedTimeInPercent = (this.playerNode.currentTime / this.playerNode.duration);

    this.$progressLine.css('width', `${passedTimeInPercent * progressLineWidth}px`);
  }
}

$(() => {
  const $player = $('.js-player');

  $player.each((index, item) => {
    new Player($(item), index);
  });
});
