import $ from 'jquery'

$(document).ready(function() {
  $('.dropdown').select2({
    minimumResultsForSearch: Infinity,
    dropdownCssClass: 'dropdown__option',
    placeholder: 'Choose An Option'
  });
});