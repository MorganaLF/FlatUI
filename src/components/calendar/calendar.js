import $ from 'jquery';

class Calendar {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$elementParent = null;
    this.init();
  }

  init() {
    this._initDatepickerPlugin();
    this._displayCurrentDay();
    this._cutTitleSpaces();
    this._setResponsiveFontSize();
    this._addEventListeners();
  }

  _initDatepickerPlugin() {
    this.$element.datepicker({
      firstDay: 0,
      dayNamesMin: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    });
  }

  _addEventListeners() {
    const $window = $(window);
    $window.on(`resize.calendarResizeFont${this.elementIndex}`, this._setResponsiveFontSize.bind(this));

    const $arrowButton = this.$element.find('.ui-corner-all');

    $arrowButton
      .on(`click.calendarResizeFont${this.elementIndex}`, this._setResponsiveFontSize.bind(this))
      .on(`click.calendarCutSpaces${this.elementIndex}`, this._cutTitleSpaces.bind(this));

    const $dayButton = this.$element.find('td[data-event="click"]');

    $dayButton
      .on(`click.calendarResizeFont${this.elementIndex}`, this._setResponsiveFontSize.bind(this))
      .on(`click.calendarCutSpaces${this.elementIndex}`, this._cutTitleSpaces.bind(this));
  }

  _displayCurrentDay() {
    this.$elementParent = this.$element.closest('.js-calendar');
    const currentDay = this.$element.datepicker('getDate').getDate();
    const $calendarHeader = this.$elementParent.find('.js-calendar__header');
    $calendarHeader.text(currentDay);
  }

  _cutTitleSpaces() {
    const $title = this.$element.find('.ui-datepicker-title');
    const str = $title.html().replace(/&nbsp;/g, '');
    $title.html(str);

    const $dayButton = this.$element.find('td[data-event="click"]');
    $dayButton.on(`click.calendarCutSpaces${this.elementIndex}`, this._cutTitleSpaces.bind(this));
  }

  _setResponsiveFontSize() {
    const width = this.$element.width();

    const $header = this.$elementParent.find('.js-calendar__header');
    $header.css('font-size', width / 3.5);

    const $title = this.$element.find('.ui-datepicker-title');
    $title.css('font-size', width / 11.6);

    const $tableHead = this.$element.find('thead');
    $tableHead.css('font-size', width / 31.1);

    const $footer = this.$elementParent.find('.js-calendar__footer');
    $footer.css('font-size', width / 21.5);

    const $dayLink = this.$element.find('.ui-state-default');
    $dayLink.css('font-size', width / 14.5);

    const $dayButton = this.$element.find('td[data-event="click"]');
    $dayButton.on(`click.calendarResizeFont${this.elementIndex}`, this._setResponsiveFontSize.bind(this));
  }
}

function createCalendarInstance(index) {
  new Calendar($(this), index);
}

const $calendar = $('.js-calendar__body');
$calendar.each(createCalendarInstance);
