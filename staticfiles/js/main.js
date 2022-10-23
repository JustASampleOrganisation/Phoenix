function ShowModal1 () {
document.getElementById("modal1").setAttribute("style", "visibility: visible");

  }
function ShowModal2 () {
    document.getElementById("popup2").setAttribute("style", "visibility: visible");
}
function Hidemodal1() {
   document.getElementById("modal1").setAttribute("style", "visibility: hidden");
    }

function Hidemodal2() {
    document.getElementById("popup2").setAttribute("style", "visibility: hidden");
};
function HideSort() {
    document.getElementById("modal1").setAttribute("style", "visibility: hidden");
    var model = document.getElementById("model").innerText;
    var mods = document.getElementById("mods").innerText;
    var cilindr = document.getElementById("cilindr").innerText;
    var type = document.getElementById("type").innerText;
    console.log("Volvo " + model + " " + mods + " " + cilindr + " " + type);
    document.getElementById("user_auto").innerHTML = "Volvo " + model + " " + mods + " " + cilindr + " " + type;

};


function Forward() {
    var road = parseFloat(document.getElementById('road').value);
    console.log(road);
    var speed = parseFloat(document.getElementById('speed').value);
    console.log(speed);
    var fuel_price = parseFloat(document.getElementById('fuel_price').value);
    console.log(fuel_price);

    var cilindr = parseFloat(document.getElementById('cilindr').innerText);
    console.log(cilindr);

    var Vbak = parseFloat(document.getElementById('Vbak').innerText);
    console.log(Vbak);
    if (document.querySelector("#human").classList.contains("switch-on")) {
    var D1 = 15;}
    else {
    var D1 = 0;
    };
    if (document.querySelector("#weather").classList.contains("switch-on")) {
    var D2 = 15;
    }
    else {
    var D2 = 0;
    };
    if (parseFloat(cilindr) < 1.4) {
    var Khs = 1.24
    }
    else if (parseFloat(cilindr) < 2.0, parseFloat(cilindr) > 1.4) {
    var Khs = 1.15

    }
    else if (parseFloat(cilindr) >= 2.0) {
    var Khs = 1.07
    };
    var rashod = parseFloat(document.getElementById('rashod').innerText);
    var fuel = Math.floor(parseFloat((0.01 * parseFloat(rashod) * parseFloat(road) *(1+0.01*(Khs+D1+D2)))));
    var time = parseFloat(parseFloat(road)*60 / speed);
    var refuels = Math.floor(parseFloat(parseFloat(fuel)/ parseFloat(Vbak) ));
    var fp = Math.floor(fuel * parseInt(fuel_price));
    var drive_hours = Math.floor(time / 60);
 	var drive_mins = Math.floor(time - drive_hours * 60);
 	var total_hours = Math.floor(time / 60);
 	var total_mins = Math.floor(time - total_hours * 60);
    console.log(road, speed, 'Время за рулем, ч: '+ drive_hours + ' ч. ' + drive_mins +' минут\nОбщее время в пути, ч: ' + total_hours +' ч. ' + total_mins + ' минут\n Количество дозааправок: ' + refuels + '\n Израсходовано топлива, л: ' + fuel +'\nСтоимость топлива, р: ' + fp);
    document.getElementById('rashod_output').innerHTML  = fuel + " л.";
    document.getElementById('time_output').innerHTML = total_hours + ' ч. ' + total_mins + " м.";
    document.getElementById('zapravok_output').innerHTML = refuels;
    document.getElementById('price_output').innerHTML = fp + " р.";
        }




$(function () {
   $("html,body").animate({scrollTop: $(app).offset().top}, 1000);
   console.log('ok');

});
    $('.switch-btn').click(function(){
        $(this).toggleClass('switch-on');
    });

   $('.popup_choice').on('change', function() {
  $(this.form).submit();
});

   $('.popup_choice1').on('change', function() {
  $(this.form).submit();
});

   
    



    async function get_value() {

    let res = await eel.output_input(word='lolololololol')();
    document.getElementById('output').innerHTML = res;


    }

