// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}



label2 = [1, 2]
data2 = [1, 1]
data3 = [1, 1]
data4 = [[], [], [], []]
data5 = [1, 1]
var myLineChart1;
var myLineChart2;
var myLineChart3;
var myLineChart4;
var sample = 0;
var num_sample = 600;
let request = new XMLHttpRequest();
var url = window.location.protocol + '//' + window.location.host + '/batinfo/' + (window.location.hash ? window.location.hash.split('#')[1] : 1);
// var url = "https://iot.jiabaida.com/js/chunk-elementUI.842b8168.js"

allchart = []
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    // response.rows = response.rows.reverse();
    label2 = []
    data2 = []
    data3 = []
    data4 = [[], [], [], []]
    data5 = []
    data6 = []
    data7 = []

    const response = JSON.parse(this.responseText);

    row_count = response.rows.length;
    response.rows.forEach(element => {
      i = 0
      label2.push(new Date(element.datetime))
      data2.push(element.voltage)
      data3.push(element.current)
      data4[0].push((data4[0].length > 0 ? (data4[0][data4[0].length - 1] * ((row_count / 20) - 1) + element.temp1) / (row_count / 20) : element.temp1))
      data4[1].push((data4[1].length > 0 ? (data4[1][data4[1].length - 1] * ((row_count / 20) - 1) + element.temp2) / (row_count / 20) : element.temp2))
      data4[2].push((data4[2].length > 0 ? (data4[2][data4[2].length - 1] * ((row_count / 20) - 1) + element.temp3) / (row_count / 20) : element.temp3))
      data4[3].push((data4[3].length > 0 ? (data4[3][data4[3].length - 1] * ((row_count / 20) - 1) + element.temp4) / (row_count / 20) : element.temp4))
      data5.push(element.remaincap)
      data6.push(element.cell1)
      data7.push(element.cell2)
    });

    

    document.getElementById("cycle").textContent = response.rows[0].cycle;
    document.getElementById("soc").textContent = response.rows[0].soc + "%";
    document.getElementById("socbar").style = "width: " + response.rows[0].soc + "%";
    document.getElementById("remaincap").textContent = response.rows[0].remaincap + " Ah";
    document.getElementById("remaincapbar").style = "width: " + response.rows[0].soc + "%";
    document.getElementById("maxtemp").textContent = Math.max(data4[0].concat(data4[1], data4[2], data4[3]).max()).toFixed(2) + ' °C';



    lineTensionValue = 0.3

    // Area Chart Example

    var ctx = document.getElementById("myAreaChart");
    myLineChart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: label2,
        datasets: [{
          label: "Voltage",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(78, 115, 223, 0.2)",
          borderColor: "rgba(78, 115, 223, 1)",
          borderWidth: 1,
          pointRadius: 0,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data2,
        }],
      },
      options: {
        maintainAspectRatio: false,

        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'minute'
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              callback: function (value, index, values) {
                return number_format(value) + ' V';
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ' ' + number_format(tooltipItem.yLabel, decimals = 2) + ' V';
            }
          }
        }
      }
    });




    //////////////////////////




    var ctx = document.getElementById("myAreaChart2");
    myLineChart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: label2,
        datasets: [{
          label: "Current",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(178, 115, 223, 0.4)",
          borderColor: "rgba(178, 115, 223, 1)",
          pointRadius: 0,
          borderWidth: 1,
          pointBackgroundColor: "rgba(178, 115, 223, 1)",
          pointBorderColor: "rgba(178, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(178, 115, 223, 1)",
          pointHoverBorderColor: "rgba(178, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data3,
        }],
      },
      options: {
        maintainAspectRatio: false,

        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'minute'
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return number_format(value) + ' A';
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ' ' + number_format(tooltipItem.yLabel, decimals = 2) + ' A';
            }
          }
        }
      }
    });


    //////////////////////////




    var ctx = document.getElementById("myAreaChart3");
    myLineChart3 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: label2,
        datasets: [{
          label: "Temp1",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(255, 115, 223, 0.4)",
          borderColor: "rgba(255, 115, 223, 1)",
          pointRadius: 0, borderWidth: 1,
          pointBackgroundColor: "rgba(255, 115, 223, 1)",
          pointBorderColor: "rgba(255, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(255, 115, 223, 1)",
          pointHoverBorderColor: "rgba(255, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data4[0],
        }, {
          label: "Temp2",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(178, 115, 223, 0.4)",
          borderColor: "rgba(178, 115, 223, 1)",
          pointRadius: 0, borderWidth: 1,
          pointBackgroundColor: "rgba(178, 115, 223, 1)",
          pointBorderColor: "rgba(178, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(178, 115, 223, 1)",
          pointHoverBorderColor: "rgba(178, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data4[1],
        }, {
          label: "Temp3",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(0, 115, 223, 0.4)",
          borderColor: "rgba(0, 115, 223, 1)",
          pointRadius: 0, borderWidth: 1,
          pointBackgroundColor: "rgba(0, 115, 223, 1)",
          pointBorderColor: "rgba(0, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(0, 115, 223, 1)",
          pointHoverBorderColor: "rgba(0, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data4[2],
        }, {
          label: "Temp4",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(178, 0, 223, 0.4)",
          borderColor: "rgba(178, 0, 223, 1)",
          pointRadius: 0, borderWidth: 1,
          pointBackgroundColor: "rgba(178, 0, 223, 1)",
          pointBorderColor: "rgba(178, 0, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(178, 0, 223, 1)",
          pointHoverBorderColor: "rgba(178, 0, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data4[3],
        }],
      },
      options: {
        maintainAspectRatio: false,

        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'minute'
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              callback: function (value, index, values) {
                return number_format(value, decimals = 1) + ' °C';
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ' ' + number_format(tooltipItem.yLabel, decimals = 2) + ' °C';
            }
          }
        }
      }
    });

    //////////////////////////




    var ctx = document.getElementById("myAreaChart4");
    myLineChart4 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: label2,
        datasets: [{
          label: "Remaincap",
          lineTension: lineTensionValue,
          backgroundColor: "rgba(255, 115, 223, 0.4)",
          borderColor: "rgba(255, 115, 223, 1)",
          pointRadius: 0, borderWidth: 1,
          pointBackgroundColor: "rgba(255, 115, 223, 1)",
          pointBorderColor: "rgba(255, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(255, 115, 223, 1)",
          pointHoverBorderColor: "rgba(255, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: data5,
        }],
      },
      options: {
        maintainAspectRatio: false,

        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'minute'
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              callback: function (value, index, values) {
                return number_format(value, decimals = 1) + ' Ah';
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ' ' + number_format(tooltipItem.yLabel, decimals = 2) + ' Ah';
            }
          }
        }
      }
    });



  }
};

function getBatData(s,ns,sub,id) {
  sample = s;

  myLineChart1.destroy();
  myLineChart2.destroy();
  myLineChart3.destroy();
  myLineChart4.destroy();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send('{"sample":' + s + ',"num_sample":'+ns+',"sub":'+sub+',"id":'+id+'}');
}

request.open('POST', url, true);
request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
request.send('{"sample":1,"num_sample":600}');

