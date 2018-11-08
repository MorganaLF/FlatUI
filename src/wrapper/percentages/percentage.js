import jQuery from 'jquery';

jQuery(".pr.around").progressPie({
  size: 70,
  ringWidth: 7,
  strokeWidth: 0,
  ringEndsRounded: true,
  valueSelector: "span.value",
  color: "navy"
});
