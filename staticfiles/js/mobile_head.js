function init () {
    var suggestView1 = new ymaps.SuggestView('map-panel-input', {offset: [0, -168]}), map, routePanelControl, addFrom, addTo;
    var location = ymaps.geolocation;
    var sv = new ymaps.SuggestView('map-panel-input-2');
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
          from: window.user_geolocate,
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
      $("#map-continue").click( function() {
        if (window.map_step != 2) {
        var point1 = document.getElementById('map-panel-input-2').value;
        var point2 = document.getElementById('map-panel-input').value;
        showRoute(point1, point2); }

    });
};



ymaps.ready(init);


// if ('serviceWorker' in navigator) {
//   // Весь код регистрации у нас асинхронный.
//   navigator.serviceWorker.register('./sw_new.js')
//     .then(() => navigator.serviceWorker.ready.then((worker) => {
//       worker.sync.register('syncdata');
//     }))
//     .catch((err) => console.log(err));
// }
// const initialiseState = (reg) => {
//   if (!reg.showNotification) {
//   showNotAllowed('Showing notifications isn\'t supported ☹️');
//   return
//   }
//   if (Notification.permission === 'denied') {
//   showNotAllowed('You prevented us from showing notifications ☹️');
//   return
//   }
//   if (!'PushManager' in window) {
//   showNotAllowed("Push isn't allowed in your browser ");
//   return
//   }
//   subscribe(reg);
//   }
//   const showNotAllowed = (message) => {
//   const button = document.querySelector('form>button');
//   button.innerHTML = `${message}`;
//   button.setAttribute('disabled', 'true');
//   };

