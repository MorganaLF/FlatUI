import $ from 'jquery';


class Calendar {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$currentElement = null;
    this.$elementParent = null;
    this.eventName = null;
    this.init();
  }

  init() {
    this.initDatepickerPlugin();
    this.displayCurrentDay();
    this.cutTitleSpaces();
    this.setResponsiveFontSize();
    this.addEventListeners();
  }

  initDatepickerPlugin() {
    this.$element.datepicker({
      firstDay: 0,
      dayNamesMin: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    });
  }

  addEventListeners() {
    $(window).resize(() => {
      this.setResponsiveFontSize();
    });

    const $arrowButton = this.$element.find('.ui-corner-all');

    $arrowButton
      .on('click', this.setResponsiveFontSize.bind(this))
      .on('click', this.cutTitleSpaces.bind(this));

    const $dayButton = this.$element.find('td[data-event="click"]');

    $dayButton
      .on('click', this.setResponsiveFontSize.bind(this))
      .on('click', this.cutTitleSpaces.bind(this));
  }

  displayCurrentDay() {
    this.$elementParent = this.$element.closest('.calendar');
    const currentDate = this.$element.datepicker('getDate').getDate();
    const $calendarHeader = this.$elementParent.find('.calendar__header');
    $calendarHeader.text(currentDate);
  }

  cutTitleSpaces() {
    const $dayButton = this.$element.find('td[data-event="click"]');
    $dayButton.on('click', this.cutTitleSpaces.bind(this));

    const $title = this.$element.find('.ui-datepicker-title');
    const str = $title.html().replace(/&nbsp;/g, '');
    $title.html(str);
  }

  setResponsiveFontSize() {
    const width = this.$element.width();

    const $header = this.$elementParent.find('.calendar__header');
    $header.css('font-size', width / 3.5);

    const $title = this.$element.find('.ui-datepicker-title');
    $title.css('font-size', width / 11.6);

    const $tableHead = this.$element.find('thead');
    $tableHead.css('font-size', width / 31.1);

    const $footer = this.$elementParent.find('.calendar__footer');
    $footer.css('font-size', width / 21.5);

    const $dayLink = this.$element.find('.ui-state-default');
    $dayLink.css('font-size', width / 14.5);

    const $dayButton = this.$element.find('td[data-event="click"]');
    $dayButton.on('click', this.setResponsiveFontSize.bind(this));
  }
}

function createCalendarInstance(index) {
  new Calendar($(this), index);
}

$('.calendar__body').each(createCalendarInstance);

/* Инициализация */

// $('.calendar__body').each(function () {
//   const calendar = $(this);
//
//   calendar.datepicker({
//     firstDay: 0,
//     dayNamesMin: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
//   });
//
//   /* Вывод числа в шапке */
//
//   function cutTitleSpaces() {
//     $(calendar).find('td[data-event="click"]').on('click', cutTitleSpaces);
//     const str = $(calendar).find('.ui-datepicker-title').html().replace(/&nbsp;/g, '');
//     $(calendar).find('.ui-datepicker-title').html(str);
//   }
//
//   cutTitleSpaces();
//
//   const currentDate = $(calendar).datepicker('getDate').getDate();
//   $(calendar).closest('.calendar').find('.calendar__header').text(currentDate);
//
//   /* Адаптивный шрифт */
//   let width;
//   function setResponsiveFontSize() {
//     width = $(calendar).find('.ui-widget.ui-widget-content').width();
//     $(calendar).closest('.calendar').find('.calendar__header').css('font-size', width / 3.5);
//     $(calendar).find('.ui-datepicker .ui-datepicker-title').css('font-size', width / 11.6);
//     $(calendar).find('.ui-datepicker-calendar thead').css('font-size', width / 31.1);
//     $(calendar).closest('.calendar').find('.calendar__footer').css('font-size', width / 21.5);
//     $(calendar).find('.ui-datepicker td span, .ui-datepicker td a').css('font-size', width / 14.5);
//     $(calendar).find('td[data-event="click"]').on('click', setResponsiveFontSize);
//   }
//
//   setResponsiveFontSize();
//
//   /* Адаптивный шрифт при ресайзе окна */
//
//   $(window).resize(() => {
//     setResponsiveFontSize();
//   });
//
//   /* Расширение функции плагина, установка размера шрифта при перерисовке */
//
//   $(calendar).find('.ui-corner-all').on('click', setResponsiveFontSize);
//   $(calendar).find('.ui-corner-all').on('click', cutTitleSpaces);
//
//   $(calendar).find('td[data-event="click"]').on('click', setResponsiveFontSize);
//   $(calendar).find('td[data-event="click"]').on('click', cutTitleSpaces);
// });
