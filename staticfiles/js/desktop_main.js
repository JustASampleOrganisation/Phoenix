$(document).ready(function () {
        window.mode = 'map';
        window.human_condition = true;
        window.lang = 'rus';
        if (!localStorage.getItem('light-mode' ) && !localStorage.getItem("dark-mode")) {
            // 
        }
        else if (localStorage.getItem('light-mode') == 'true') {
            SwitchLight(start=true)
            $('.another-settings-theme-box-btn').animate({
                left: '115px',
                width: '116.97px'
            }, 'fast')
        }
        else if (localStorage.getItem('dark-mode') == 'true') {
            SwitchDark()
            $('.another-settings-theme-box-btn').animate({
                left: '229px',
                width: '109.97px'
            }, 'fast')
        }
        $.ajax({
            type: "POST",
            url: "/api/get-mark",
            dataType: 'json',
            headers:{
                "X-CSRFToken": csrf_token
            },
            success: function(data){
                marks = data['marks']
                for (i=0; i<=marks.length; i++){
                        $("#mark-select").append('<option value="'+ marks[i]['mark'] +'">'+marks[i]['mark']+'</option>');
            
            
            }
            },
            error: function() {
                console.log('error ajax');
            }
            });
            $("body").on("contextmenu",function(e){
                return false;
            });


            let selected_auto = localStorage.getItem('selected_auto');

            if (selected_auto == 'true') {
                $("#mark-select option[value='"+localStorage.getItem('mark')+"']").remove();
                $("#mark-select").prepend('<option value="'+ localStorage.getItem('mark') +'">'+localStorage.getItem('mark')+'</option>');
                $("#mark-select :contains("+localStorage.getItem('mark')+")").attr("selected", "selected"); 
                // 
                $("#model-select").prepend('<option value="'+ localStorage.getItem('model') +'">'+localStorage.getItem('model')+'</option>');
                $("#model-select :contains("+localStorage.getItem('model')+")").attr("selected", "selected"); 
                // 
                $("#gen-select").prepend('<option value="'+ localStorage.getItem('gen') +'">'+localStorage.getItem('gen')+'</option>');
                $("#gen-select :contains("+localStorage.getItem('gen')+")").attr("selected", "selected"); 
                // 
                $("#mod-select").prepend('<option value="'+ localStorage.getItem('mods') +'">'+localStorage.getItem('mods')+'</option>');
                $("#mod-select :contains("+localStorage.getItem('mods')+")").attr("selected", "selected"); 
            }
});







$('#switch-human-left').click(function (e) { 
    if (window.human_condition) {
        $('.switch-box').animate({
            right: '180px'
        }, 'fast', 'linear')
        window.human_condition = false;
    }
    
});

$('#switch-human-right').click(function() {
    $('.switch-box').animate({
        right: "2px"
    }, 'fast', 'linear');
    window.human_condition = true;
})

$('#continue-btn').click(function (e) { 
    $('.step-description').fadeOut();
    
});


// очистка всех элемнтов
$('#clear').click(function() {
    $('.output-container').fadeOut();
    $('.step-description').fadeIn();
    $('#fuel-price').val('');
    $('#map-input').val('');
    $('#map-input-from').val('');
    document.getElementById('rec').innerHTML = 'Оптимально';
    document.getElementById('output-fuel').innerHTML = '00.00 л';
    document.getElementById('output-time').innerHTML = '0 мин';
    document.getElementById('output-price').innerHTML = '₽00.00';
    $('.rec').animate({
        left: "34px",
        top: "347px"
    });
    $('.output-box').find('span').css({
        'color' : '#000'
    })



} )




// открытие-закрытие настроек
$('.choice-menu-box-s').click(function (e) { 
    $('#settings-go-car-choice').toggleClass('active');
    $('#choice-auto-btn').toggleClass('active');
    $('.settings-box').toggle(300);
    
});






$('body').on('input', 'input[type="number"][maxlength]', function(){
	if (this.value.length > this.maxLength){
		this.value = this.value.slice(0, this.maxLength);
	}
});

//  когда-нибудь я оптимизирую это
// let select_change = {
//     'mark' : 'model', 
//     'model' : 'gen', 
//     'gen' : 'mod'
// }

// let select_option =  {
//     'model' : 'Модель',
//     'gen' : 'Поколение',  
//     'mod' : 'Модификация'
// }

