$(function() {
  var address = $("#api").val();
  getChartData(address).done(requestSuccess).fail(requestFailed);
  getCurrentData(address);
});

function getCurrentData (address) {
  $.ajax({
    url:  address+"/current",
    success:function(data) {
      $("#current_temp").text(data['temperature'].toFixed(1)+"°C");
      $("#current_hum").text(data['humidity'].toFixed(1)+"%");
    }
  });
}

function getChartData(address) {
    return $.ajax({
        url : address+"/statuses",
        type: 'GET'
    });
}

function requestSuccess(data) {
    var chartData = [];
    for (var i = 0; i < data.length; i++) {
      chartData.push({
          date: new Date(data[i]['created_at']),
          temperature: data[i]['temperature'].toFixed(1),
          humidity: data[i]['humidity'].toFixed(1)
      });
    };
    makeChart(chartData);
}

function requestFailed (argument) {
  $("#chartdiv").html("<h1 class='center'>Unable to get data! Please double check your settings.</h1>")
}

function makeChart (data) {
  var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "none",
    "dataProvider": data,
    "valueAxes": [{
        "position": "left",
        "title": ""
    }],
    "graphs": [{
        "type": "smoothedLine",
        "lineColor": "#4acaa8",
        "fillAlphas": 0.4,
        "balloonText": "<b><span style='font-size:12px;'>[[value]]&deg;C </span></b>",
        "valueField": "temperature"
    },
    {
        "type": "smoothedLine",
        "lineColor": "#999",
        "fillAlphas": 0.1,
        "balloonText": "<b><span style='font-size:10px;'>[[value]]% </span></b>",
        "valueField": "humidity"
    }
    ],
    "chartCursor": {
        "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
        "cursorPosition": "mouse",
        "cursorColor": "#4acaa8"
    },
    "categoryField": "date",
    "categoryAxis": {
        "minPeriod": "mm",
        "parseDates": true
    }
  });
}
;
