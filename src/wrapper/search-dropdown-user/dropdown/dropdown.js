import $ from 'jquery'

$(document).ready(function() {
  $('.dropdown').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'dropdown__option',
    placeholder: 'Choose An Option'
  });
});

/* Реинициализация для адаптивности */

$( window ).resize(function() {
  $('.dropdown').select2('destroy')
                .select2({
                  minimumResultsForSearch: Infinity,
                  dropdownCssClass: 'dropdown__option',
                  placeholder: 'Choose An Option'
                });
});