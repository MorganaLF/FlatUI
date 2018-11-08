import jQuery from 'jquery';

jQuery(".percentage").progressPie({
  size: 95,
  ringWidth: 5,
  strokeWidth: 0,
  ringEndsRounded: true,
  valueSelector: ".percentage__value",
  color: "#e75735"
});
