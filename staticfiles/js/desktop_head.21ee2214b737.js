

function init () {
    var suggestView1 = new ymaps.SuggestView('map-input-from', {width : 285}) 
    var map, routePanelControl, addFrom, addTo;
    var location = ymaps.geolocation;
    var sv = new ymaps.SuggestView('map-input', {width : 285});
    var map = new ymaps.Map('map', {
        center: [55.75399400, 37.62209300],
        zoom: 17,
        controls: []
      })
 // Сравним положение, вычисленное по ip пользователя и
    // положение, вычисленное средствами браузера.

    location.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
      window.user_geolocate = result.geoObjects.position
      console.log(window.user_geolocate)
        map.geoObjects.add(result.geoObjects);
    });
    $('.map-get-geo').click(function () {
        location.get({
            provider: 'browser',
            mapStateAutoApply: true
        }).then(function (result) {
            map.geoObjects.add(result.geoObjects);
        });
    })
        // Создадим панель маршрутизации.
  routePanelControl = new ymaps.control.RoutePanel({
    options: {
      visible : true, 
      position : {left : '-300px'}
    }});
      // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({
        types: {
        auto: true
        }
    });
    // изменяемые точки "откуда" и "куда"
    // routePanelControl.routePanel.state.set({
    //     fromEnabled: true,
    //     toEnabled: true
    // });
    routePanelControl.routePanel.geolocate('from');
    // var multiRoutePromise = routePanelControl.routePanel.getRouteAsync();
    // multiRoutePromise.then(function(multiRoute) {

    //   multiRoute.model.setParams({
    //     results : 2, 
    //     avoidTrafficJams: true
    //   }, true);
    
    map.controls.add(routePanelControl);


    function showRoute(from, to) {
        // https://tech.yandex.ru/maps/jsbox/2.1/deliveryCalculator 
        routePanelControl.routePanel.state.set({
          from: from != '' ? from : window.user_geolocate,
          to: to
        });
        // Получим ссылку на маршрут.
        routePanelControl.routePanel.getRouteAsync().then(function(route) {
          // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
          route.model.setParams({
            results: 3,
            avoidTrafficJams: true
          }, true);
          // Повесим обработчик на событие построения маршрута.
          route.model.events.add('requestsuccess', function(event) {
            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
              var routes = event.get("target").getRoutes();
              var length = routes.length
              console.log("Found routes: " + routes.length);
              console.log(routes[0].properties.get("duration").text.length);
              // получение точки A & Б 
              console.log(event.get("target").getReferencePoints()[0]);
              window.point_a = event.get("target").getJson().features[0].features[0].properties.address;
              window.point_b = event.get("target").getJson().features[0].features[1].properties.address;
               

              if (length == 1) {
                $('#map-panel-output-box-2').css({'display': 'none'});
                $('#map-panel-output-box-3').css({'display': 'none'});
                window.map_distance_1 = routes[0].properties.get("distance").value / 1000;
                if (window.lang == 'rus') {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                }
                else {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                }
                window.map_time_1 = routes[0].properties.get('duration').value / 60;
                document.getElementById('map-output-time-1').innerHTML = routes[0].properties.get("duration").text;
                if (routes[0].properties.get("duration").text.length > 16) {
                  console.log('change fonts');
                  $('#map-output-dist-1').css({
                    'font-size' : "72%"
                  })
                }
                else {
                  $('#map-output-dist-1').css({
                    'font-size' : "84%"
                  })
                }
              }
              else if (length == 3) {
                $('#map-panel-output-box-2').css({'display': 'block'});
                $('#map-panel-output-box-3').css({'display': 'block'});
                arr = [routes[0].properties.get("distance").value / 1000, routes[1].properties.get("distance").value / 1000, routes[2].properties.get("distance").value / 1000];
                min = Math.min.apply(window, arr);
                index = arr.indexOf(min);
                if (routes[0].properties.get("duration").text.length > 16) {
        
                  $('#map-output-dist-1').css({
                    'font-size' : "72%"
                  })
                  $('#map-output-dist-2').css({
                    'font-size' : "72%"
                  })
                  $('#map-output-dist-3').css({
                    'font-size' : "72%"
                  })
                }
                else {
                  $('#map-output-dist-1').css({
                    'font-size' : "84%"
                  })
                  $('#map-output-dist-2').css({
                    'font-size' : "84%"
                  })
                  $('#map-output-dist-3').css({
                    'font-size' : "84%"
                  })
                }
              if (index == 0) {      
              window.map_distance_1 = routes[0].properties.get("distance").value / 1000;
              window.map_distance_2 = routes[1].properties.get("distance").value / 1000;
              window.map_distance_3 = routes[2].properties.get("distance").value / 1000;
              // output in Obox
              if (window.lang == 'rus') {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' км';
              }
              else {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' km';
              }



              window.map_time_1 = routes[0].properties.get('duration').value / 60;
              window.map_time_2 = routes[1].properties.get('duration').value / 60;
              window.map_time_3 = routes[2].properties.get('duration').value / 60;
              document.getElementById('map-output-time-1').innerHTML = routes[0].properties.get("duration").text;
              document.getElementById('map-output-time-2').innerHTML = routes[1].properties.get("duration").text;
              document.getElementById('map-output-time-3').innerHTML = routes[2].properties.get("duration").text;

              }
            else if (index == 1) {
              window.map_distance_1 = routes[1].properties.get("distance").value / 1000;
              window.map_distance_2 = routes[0].properties.get("distance").value / 1000;
              window.map_distance_3 = routes[2].properties.get("distance").value / 1000;
              // output in Obox
              if (window.lang == 'rus') {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' км';
              }
              else{
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' km';
              }



              window.map_time_1 = routes[0].properties.get('duration').value / 60;
              window.map_time_2 = routes[1].properties.get('duration').value / 60;
              window.map_time_3 = routes[2].properties.get('duration').value / 60;
              document.getElementById('map-output-time-1').innerHTML = routes[1].properties.get("duration").text;
              document.getElementById('map-output-time-2').innerHTML = routes[0].properties.get("duration").text;
              document.getElementById('map-output-time-3').innerHTML = routes[2].properties.get("duration").text;

            }
            else if (index == 2) {
              window.map_distance_1 = routes[2].properties.get("distance").value / 1000;
              window.map_distance_2 = routes[0].properties.get("distance").value / 1000;
              window.map_distance_3 = routes[1].properties.get("distance").value / 1000;
              if (window.lang == 'rus') {
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' км';
              }
              else{
                document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[2].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                document.getElementById('map-output-dist-3').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' km';
              }



              window.map_time_1 = routes[0].properties.get('duration').value / 60;
              window.map_time_2 = routes[1].properties.get('duration').value / 60;
              window.map_time_3 = routes[2].properties.get('duration').value / 60;
              document.getElementById('map-output-time-1').innerHTML = routes[2].properties.get("duration").text;
              document.getElementById('map-output-time-2').innerHTML = routes[0].properties.get("duration").text;
              document.getElementById('map-output-time-3').innerHTML = routes[1].properties.get("duration").text;
            }
            }
            else if(length == 2) {
              $('#map-panel-output-box-3').css({'display': 'none'});
              arr = [routes[0].properties.get("distance").value / 1000, routes[1].properties.get("distance").value / 1000]
              min = Math.min.apply(window, arr);
              index = arr.indexOf(min)
              if (routes[0].properties.get("duration").text.length > 16) {
                $('#map-output-dist-1').css({
                  'font-size' : "72%"
                })
                $('#map-output-dist-2').css({
                  'font-size' : "72%"
                })
              }
              else {
                $('#map-output-dist-1').css({
                  'font-size' : "84%"
                })
                $('#map-output-dist-2').css({
                  'font-size' : "84%"
                })
              }
              if (index == 0) {      
                window.map_distance_1 = routes[0].properties.get("distance").value / 1000;
                window.map_distance_2 = routes[1].properties.get("distance").value / 1000;  
                if (window.lang == 'rus') {
                  document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                  document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' км';
                }
                else {
                  document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                  document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' km';
                }

  
  
                window.map_time_1 = routes[0].properties.get('duration').value / 60;
                window.map_time_2 = routes[1].properties.get('duration').value / 60;
                document.getElementById('map-output-time-1').innerHTML = routes[0].properties.get("duration").text;
                document.getElementById('map-output-time-2').innerHTML = routes[1].properties.get("duration").text;
  
                }
              else if (index == 1) {
                
                window.map_distance_1 = routes[1].properties.get("distance").value / 1000;
                window.map_distance_2 = routes[0].properties.get("distance").value / 1000;
                if (window.lang == 'rus') {
                  document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' км';
                  document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' км';
                }
                else {
                  document.getElementById('map-output-dist-1').innerHTML = parseInt(routes[1].properties.get("distance").value / 1000) + ' km';
                  document.getElementById('map-output-dist-2').innerHTML = parseInt(routes[0].properties.get("distance").value / 1000) + ' km';
                }

  
  
                window.map_time_1 = routes[1].properties.get('duration').value / 60;
                window.map_time_2 = routes[0].properties.get('duration').value / 60;
                document.getElementById('map-output-time-1').innerHTML = routes[1].properties.get("duration").text;
                document.getElementById('map-output-time-2').innerHTML = routes[0].properties.get("duration").text;  
              }
            }
          }
          });
        });
      };
      $('#calculate').click(function() {
        if ($('#map-input').val() != '') {
          var point1 = document.getElementById('map-input-from').value;
          var point2 = document.getElementById('map-input').value;
          showRoute(point1, point2);
    $('.step-description').fadeOut();
    if (window.choice_output == 1 || window.choice_output == 2 || window.choice_output == 3) {
      //
      Calculate()
      }

          $('.output-container').fadeIn(3000);
        }
      })


      $("#continue-btn").click( function() {
        if ($('#map-input').val != '') {
        
        var point1 = document.getElementById('map-input-from').value;
        var point2 = document.getElementById('map-input').value;
        showRoute(point1, point2);
        if (window.choice_output == 1 || window.choice_output == 2 || window.choice_output == 3) {
        // 
        Calculate()
        }

        $('.output-container').fadeIn(3000);
        }


    });
};