// ['mark', 'model', 'gen', 'mod'].forEach(function(i, number, arr){
//     $("#"+i+'-select').change(function() {
//         if (i != 'mod') {
//         for (key in select_change) {
//             if (key == i) {
//             $('#'+key+'-select').empty();
//             }
//         }
//         // $('#' + ((i == 'mark') ? 'model' : (i == 'model') ? 'gen' : (i == 'gen') ? 'mod' : 'model')+ '-select').empty();
//         // $('#' + ((i == 'mark') ? 'model' : (i == 'model') ? 'gen' : (i == 'gen') ? 'mod' : 'model')+ '-select').append(('<option>'+(i == 'mark') ? 'model' : (i == 'model') ? 'gen' : (i == 'gen') ? 'mod' : 'model') + '/option');
//         }
//         if (i != 'mark') {
//             for (key in select_option) {
//                 if (key == i) {
//                     $("#"+key+'-select').append('<option value="'+ select_option[key] +'">'+ select_option[key] +'</option>');
//                 }
//             }
//         }
//         var mark = document.getElementById('mark-select').value;
//         var model = document.getElementById('model-select').value;
//         var gen = document.getElementById('gen-select').value;
//         var mod = document.getElementById('mod-select').value;
//         var url = (i == 'mod') ? '/api/get-config?mark=' + mark + '&model=' + model + '&gen=' + gen + '&mod=' + mod : (i == 'mark') ? '/api/get-model?mark=' + mark : (i == 'model') ? '/api/get-gen?mark=' + mark + '&model=' + model : (i == 'gen') ? '/api/get-mod?mark=' + mark + '&model=' + model + '&gen=' + gen : '';
//         $.ajax({
//             type: "POST",
//             url: url,
//             dataType: 'json',
//             data: {mark : mark},
//             headers:{
//                 "X-CSRFToken": csrf_token
//             },
//             success: function(data){
//                 console.log(data['models'])
//                 models = data['models'];
//                 for (i=0; i<=models.length; i++)
//                 {
//                     $("#"+i+'-select').append('<option value="'+ models[i]['model'] +'">'+models[i]['model']+'</option>');
    
//                 }
//             },
//             error: function() {
//                 console.log('error ajax');
//             }
//         })
//     })
// })


// Выборка авто пользователя
$('#mark-select').change(function() {
    $("#model-select").empty();
    $("#model-select").append('<option value="Модель">Модель</option>');
    var mark = document.getElementById('mark-select').value;
    var url = '/api/get-model?mark=' + mark;
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: {mark : mark},
        headers:{
            "X-CSRFToken": csrf_token
        },
        success: function(data){
            console.log(data['models'])
            models = data['models'];
            for (i=0; i<=models.length; i++)
            {
                $("#model-select").append('<option value="'+ models[i]['model'] +'">'+models[i]['model']+'</option>');

            }
        },
        error: function() {
            console.log('error ajax');
        }
    })
});


$('#model-select').change(function() {
    $("#gen-select").empty();
    $("#gen-select").append('<option value="Поколение">Поколение</option>');
    var mark = document.getElementById('mark-select').value;
    var model = document.getElementById('model-select').value;
    var url = '/api/get-gen?mark=' + mark + '&model=' + model;
    console.log(url);
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data : {mark: mark, model: model}, 
        headers:{
            "X-CSRFToken": csrf_token
        },
        success: function(data){
            console.log(data['gen'])
            gen = data['gen'];
            for (i=0; i<=gen.length; i++)
            {
                // console.log(gen[i].gen);
                $("#gen-select").append('<option value="'+ gen[i]['gen'] +'">'+gen[i]['gen']+'</option>');

            }
        },
        error: function() {
            console.log('error ajax');
        }
    })
});

$('#gen-select').change(function() {
    $("#mod-select").empty();
    $("#mod-select").append('<option value="Модификация">Модификация</option>');
    var mark = document.getElementById('mark-select').value;
    var model = document.getElementById('model-select').value;
    var gen = document.getElementById('gen-select').value;
    var url = '/api/get-mod?mark=' + mark + '&model=' + model + '&gen=' + gen;
    
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data : {mark: mark, model: model, gen: gen}, 
        headers:{
            "X-CSRFToken": csrf_token
        },
        success: function(data){
            console.log(data['mod'])
            mod = data['mod'];
            for (i=0; i<=mod.length; i++)
            {
                console.log(mod[i]['mod']);
                $("#mod-select").append('<option value="'+ mod[i]['mod'] +'">'+mod[i]['mod']+'</option>');

            }
        },
        error: function() {
            console.log('error ajax');
        }
    })
});