function init () {
    // Создаем модель мультимаршрута.


        // Создаём выпадающий список для выбора типа маршрута.



    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
            center: [55.750625, 37.626],
            zoom: 13,
            controls: [ 'geolocationControl', 'routePanelControl']
        }, {
            buttonMaxWidth: 300
        });
    var control = myMap.controls.get('routePanelControl');

 // Получение объекта, описывающего построенные маршруты.
 var multiRoutePromise = control.routePanel.getRouteAsync();
  multiRoutePromise.then(function(multiRoute) {
    //  Подписка на событие получения данных маршрута от сервера.
    multiRoute.model.events.add('requestsuccess', function() {
      // Ссылка на активный маршрут.
      var activeRoute = multiRoute.getActiveRoute();
      if (activeRoute) {
        // Вывод информации об активном маршруте.
        console.log("Длина: " + activeRoute.properties.get("distance").text);
        console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
      }
    });
    multiRoute.options.set({
      // Цвет метки начальной точки.
      wayPointStartIconFillColor: "#B3B3B3",
      // Цвет метки конечной точки.
      wayPointFinishIconFillColor: "blue",
      // Внешний вид линий (для всех маршрутов).
      routeStrokeColor: "00FF00"
    });
  }, function (err) {
    console.log(err);
  });
    control.routePanel.options.set({
    // Типы маршрутизации, которые будут доступны
    // для выбора пользователям.
    // В примере можно построить
    // автомобильный маршрут с вызовом такси и пешеходный маршрут.
    // При использовании CSP, убедитесь что у вас подключена последняя версия правил.
    // В противном случае, маршрутизация с типом "taxi" не будет работать.
    types: {
        'auto': true
    }
});
    // Зададим координаты пункта отправления с помощью геолокации.
    control.routePanel.geolocate('from');

    // Откроем панель для построения маршрутов.
    control.state.set('expanded', true);
        // Создаем на основе существующей модели мультимаршрут.
        multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
            // Путевые точки можно перетаскивать.
            // Маршрут при этом будет перестраиваться.
            wayPointDraggable: true,
            boundsAutoApply: true
        });
        control.routePanel.state.set({
    // Список всех настроек см. в справочнике.
    // Тип маршрутизации, который будет использоваться по умолчанию.
    type: "auto", // пешком

});
        ymaps.modules.require([
        'MultiRouteCustomView'
    ], function (MultiRouteCustomView) {
        // Создаем экземпляр текстового отображения модели мультимаршрута.
        // см. файл custom_view.js
        new MultiRouteCustomView(multiRoute);
    });
    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    function changeRoutingMode(routingMode, targetItem) {
        multiRouteModel.setParams({ routingMode: routingMode }, true);

        // Отменяем выбор элементов.
        autoRouteItem.deselect();
        masstransitRouteItem.deselect();
        pedestrianRouteItem.deselect();

        // Выбираем элемент и закрываем список.
        targetItem.select();
        routeTypeSelector.collapse();
    }
    // Сравним положение, вычисленное по ip пользователя и
    // положение, вычисленное средствами браузера.
    geolocation.get({
        provider: 'yandex',
        mapStateAutoApply: true
    }).then(function (result) {
        // Красным цветом пометим положение, вычисленное через ip.
        result.geoObjects.options.set('preset', 'islands#redCircleIcon');
        result.geoObjects.get(0).properties.set({
            balloonContentBody: 'Мое местоположение'
        });
        myMap.geoObjects.add(result.geoObjects);
    });

    geolocation.get({
        provider: 'browser',
        mapStateAutoApply: true
    }).then(function (result) {
        // Синим цветом пометим положение, полученное через браузер.
        // Если браузер не поддерживает эту функциональность, метка не будет добавлена на карту.
        result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
        myMap.geoObjects.add(result.geoObjects);
    });
}

ymaps.ready(init);