ymaps.ready(init);


if ('serviceWorker' in navigator) {
  // Весь код регистрации у нас асинхронный.
  navigator.serviceWorker.register('./sw_new.js')
    .then(() => navigator.serviceWorker.ready.then((worker) => {
      worker.sync.register('syncdata');
    }))
    .catch((err) => console.log(err));
}
const initialiseState = (reg) => {
  if (!reg.showNotification) {
  showNotAllowed('Showing notifications isn\'t supported ☹️');
  return
  }
  if (Notification.permission === 'denied') {
  showNotAllowed('You prevented us from showing notifications ☹️');
  return
  }
  if (!'PushManager' in window) {
  showNotAllowed("Push isn't allowed in your browser ");
  return
  }
  subscribe(reg);
  }
  const showNotAllowed = (message) => {
  const button = document.querySelector('form>button');
  button.innerHTML = `${message}`;
  button.setAttribute('disabled', 'true');
  };



  
  function Calculate() {
    // изменение оптимально на выбрано

    document.getElementById('rec').innerHTML = 'Выбрано';
    let choice_output = {
        1 : '34px',
        2 : '162px', 
        3 : '292px'
    }

    for (key in choice_output) {
        if (window.choice_output == key) {
            $('.rec').animate({
                left: choice_output[key],
                top: "347px"
            }) 
        }
    };
    // Вычисление в MapMode 
    var date = new Date();
    window.month = date.getMonth() + 1;
    var fuel_price = parseFloat(document.getElementById('fuel-price').value);
    if (window.month > 9) {
        var D = 15
    }
    else {
        var D = 0;
    }
    var cilindr = parseFloat(localStorage.getItem('v'));
    if (parseFloat(cilindr) < 1.4) {
    var Khs = 1.24
     }
else if (parseFloat(cilindr) < 2.0, parseFloat(cilindr) > 1.4) {
var Khs = 1.15

    }
else if (parseFloat(cilindr) >= 2.0) {
    var Khs = 1.07
        };
        [1, 2, 3].forEach(function(i, number, arr){
            var rashod = parseFloat(localStorage.getItem('rashod'));
            if (window.choice_output == i) {
            var fuel = parseFloat((0.01 * parseFloat(rashod) * parseFloat(((i == 1) ? window.map_distance_1 : (i == 2) ? window.map_distance_2 : (i == 3) ? window.map_distance_3 : window.map_distance_1)) *(1+0.01*(Khs+D)))).toFixed(2);
            var fp = parseFloat(fuel * parseFloat(fuel_price)).toFixed(2);
            var total_hours = Math.floor(((i == 1) ? window.map_distance_1 : (i == 2) ? window.map_distance_2 : (i == 3) ? window.map_distance_3 : window.map_distance_1) / 60);
            var total_mins = Math.floor(((i == 1) ? window.map_distance_1 : (i == 2) ? window.map_distance_2 : (i == 3) ? window.map_distance_3 : window.map_distance_1) - total_hours * 60);  
            var auto = localStorage.getItem('mark') + " " + localStorage.getItem('model') + localStorage.getItem('mods');
            // var url =  "/api/set-log?auto=" + auto + '&point_a=' + window.point_a + "&point_b=" + window.point_b + "&time_road=" + window.map_time_1 + "&fuel=" + fuel + '&price=' + fp
            // if (window.logs) {
            // $.ajax({
            //     type: "GET",
            //     url: url,
            //     dataType: 'json',
            //     success: function(data){
            //             console.log('save auto');}
            //     });    
            // }
            if (total_hours != 0) {
                document.getElementById('output-time').innerHTML = total_hours + ' ч ' + total_mins + ' мин';
            }
            else {
                document.getElementById('output-time').innerHTML = total_mins + ' мин';

            }
            document.getElementById('output-fuel').innerHTML = fuel + ' л';
            document.getElementById('output-price').innerHTML = "₽"+ fp;
        };
    });
 };