$('#mod-select').change(function() {
    var mark = document.getElementById('mark-select').value;
    var model = document.getElementById('model-select').value;
    var gen = document.getElementById('gen-select').value;
    var mod = document.getElementById('mod-select').value;
    var url = '/api/get-config?mark=' + mark + '&model=' + model + '&gen=' + gen + '&mod=' + mod;
    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data : {mark: mark, model: model, gen: gen, mod: mod}, 
        headers:{
            "X-CSRFToken": csrf_token
        },
        success: function(data){
            console.log(data['config'][0])
            data = data['config'][0]
            SetAuto(data);
        },
        error: function() {
            console.log('error ajax');
        }
    })
});


// функция установки значения авто пользователя.
function SetAuto(data) {
    let for_items = ['mark', 'model', 'mods', 'power', 'v', 'rashod', 'gen', 'selected_auto'];
    for_items.forEach(function(i, number, arr) {
        switch (i) {
            case 'mods':
                localStorage.setItem('mods', data['mod'])
                break;
            case 'selected_auto':
                localStorage.setItem('selected_auto', true)
                break;

            default:
                localStorage.setItem(i, data[i])
                break;
        }    
    });
};




// смена цветов в боксах выбора меню настроек.
$('.settings-choice-box').click(function (e) { 
    $('.car-choice').fadeOut('fast');
    $('.another-settings').fadeOut('fast');
    $('.settings-choice-box').removeClass('active');
    $(this).toggleClass('active');
    if (localStorage.getItem('light-mode') == 'true' || localStorage.getItem('dark-mode') == 'false') {
    $('.settings-choice-box').find('span').css('color', '#000000');
    $(this).find('span').css('color', '#ffff');
    }
    $('.' + this.id.substr(12)).fadeIn();
});





// Отслеживание клика на боксы с выходным значением в MapMode.

[1, 2, 3].forEach(function(i, number, arr) {
    $('#map-panel-output-box-' + i).click(function() {
        if ($('#fuel-price').val() != '') {
            $('.output-box').find('span').css({
                'color' : '#000'
            })
            $(this).find('span').css({
                'color' : '#007AFF'
            })
            window.choice_output = i;
            Calculate()
            }
            else {
                $("#fuel-price").effect("shake", {distance: 10});
            }
    })
});


// расчёт данных
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
           
           
            // отправка логов на сервер 


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
// 
$('#send-cal-data').click(function (e) { 
    $('.send-btn').animate({
        left: '0px'
    }, 'fast' )
 });
 $('#d-send-cal-data').click(function (e) { 
     $('.send-btn').animate({
         left: '169px'
     }, 'fast' )
  });

$('.another-settings-theme-box-system').click(function (e) { 
    $('.another-settings-theme-box-btn').animate({
        left: '0px',
        width: '118.97px'
    }, 'fast');
    SwitchLight();
    $('.settings-choice-box').find('span').css('color', '#000000');
    $('#settings-go-another-settings').find('span').css('color', '#ffffff');
    localStorage.setItem("light-mode", 'false');
    localStorage.setItem('dark-mode', 'false');
    
});
// кнопка смены на светлую тему
$('#switch-light').click(function (e) { 
    $('.another-settings-theme-box-btn').animate({
        left: '115px',
        width: '116.97px'
    }, 'fast')    
});

// коробка смены на темную тему 
$('.another-settings-theme-box-dark').click(function (e) { 
    $('.another-settings-theme-box-btn').animate({
        left: '229px',
        width: '109.97px'
    }, 'fast')
    
});

// закрытие настроёк. кнопка "Готово"
$('#close-settings-btn').click(function (e) { 
    $('#settings-go-car-choice').toggleClass('active');
    $('#choice-auto-btn').toggleClass('active');
    $('.settings-box').toggle(300);

});
// смена сезона
$('#switch-season-left').click(function (e) { 
    if (window.human_condition) {
        $('#switch-box-season').animate({
            right: '180px'
        }, 'fast', 'linear')
        window.human_condition = false;
    }
    
});

