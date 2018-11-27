import $ from 'jquery'

$( function() {

  /* Инициализация */

  $( ".calendar" ).datepicker({
    firstDay: 0,
    dayNamesMin: [ "mon", "tue", "wed", "thu", "fri", "sat", "sun" ],
  });

  /* Вырезание пробела в шапке календаря */

  let str = $('.ui-datepicker-title').html().replace(/&nbsp;/g, '');
  $('.ui-datepicker-title').html(str);

  /* Вывод числа в шапке */

  let currentDate = $( ".calendar" ).datepicker( "getDate" ).getDate();
  $( ".calendar__header" ).text(currentDate);

  /* Адаптивный шрифт */

  let width = $( ".calendar .ui-widget.ui-widget-content" ).width();
  $( ".calendar__header" ).css('font-size', width / 3.5);
  $( ".ui-datepicker .ui-datepicker-title" ).css('font-size', width / 11.6);
  $( ".ui-datepicker-calendar thead" ).css('font-size', width / 31.1);
  $( ".calendar__footer" ).css('font-size', width / 21.5);
  $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

  /* Адаптивный шрифт при ресайзе окна */

  $( window ).resize(function() {
    width = $( ".calendar .ui-widget.ui-widget-content" ).width();
    $( ".calendar__header" ).css('font-size', width / 3.5);
    $( ".ui-datepicker .ui-datepicker-title" ).css('font-size', width / 11.6);
    $( ".ui-datepicker-calendar thead" ).css('font-size', width / 31.1);
    $( ".calendar__footer" ).css('font-size', width / 21.5);
    $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5)
  });

  /* Расширение функции плагина, установка размера шрифта при перерисовке */

  function datepicker_handleMouseover() {
    if ( !$.datepicker._isDisabledDatepicker( datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[ 0 ] : datepicker_instActive.input[ 0 ] ) ) {
      $( this ).parents( ".ui-datepicker-calendar" ).find( "a" ).removeClass( "ui-state-hover" );
      $( this ).addClass( "ui-state-hover" );
      if ( this.className.indexOf( "ui-datepicker-prev" ) !== -1 ) {
        $( this ).addClass( "ui-datepicker-prev-hover" );
      }
      if ( this.className.indexOf( "ui-datepicker-next" ) !== -1 ) {
        $( this ).addClass( "ui-datepicker-next-hover" );
      }
    }
  }

  var datepicker_instActive;
  $.datepicker._updateDatepicker = function( inst ) {
    this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
    datepicker_instActive = inst; // for delegate hover events
    inst.dpDiv.empty().append( this._generateHTML( inst ) );
    this._attachHandlers( inst );

    var origyearshtml,
        numMonths = this._getNumberOfMonths( inst ),
        cols = numMonths[ 1 ],
        width = 17,
        activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );

    if ( activeCell.length > 0 ) {
      datepicker_handleMouseover.apply( activeCell.get( 0 ) );
    }

    inst.dpDiv.removeClass( "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4" ).width( "" );
    if ( cols > 1 ) {
      inst.dpDiv.addClass( "ui-datepicker-multi-" + cols ).css( "width", ( width * cols ) + "em" );
    }
    inst.dpDiv[ ( numMonths[ 0 ] !== 1 || numMonths[ 1 ] !== 1 ? "add" : "remove" ) +
    "Class" ]( "ui-datepicker-multi" );
    inst.dpDiv[ ( this._get( inst, "isRTL" ) ? "add" : "remove" ) +
    "Class" ]( "ui-datepicker-rtl" );

    if ( inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
      inst.input.trigger( "focus" );
    }

    // Deffered render of the years select (to avoid flashes on Firefox)
    if ( inst.yearshtml ) {
      origyearshtml = inst.yearshtml;
      setTimeout( function() {

        //assure that inst.yearshtml didn't change.
        if ( origyearshtml === inst.yearshtml && inst.yearshtml ) {
          inst.dpDiv.find( "select.ui-datepicker-year:first" ).replaceWith( inst.yearshtml );
        }
        origyearshtml = inst.yearshtml = null;
      }, 0 );
    }

    let str = $('.ui-datepicker-title').html().replace(/&nbsp;/g, '');
    $('.ui-datepicker-title').html(str);


    let curWidth = $(this).find( ".ui-widget.ui-widget-content" ).width();

    $(this).find( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', curWidth / 14.5);

  }


} );

