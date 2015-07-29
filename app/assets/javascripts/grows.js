$(function() {
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
  //Get data where applicable
  if (typeof address_location !== 'undefined') {
    getChartData(address_location).done(requestSuccess).fail(function() {
      $("#chartdiv").html("<h1 class='center'>Unable to get data! Please double check your settings.</h1>");
    });
    getCurrentData(address_location);
  }
  horizontalValueSliderInit(); //temperature and humidity sliders
  twoStepForm(); //new garden form
  handleNotifications(); //notifications on show page
  handleSchedule(); //schedules on show page
  handleTips();
  var elem = document.querySelector('.js-switch');
  var init = new Switchery(elem, { color: '#4acaa8'});
});

function twoStepForm () {
  //plants search
  $("#search-button").on("click", displaySearchResults);
  $("#search-input").keypress(function (e) {
    if (e.which == 13) { displaySearchResults(); }
  });
  $("#search-continue").on("click", function () {
    $("#search").slideUp("fast");
    $("#new_grow").slideDown("fast");
  });

  //week slider
  $("#week_slider").noUiSlider({
    start: [ 20 ],
    step: 2,
    range: {
      'min': [  3 ],
      'max': [ 52 ]
    },
    format: wNumb({
      mark: '',
      decimals: 0
    })
  });
  $("#week_slider").Link('lower').to($("#grow_weeks"));
  $("#week_slider").Link('lower').to($("#s_grow_weeks"));

  //New grow two step form
  $('#new_grow').submit(function(e) {
    handleCreate(e);
  });
  //New grow dropdown
  if ($('#select_device').css('display') != 'none') {
    dropDownData().done(handleDropdown).fail(function(){
      console.log("failed");
    });
  }
  $("#grow_name").on("change keydown paste input", function() {
    $("#grow_name").css("border", "solid 2px #e4e4e4");
  });
  $("#grow_description").on("change keydown paste input", function() {
    $("#grow_description").css("border", "solid 2px #e4e4e4");
  });
}

function handleNotifications() {
  $('#dismiss').click(function(e) {
  e.preventDefault();
  $.ajax({
    url:  $('#dismiss').attr('href'),
    type: 'POST',
    success:function(data) {
      $("#two .container").html("<p>No notifications. Don't worry, notifications will appear here and via email as soon as we need your attention!</p><ul class='feature-icons'><li class='fa-code'>Scheduled event</li><li class='fa-cubes'>Temperature is too high</li><li class='fa-book'>Check humidity</li><li class='fa-coffee'>Drink much coffee</li><li class='fa-bolt'>Lightning bolt</li><li class='fa-users'>Shadow clone technique</li></ul>");
    }
  });
});
}

function handleSchedule() {
  $('#new_schedule').on('ajax:error', function(event, xhr, status, error) {
    $(this).append(xhr.responseText);
  });
  $('#new_schedule').on('ajax:success', function(event, data, status, xhr) {
    $("#schedules").append(data);
    $("#datetimepicker").val("");
    $("#schedule_title").val("");
  });
}

function dropDownData() {
  return $.ajax({
      url : "available_devices",
      type: 'GET'
  });
}

function handleDropdown (dropdownData) {
  $('#select_device').ddslick({
    data: dropdownData,
    width: "100%",
    background: "#FFF",
    selectText: "Select your sensor device...",
    imagePosition:"left",
    onSelected: function(selectedData){
      $('#grow_api_location').val(selectedData.selectedData.value);
      $('#select_device').css( "border", "none");
    }   
  });
}

function handleCreate (e) {
    if ($('#step_one').css('display') != 'none' ){
      e.preventDefault();
      getChartData($('#grow_api_location').val()).done(function (data) {
        getSuggestedData($('#grow_description').val());
        $('input[name="commit"]').val("Add to My Gardens");
        $('#step_one').slideUp("fast");
        $('#step_two').slideDown("fast");
      }).fail(function (data) {
        $('#select_device').css( "border", "solid 1px #ff0000");
      });
      if($('#grow_name').val()==""){
        $('#grow_name').css( "border", "solid 1px #ff0000");
      }
      if($('#grow_description').val()==""){
        $('#grow_description').css( "border", "solid 1px #ff0000");
      }
    }
    else{
      $('#new_grow').unbind('submit').submit()
    }
}