$('#switch-season-right').click(function() {

    $('#switch-box-season').animate({
        right: "2px"
    }, 'fast', 'linear');
    window.human_condition = true;
})
// смена кол-ва населения
$('#switch-human-left-hand').click(function (e) { 
    if (window.human_condition) {
        $('#switch-box-human').animate({
            right: '180px'
        }, 'fast', 'linear')
        window.human_condition = false;
    }
    
});

$('#switch-human-right-hand').click(function() {

    $('#switch-box-human').animate({
        right: "2px"
    }, 'fast', 'linear');
    window.human_condition = true;
})

// смена режима Hand-Map Mode
$("#switch-mode").click(function (e) { 
    if (window.mode == 'map') {
        $('.map-cal-box').fadeOut();
       document.getElementById('switch-mode-text').innerHTML = 'Карта';
        $('.hand-calc-box').fadeIn();
        window.mode = 'hand';
    }
    else {
        $('.hand-calc-box').fadeOut();
       document.getElementById('switch-mode-text').innerHTML = 'Ручной режим';
       $('.map-cal-box').fadeIn();
       window.mode = 'map';


    }
    
});
// сменяем тему на dark
$('#switch-dark').click(function () {         
    SwitchDark()
    
});

// сменяем тему на light
$('#switch-light').click(function() {
    SwitchLight()
});


function SwitchDark() {
    // 

    localStorage.setItem('dark-mode', 'true');
    localStorage.setItem('light-mode', 'false');
    $('.parent-box').css( 'background', '#1C1C1E' );
    $('.choice-menu-box').css( 'background', '#3A3A3C' );
    $('.choice-menu-box-caption').css( 'color', '#FFFFFF' );
    $('.choice-menu-box-s').css( 'background', '#3A3A3C' );
    $('.choice-menu-box-s-caption').css( 'color', '#FFFFFF' );
    $('.geo-input-box').css( 'background', '#2C2C2E' );
    $('#fuel-price-caption').css( 'color', '#FFFFFF' );
    $('.switch-box').css( 'background', '#636366' );
    $('#switch-human-left').css( 'color', '#FFFFFF' );
    $('#switch-human-right').css( 'color', '#FFFFFF' );
    $('.separator').css( 'border', '0.5px solid #3A3A3C');
    $('.output-box').css( 'background', '#3A3A3C' );
    $('.output-dist').css( 'color', '#FFFFFF' );
    $('.output-time').css( 'color', '#FFFFFF' );
    $('#step-description-text').css( 'color', '#FFFFFF' );
    $('.btn').css( 'background', '#0A84FF' );
    $('.output').css( 'color', '#FFFFFF' );
    $('.output-caption').css( 'color', '#AEAEB2' );
    $('.hand-calc-box-s').css({ 'background': '#3A3A3C', 'border' : '1px solid #2C2C2E' });
    $('#switch-human-left-hand').css( 'color', '#FFFFFF' );
    $('#switch-human-right-hand').css( 'color', '#FFFFFF' );
    $('#switch-season-left').css( 'color', '#FFFFFF' );
    $('#switch-season-right').css( 'color', '#FFFFFF' );
    $('.settings-box').css( 'background',  'linear-gradient(90deg, #2C2C2E  34%,  #1C1C1E 25%)' );
    $('.another-settings-title').css( 'color', '#FFFFFF' );
    $('.another-settings-theme').css( 'color', '#FFFFFF' );
    $('.another-settings-theme-box-btn').css( 'background', '#636366' );
    $('.another-settings-theme-box').css( 'background', '#2C2C2E' );
    $('.another-settings-theme-box-system').css( 'color', '#FFFFFF' );
    $('.another-settings-theme-box-light').css( 'color', '#FFFFFF' );
    $('.another-settings-theme-box-dark').css( 'color', '#FFFFFF' );
    $('.send-btn').css( 'background', '#636366' );
    $('.language-select-box').css( 'background', '#2C2C2E' );
    $('#switch-lang').css( 'color', '#FFFFFF' );
    $('#switch-lang option').css({ 'background': "#636366", 'color': '#000000' });
    $('.settings-choice-box-caption').css( 'color', '#FFFFFF' );
    $('.settings-title').css( 'color', '#FFFFFF' );
    $('.settings-choice-box').css( "border-bottom", "1px solid #3A3A3C" );
    $('.select-box').css( 'background', '#2C2C2E' );
    $('.br-b-s').css( "border-bottom", '1px solid #3A3A3C');
    $('.select-box-select option').css({ 'background': "#636366", 'color': '#000000' });
    $('.select-box-select select').css('color', '#FFFFFF' );
    $('.car-choice-title').css( 'color', '#FFFFFF' );
    $('.hand-calc-box-s').css( 'color', '#FFFFFF' );
    $('.geo-input-box input').css('color', '#7F7F85')
}


