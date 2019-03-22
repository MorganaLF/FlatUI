import $ from 'jquery'

$( function() {

  $( ".slider" ).each(function(){
    $(this).slider({
      value: $(this).data('value')
    });
  });

  $( ".slider__tip" ).each(function() {
    $(this).text($(this).closest('.slider').slider( "value" ));
    $(this).closest('.slider').slider({
      slide: function( event, ui ) {
        $(this).find(".slider__tip").text( ui.value );
        }
    })
  });

  $( ".slider_with-progress" ).slider({
    range: "min"
  });

} );