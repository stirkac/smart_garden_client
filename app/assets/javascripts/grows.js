$(function() {
  if (typeof address_location !== 'undefined') {
    getChartData(address_location).done(requestSuccess).fail(requestFailed);
    getCurrentData(address_location);
  }
  $('#new_schedule').on('ajax:error', function(event, xhr, status, error) {
    $(this).append(xhr.responseText);
  });
  $('#new_schedule').on('ajax:success', function(event, data, status, xhr) {
    $(".features").append(data);
    $("#datetimepicker").val("");
    $("#schedule_title").val("");
  });
  init_slider();
  var elem = document.querySelector('.js-switch');
  var init = new Switchery(elem, { color: '#4acaa8'});
  $('#new_grow').submit(function(e) {
    if ($('#step_one').css('display') != 'none' ){
      e.preventDefault();
    }
    else{
      $('#new_grow').unbind('submit').submit()
    }
    getChartData($('#grow_api_location').val()).done(function (data) {
      $('input[name="commit"]').val("Add to My Gardens");
      $('#step_one').hide("fast");
      $('#step_two').show("fast");
    }).fail(function (data) {
      //alert("Address entered does not appear as valid API");
      $('#grow_api_location').css( "border", "solid 3px #ff0000");
    });
  });
});

function init_slider () {
  $("#temperature_slider").noUiSlider({
    start: [$('#grow_temp_low').val(), $('#grow_temp_high').val()],
    connect: true,
    range: {
      'min': 0,
      'max': 50
    },

    behaviour: 'tap-drag',
    format: wNumb({
      mark: ',',
      decimals: 1
    }),
  });

  $('#temperature_slider').Link('lower').to($('#grow_temp_low'));
  $('#temperature_slider').Link('lower').to($('#s_temp_low'));
  $('#temperature_slider').Link('upper').to($('#grow_temp_high'));
  $('#temperature_slider').Link('upper').to($('#s_temp_high'));

  $('#temperature_slider').noUiSlider_pips({
    mode: 'positions',
    values: [0,20,40,60,80,100],
    density: 2
  });

  $("#humidity_slider").noUiSlider({
    start: [$('#grow_hum_low').val(), $('#grow_hum_high').val()],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    },

    behaviour: 'tap-drag',
    format: wNumb({
      mark: ',',
      decimals: 1
    })
  });

  $('#humidity_slider').Link('lower').to($('#grow_hum_low'));
  $('#humidity_slider').Link('lower').to($('#s_hum_low'));
  $('#humidity_slider').Link('upper').to($('#grow_hum_high'));
  $('#humidity_slider').Link('upper').to($('#s_hum_high'));

  $('#humidity_slider').noUiSlider_pips({
    mode: 'positions',
    values: [0,20,40,60,80,100],
    density: 2
  });
}


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
    return chartData;
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