function SwitchLight(start=false) {
    // 

    localStorage.setItem('light-mode', 'true');
    localStorage.setItem('dark-mode', 'false');
    $('.parent-box').css( 'background', '#FFFFFF' );
    $('.choice-menu-box').css( 'background', '#F2F2F7' );
    $('.choice-menu-box-caption').css( 'color', '#000000' );
    $('.choice-menu-box-s').css( 'background', '#F2F2F7' );
    $('.choice-menu-box-s-caption').css( 'color', '#000000' );
    $('.geo-input-box').css( 'background', '#F2F2F7' );
    $('#fuel-price-caption').css( 'color', '#000000' );
    $('.switch-box').css( 'background', '#FFFFFF' );
    $('#switch-human-left').css( 'color', '#000000' );
    $('#switch-human-right').css( 'color', '#000000' );
    $('.separator').css( 'border', '0.5px solid #C6C6C8');
    $('.output-box').css( 'background', '#F2F2F7' );
    $('.output-dist').css( 'color', '#000000' );
    $('.output-time').css( 'color', '#000000' );
    $('#step-description-text').css( 'color', '#000000' );
    $('.btn').css( 'background', '#007AFF' );
    $('.output').css( 'color', '#3C3C43' );
    $('.output-caption').css( 'color', '#3C3C43' );
    $('.hand-calc-box-s').css({ 'background': '#F2F2F7', 'border' : '1px solid #FFFFFF' });
    $('#switch-human-left-hand').css( 'color', '#000000' );
    $('#switch-human-right-hand').css( 'color', '#000000' );
    $('#switch-season-left').css( 'color', '#000000' );
    $('#switch-season-right').css( 'color', '#000000' );
    $('.settings-box').css( 'background',  'linear-gradient(90deg, #F2F2F7  34%,  #FFFFFF 25%)' );
    $('.another-settings-title').css( 'color', '#000000' );
    $('.another-settings-theme').css( 'color', '#000000' );
    $('.another-settings-theme-box-btn').css( 'background', '#FFFFFF' );
    $('.another-settings-theme-box').css( 'background', 'rgba(60, 60, 67, 0.05)' );
    $('.another-settings-theme-box-system').css( 'color', '#3D3D3D' );
    $('.another-settings-theme-box-light').css( 'color', '#3D3D3D' );
    $('.another-settings-theme-box-dark').css( 'color', '#3D3D3D' );
    $('.send-btn').css( 'background', '#FFFFFF' );
    $('.language-select-box').css( 'background', '#f2f2f7' );
    $('#switch-lang').css( 'color', '#000000' );
    $('#switch-lang option').css({ 'background': "#ffffff", 'color': '#000000' });
    $('.settings-title').css( 'color', '#000000' );
    $('.settings-choice-box').css( "border-bottom", "1px solid #C6C6C8" );
    if (start == false) {
        $('.settings-choice-box').find('span').css('color', '#000000');
        $('.settings-choice-box-caption').removeClass('active');
        $('#settings-go-another-settings').find('span').css('color', '#ffffff');
    }
    $('.select-box').css( 'background', '#F2F2F7' );
    $('.br-b-s').css( "border-bottom", '1px solid #C6C6C8');
    $('.select-box-select option').css({ 'background': "#ffff", 'color': '#000000' });
    $('.select-box-select select').css('color', '#000' );
    $('.car-choice-title').css( 'color', '#000000' );
    $('.hand-calc-box-s').css( 'color', '#000000' );
    $('.active ').css('color', '#ffff');
    $('.geo-input-box input').css('color', '#000000')


};



// изменение "Мое местоположение" на пользовательский пункт
$('#my-location').click(function () {
    $('#map-input-from').prop('disabled', false);
});