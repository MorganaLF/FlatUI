import $ from 'jquery'

$( function() {
  $( ".calendar" ).datepicker({
    firstDay: 0,
    dayNamesMin: [ "mon", "tue", "wed", "thu", "fri", "sat", "sun" ],

    onSelect: function(dateText, inst) {

      // setTimeout(function(){
      //   let width = $( ".calendar .ui-widget.ui-widget-content" ).width();
      //
      //   $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);
      //
      // }, 0);
    }
  }).on('click', function(){
    let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

    $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

  });

  $( ".ui-datepicker" ).each(function () {
    $( this ).click(function(){
      $('.ui-state-default').each(function (){
        $(this).unbind();
        $( this ).click(function(event){
          event.preventDefault();
          let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

          $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

        });
      });
      let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

      $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

    });
  });

  $('.ui-state-default').each(function (){
    $(this).unbind();
    $( this ).click(function(event){
      //event.unbind();
      event.preventDefault();
      let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

      $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

    });
  });

  $( "td" ).each(function () {
    $(this).unbind();


    //$('.ui-state-default').preventDefault();
    $( this ).click(function(event){
      alert(this);
      $(this).unbind();
      event.preventDefault();
      let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

      $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

    });
  });

  let currentDate = $( ".calendar" ).datepicker( "getDate" ).getDate();
  $( ".calendar__header" ).text(currentDate);



  let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

  $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

  $( window ).resize(function() {
    width = $( ".calendar .ui-widget.ui-widget-content" ).width();
    $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5)
  });

  if ( $.datepicker.initialized ){
    let width = $( ".calendar .ui-widget.ui-widget-content" ).width();

    $( ".ui-datepicker td span, .ui-datepicker td a" ).css('font-size', width / 14.5);

  }

} );

