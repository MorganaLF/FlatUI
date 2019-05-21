class Calendar {
  constructor(element, elementIndex) {
    this.$element = element;
    this.elementIndex = elementIndex;
    this.$calendarBody = null;
    this.init();
  }

  init() {
    this.$calendarBody = this.$element.find('.js-calendar__body');

    this.$calendarBody.datepicker({
      firstDay: 1,
      dayNamesMin: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      onSelect: this._displayCurrentDay.bind(this),
    });

    this._displayCurrentDay();

    const $footer = this.$element.find('.js-calendar__footer');

    $footer.on(
      `click.calendar${this.elementIndex}`,
      this._handleFooterClick.bind(this),
    );
  }

  _handleFooterClick() {
    const todayDate = new Date();
    this.$calendarBody.datepicker('setDate', todayDate);
    this._displayCurrentDay();
  }

  _displayCurrentDay() {
    const currentDay = this.$calendarBody.datepicker('getDate').getDate();
    const $calendarHeader = this.$element.find('.js-calendar__header');
    $calendarHeader.text(currentDay);
  }
}

export default Calendar;
