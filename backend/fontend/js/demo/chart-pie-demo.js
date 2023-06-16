// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ['#4e73df', '#DDDDDD', '#FFFFFF']
    }],
  },
  options: {
    rotation:0.7 * Math.PI,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      displayColors: false,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});


var ctx = document.getElementById("myPieChart2");
var myPieChart2 = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ['#4e73df', '#DDDDDD', '#FFFFFF']
    }],
  },
  options: {
    rotation:0.7 * Math.PI,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      displayColors: false,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

var ctx = document.getElementById("myPieChart3");
var myPieChart3 = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [20, 60, 20],
      backgroundColor: ['#4e73df', '#DDDDDD', '#FFFFFF']
    }],
  },
  options: {
    rotation:0.7 * Math.PI,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      displayColors: false,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});