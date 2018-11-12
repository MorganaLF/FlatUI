import $ from 'jquery'

$( function() {

  $( ".slider" ).slider();

  $( ".slider__tip" ).each(function() {
    $(this).text($(this).closest('.slider').slider( "value" ));
    $(this).closest('.slider').slider({
      slide: function( event, ui ) {
        $(this).find(".slider__tip").text( ui.value );
        }
    })
  });

  $( ".slider_is-progress" ).slider({
    range: "min"
  });

} );