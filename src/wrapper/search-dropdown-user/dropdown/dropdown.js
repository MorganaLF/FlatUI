import $ from 'jquery'

$(document).ready(function() {
  $('.dropdown').each(function () {

    $(this).select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'dropdown__option',
      placeholder: $(this).data('placeholder')
    });

    /* Реинициализация для адаптивности */

    $( window ).resize(function() {
      $(this).select2('destroy')
          .select2({
            minimumResultsForSearch: Infinity,
            dropdownCssClass: 'dropdown__option',
            placeholder: $(this).data('placeholder')
          });
    });
  });
});