function getSuggestedData (text) {
  $.ajax({
    data: { description: text },
    url: "suggested_data",
    success:function(data) {
      if(data['hum_high'] != null){
        $("#humidity_slider").val([data['hum_low'], data['hum_high']]);
        $("#temperature_slider").val([data['temp_low'], data['temp_high']]);
      }
    }
  });
}

function horizontalValueSliderInit () {
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
    url:  address+"/current.json",
    success:function(data) {
      $("#current_temp").text(data['temperature'].toFixed(1)+"°C");
      $("#current_hum").text(data['humidity'].toFixed(1)+"%");
    }
  });
}

function getChartData(address) {
    return $.ajax({
        url : address+"/statuses.json",
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

function displaySearchResults() {
  $("#search-results").html("<h4>Searching, please wait... <i class='fa fa-cog fa-spin fa-2x'></i></h4>");
  $.ajax({
        url : "https://api.import.io/store/data/e3cdc2f9-0f3a-4c5b-b24e-55b55f61ea3e/_query?input/webpage/url=https%3A%2F%2Fwww.rhs.org.uk%2FPlants%2FSearch-Results%3Fform-mode%3Dtrue%26context%3Dl%253Den%2526q%253Dstrawberry%2526sl%253DplantForm%26query%3D"+
          encodeURIComponent($("#search-input").val())
        +"&_user=66e71c7a-dcc8-48b5-b4eb-17caded5898a&_apikey=66e71c7adcc848b5b4eb17caded5898ad1545e5535c6ce33bc47185159ca7a7515786eaecf3c72a47ce7f0e987ce4c323b118d4f51297c048bc9b976915f8b4dfba3ac214a3768beb6df68b72c0a86cf",
        type: 'GET'
    }).success(
      function (data) {
        if(data.results.length<1){
          $("#search-results").html("<h4>Sorry, but nothing matched your search...</h4>");
        }else{
          array = $.map( data.results, function(plant, index ) {
            //Remove unused arrays
            if(Object.prototype.toString.call(plant.image) === '[object Array]'){
              return;
            }
            var name = plant.name;
            if(plant['image/_alt']!=undefined){
              name = plant['image/_alt'].charAt(0).toUpperCase()+plant['image/_alt'].substring(1);
            }
            var location=plant.location.substring(0, plant.location.indexOf("?returnurl"));
            return { text: name, value: location, description: plant.name, imageSrc: plant.image };
          });
          $("#search-results").ddslick('destroy');
          $("#search-results").empty();
          $("#search-results").ddslick({
            data: array,
            width: "100%",
            background: "#FFF",
            selectText: "Select your plant",
            imagePosition:"left",
            onSelected: function(selectedData){
              $('#grow_description').val(selectedData.selectedData.text);
              $('#grow_latin').val(selectedData.selectedData.description);
              $('#grow_info_link').val(selectedData.selectedData.value);
              $('#grow_image_url').val(selectedData.selectedData.imageSrc);
              $('#search-controls').slideDown("fast");
            }   
          });
        }
      }
    ).fail(function () {
      $("#search-results").html("<h4>Sorry, but search has failed...</h4>");
    });
}

function handleTips() {
  $("#display-tips").on("click", function () {
    $("#tips").slideDown("slow");
    $("#schedule").slideUp("fast");
    $.ajax({
      url: "https://api.import.io/store/data/f07831b6-a9c2-44f0-adbc-46a705f94bb6/_query?input/webpage/url="+
        encodeURIComponent($("#info_link").attr('href'))
      +"&_user=66e71c7a-dcc8-48b5-b4eb-17caded5898a&_apikey=66e71c7adcc848b5b4eb17caded5898ad1545e5535c6ce33bc47185159ca7a7515786eaecf3c72a47ce7f0e987ce4c323b118d4f51297c048bc9b976915f8b4dfba3ac214a3768beb6df68b72c0a86cf"
    }).success(function (data) {
      $("#tips").html(data.results[0].how_to[0]+data.results[0].how_to[1]);
      $("#display-tips").slideUp("fast");
      $("#tips").append("<div class='center'><a id='close-tips' style='width=100%'>close tips</a></div>");
      $("#close-tips").on("click", function () {
        $("#display-tips").slideDown("fast");
        $("#tips").slideUp("fast");
        $("#schedule").slideDown("slow");
      });
    }).fail(function () {
      $("#tips").html("<h4>Sorry, but error occured...</h4>");
    });
  });
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
