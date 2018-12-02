import $ from 'jquery'

$(document).ready(function() {
  $('.dropdown').each(function () {
    let dropdown = $(this);

    $(dropdown).select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'dropdown__option',
      placeholder: $(dropdown).data('placeholder')
    });

    /* Реинициализация для адаптивности */

    $( window ).resize(function() {
      $(dropdown).select2('destroy')
          .select2({
            minimumResultsForSearch: Infinity,
            dropdownCssClass: 'dropdown__option',
            placeholder: $(dropdown).data('placeholder')
          });
    });
  });
});

