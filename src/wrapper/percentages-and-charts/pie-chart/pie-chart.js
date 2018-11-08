import $ from 'jquery';

const myChart = $(".pie-chart").jChart({
  data: [
    {
      value: 30,
      color: {
        normal: '#747474',
        active: '#747474'
      }
    },
    {
      value: 70,
      color: {
        normal: '#e75735',
        active: '#e75735'
      }
    },
    {
      value: 100,
      color: {
        normal: '#4eb7a8',
        active: '#4eb7a8'
      }
    },
    {
      value: 100,
      color: {
        normal: '#e5e5e5',
        active: '#e5e5e5'
      }
    }
  ],
  appearance: {
    gap: 0
  }

});