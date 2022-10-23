$(document).ready(function() {
    if (!localStorage.getItem('first_page')) {
        window.start_page = true
        $('#map').css({'opacity': '0'});
        $('#map-panel').css({'opacity' : '0'});
        $('.map-get-geo').css({'opacity' : '0'});
        $('.start-page').css({'opacity' : '1'});

    }
    else {
        $(".start-page").detach()
    }

    if (!localStorage.getItem('logs')) {
        localStorage.setItem('logs', 'true')
        window.logs = true;
    }
    else {
       var logs =  localStorage.getItem('logs');
       if (logs == 'true') {
        $("#log-select :contains('Отправлять')").attr("selected", "selected"); 
        window.logs = true;

       }
       else {
        $("#log-select :contains('Не отправлять')").attr("selected", "selected"); 
        window.logs = false;
       }
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
    console.log(marks);
    for (i=0; i<=marks.length; i++){
            $("#mark-select").append('<option value="'+ marks[i]['mark'] +'">'+marks[i]['mark']+'</option>');


}
},
error: function() {
    console.log('error ajax');
}
});



window.close = true;
window.map_mode = true;
window.settings_mode = false;
window.hand_mode = false;
window.condition_weather = true;
window.condition_human = true;
window.map_step = 0;
$('.settings').css({'display': 'none'});
$('.hand-mode').css({'display': 'none'});
$('#map-caption').css({'color' : '#007AFF'});
selected_auto = localStorage.getItem('selected_auto');
lang = localStorage.getItem('lang');
if (lang == 'ru' || lang == 'en') {
    window.lang = localStorage.getItem('lang')
    if (window.lang == 'rus') {
    for (let data of window.Rus_lang) {
        document.getElementById(data[0]).innerHTML = data[1];
    }
    $("#lang-choice :contains('Русский')").attr("selected", "selected"); 



}
    else if (window.lang == 'en') {
        for (let data of window.En_lang){
        document.getElementById(data[0]).innerHTML = data[1];

        }
    $("#lang-choice :contains('English')").attr("selected", "selected"); 



}
}
else {
    window.lang = 'rus'
}
if (selected_auto == 'true'){
    document.getElementById('user-auto').innerHTML = localStorage.getItem('mark') + ' ' + localStorage.getItem('model');
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


$('#start-btn').click(function() {
    
    $('.start-page').animate({
        left: '-120vw',
        display: 'none'
    }, 'fast','linear');
        $('.car-choice').animate({
            left: '0vw'
        }, 'fast', 'linear' )
    });




$('.map-panel-button').click(function() {
    if (window.map_step != 2) {
    if (window.map_panel == 'open') {
        $('.map-panel').animate({
            height: "38vh",
            top: "79vh"
        }, 
        'slow');
        window.map_panel = 'close';
    }
    else if (window.map_panel == 'close') {
        if (window.map_step != 3) {
        $('.map-panel').animate({
            height: "38vh",
            top: "60vh"
        }, 
        'slow');
        window.map_panel = 'open'
    }
    else {
        $('.map-panel').animate({
            height: "38vh",
            top: "50vh"
        }, 
        'slow');
        window.map_panel = 'open'
    }
}
    }



});

$(".map-panel-close").click(function() {
    if (window.map_step == 3) {
        $('.map-panel').animate({
            height: "38vh",
            top: "79vh",
        }, 
        'slow')
        window.close = true;
    } 
    else {
        $('.map-panel').animate({
            top: "79vh",
            height: "50vh",
        }, "slow")
        window.close = false;
    }
});



$('.icon-hand-mode').click(function() {
    $('.map-panel').css({'display' : 'none'})
    $('#map-caption').css({'color' : "#787878"})
    $('#hand-caption').css({'color' : "#007AFF"})
    $('#settings-caption').css({'color' : '#787878'})
    $('.settings').css({'display': 'none'});
    $('.hand-mode').css({'display': 'block'});
    $('.icon-map').toggleClass('icon-map-active', false);
    $('.icon-hand-mode').toggleClass('icon-hand-active', true);
    $('.icon-settings').toggleClass('icon-settings-active', false);
    if (window.map_mode == true) {
    $('.map').animate({
        left: "-50vw",
        opacity: "0", 
        transition: "50ms",
        display: 'none'
    }, 100, "linear", function(){
        $('.hand-mode').animate({
            opacity: "1",
            transition: "50ms",
            display: 'block'
        }, 100, 'linear')
    })
        }
    else if (window.settings_mode == true) {
        $('.settings').animate({
            right: "-50vw",
            opacity: "0", 
            transition: "50ms",
            display: 'none'
        }, 100, "linear", function(){
            $('.hand-mode').animate({
                opacity: "1",
                transition: "50ms", 
                display: 'block'
            }, 100, 'linear')
        })


    }
    else if (window.hand_mode == true) {
        console.log('вы и так в этом режиме'); 
    }
    window.hand_mode = true;
    window.map_mode = false;
    window.settings_mode = false;
});
$('.icon-map').click(function() {
    $('.map-panel').css({'display' : 'block'})
    $('.settings').css({'display': 'none'});
    $('#map-caption').css({'color' : "#007AFF"})
    $('#hand-caption').css({'color' : "#787878"})
    $('#settings-caption').css({'color' : '#787878'})
    $('.hand-mode').css({'display': 'none'});
    $('.map').css({'display': "block"});
    $('.icon-map').toggleClass('icon-map-active', true);
    $('.icon-hand-mode').toggleClass('icon-hand-active', false);
    $('.icon-settings').toggleClass('icon-settings-active', false);



    
        if (window.settings_mode == true) {
            $('.settings').animate({
                right: "-50vw",
                opacity: "0", 
                transition: "50ms",
                display: 'none'
            }, 100, "linear", function() {
                $('.map').animate({
                    opacity: "1",
                    left: "0vw",
                    transition: "50ms", 
                    display: 'block'
                }, "fast", 'linear')
            })
        }
        else if (window.hand_mode == true) {
            $('.hand-mode').animate({
                right: "-50vw",
                opacity: "0", 
                transition: "50ms",
                display: 'none'
            }, 100, "linear", function() {
                $('.map').animate({
                    opacity: "1",
                    left: "0vw",
                    transition: "50ms", 
                    display: 'block'
                }, "fast", 'linear')
            })
        }
        else if (window.map_mode == true) {
            console.log('вы и так в этом режиме'); 

        }
        window.map_mode = true;
        window.settings_mode = false;
        window.hand_mode = false;

        }
        );

$('.icon-settings').click(function() {
    $('.map-panel').css({'display' : 'none'})
    $('.hand-mode').css({'display': 'none'});
    $('#map-caption').css({'color' : "#787878"})
    $('#hand-caption').css({'color' : "#787878"})
    $('#settings-caption').css({'color' : '#007AFF'})
    $('.settings').css({'display': 'block'})
    $('.icon-map').toggleClass('icon-map-active', false);
    $('.icon-hand-mode').toggleClass('icon-hand-active', false);
    $('.icon-settings').toggleClass('icon-settings-active', true);
    
    if (window.hand_mode == true) {
        $('.hand-mode').animate({
            right: "-50vw",
            opacity: "0", 
            transition: "50ms",
            display: 'none'
        }, 100, "linear", function() {
            $('.settings').animate({
                opacity: "1",
                left: "0vw",
                transition: "50ms", 
                display: 'block'
            }, "fast", 'linear')
        })
    }
    else if (window.map_mode == true) {
        $('.map').animate({
            right: "-50vw",
            opacity: "0", 
            transition: "50ms",
            display: 'none'
        }, 100, "linear", function() {
            $('.settings').animate({
                opacity: "1",
                left: "0vw",
                transition: "50ms", 
                display: 'block',
            }, "fast", 'linear')
        })
    }
    else if (window.settings_mode == true) {
        console.log('вы и так в этом режиме'); 

    }
    window.settings_mode = true;
    window.map_mode = false;
    window.hand_mode = false;

    });

    $('.hand-mode-condition-box-btn-hm-n').click(function() {
        if (window.condition_human == true) {
            $('.hand-mode-condition-box-btn-hm').animate({
                left : '1vw'
            }, 'fast', 'linear'); 
            $('.hand-mode-condition-box-btn-hm-n').animate({
                left : '49vw'
            }, 'fast', 'linear');
            window.condition_human = false;
        }
            else {
                $('.hand-mode-condition-box-btn-hm').animate({
                left : '49vw'
            }, 'fast', 'linear'); 
            $('.hand-mode-condition-box-btn-hm-n').animate({
                left : '1vw'
            }, 'fast', 'linear') 
            window.condition_human = true;
            }
    })


    $('.hand-mode-condition-box-btn-wh-n').click(function() {
        if (window.condition_weather == true) {
        $('.hand-mode-condition-box-btn-wh').animate({
            left : '1vw'
        }, 'fast', 'linear');
        $('.hand-mode-condition-box-btn-wh-n').animate({
            left : '49vw'
        }, 'fast', 'linear');
        window.condition_weather = false;
    }
        else {
            $('.hand-mode-condition-box-btn-wh').animate({
            left : '49vw'
        }, 'fast', 'linear');
        $('.hand-mode-condition-box-btn-wh-n').animate({
            left : '1vw'
        }, 'fast', 'linear');
        window.condition_weather = true;
        }
    });
    $('#user-auto').click(function() {
        $('.car-choice').animate({
            left : '0vw'
        }, 300, 'linear');
    });
    $('#save-box-db').click(function() {
        action = SaveAuto();
        if (action == true) {
            $('.car-choice').animate({
                left : '-105vw'
            }, 300, 'linear')
        if (window.start_page) {
            window.start_page = false;
        }
    }
});

$('#back-of-choice-db').click(function () {
    if (window.start_page) {
        $('.car-choice').animate({
            left : '-105vw'
        }, 300, 'linear')

        $('.start-page').animate({
            left: '0vw'
        }, 'fast', 'linear')
    
    }
    else { 
    $('.car-choice').animate({
        left : '-105vw'
    }, 300, 'linear')
}
});

    $('.hand-mode-btn-clr').click(function () {
        var road = parseFloat(document.getElementById('hand-road').value.replace(/\s+/g, ''));
        console.log(road);
        var price = parseFloat(document.getElementById('hand-price').value.replace(/\s+/g, ''));
        console.log(price);
        var speed = parseFloat(document.getElementById('hand-speed').value.replace(/\s+/g, ''));
        console.log(speed);
        var cilindr = parseFloat(localStorage.getItem('v'));
        console.log(cilindr);
        if (window.condition_human == true) {
            var D1 = 15;

        }
        else {
            var D1 = 0;
        };
        if (window.condition_weather == true) {
            var D2 = 15;
        }
        else {
            var D2 = 0 
        };
        if (parseFloat(cilindr) < 1.4) {
            var Khs = 1.24;
        }
        else if (parseFloat(cilindr) < 2.0, parseFloat(cilindr) > 1.4) {
            var Khs = 1.07;
        };
        var rashod = parseFloat(localStorage.getItem('rashod'));
        var fuel = parseFloat((0.01 * parseFloat(rashod) * parseFloat(road) *(1+0.01*(Khs+D1+D2)))).toFixed(2);
        var time = parseFloat(parseFloat(road)*60 / speed);
        var fp = parseFloat(fuel * parseFloat(price)).toFixed(2);
        var total_hours = Math.floor(time / 60);
        var total_mins = Math.floor(time - total_hours * 60);

        // output
        if (window.lang == 'rus'){
            document.getElementById('hand-output-fuel').innerHTML = fuel + ' л';

        }
        else{
        document.getElementById('hand-output-fuel').innerHTML = fuel + ' L';

        }
        if (total_hours != 0) {
            if (window.lang == 'rus'){
                document.getElementById('hand-output-time').innerHTML = total_hours + ' ч ' + total_mins + ' мин';
            }
            else{
                document.getElementById('hand-output-time').innerHTML = total_hours + ' h ' + total_mins + ' min';

            }
        }
        else {
            if (window.lang == 'rus'){
                document.getElementById('hand-output-time').innerHTML = total_mins + ' мин';

            }
            else{
                document.getElementById('hand-output-time').innerHTML = total_mins + ' min';

            }

        };
        document.getElementById('hand-output-price').innerHTML = '₽' + fp;
    });
    $('.hand-mode-btn-st').click(function () {
        document.getElementById('hand-output-fuel').innerHTML = '00.00 л';
        document.getElementById('hand-output-time').innerHTML = '0 мин';
        document.getElementById('hand-output-price').innerHTML = '₽00.00';
        document.getElementById('hand-road').value = '';
        document.getElementById('hand-price').value = '';
        document.getElementById('hand-speed').value = '';
    });


    $('#map-continue').click(function() {
        console.log(document.getElementById('map-panel-input').value)
        if (window.map_step == 0) {
            if (document.getElementById("map-panel-input").value != '') {
            $('.map-panel').animate({
                height: "38vh",
                top: "60vh"
            }, 
            'slow');
            $('#map-panel-route-input').animate({
                top : '6vh',
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity : '0'
                }, 'fast')
            });
            $('#map-panel-route-input-2').animate({
                top : '-4vh'
            })
            $("#map-panel-input").prop('disabled', true);
            $('.map-panel-route-input').animate({
                width : '93vw'
            }, 'fast');
            $('.map-panel-route-input input').animate({
                width : '85vw'
            }, 'fast')
            $('#map-panel-route-input-2').css({'display' : 'block'})
            $('.map-panel-close').animate({
                opacity : '1'
            });
            $('.map-panel-back').animate({
                opacity : '1'
            }, 'fast')
            window.map_panel = 'open';
            window.map_step = 1;
        } }
        else if (window.map_step == 2) {
            window.map_step = 3;
            $("#map-input-fuel-box").animate({
                opacity: "0", 
                display : 'block'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '0'
                },'fast')
            });
            $('#map-panel-route-input-2').animate({
                opacity : '1'
            }, 'fast')
            Calculate() 
            $('.map-panel').animate({
                height: "38vh",
                top: "50vh"
            }, 
            'slow');  
        } 
    });

    $('.map-panel-back').click(function() {
        if (window.map_step == 1) {
            $('.map-panel').animate({
                height: "38vh",
                top: "79vh"
            }, 
            'slow');
            $('#map-panel-route-input').animate({
                top : '-0.5vh',
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity : '1'
                }, 'fast')
            });
            $('#map-panel-route-input-2').css({'display' : 'none'})
            document.getElementById('map-panel-input').value = '';
            $("#map-panel-input").prop('disabled', false);
            $('.map-panel-route-input').animate({
                width : '76vw'
            }, 'fast')
            $('.map-panel-route-input input').animate({
                width : '73vw'
            }, 'fast')
            $('.map-panel-close').animate({
                opacity : '0'
            }, 'fast');
            $('.map-panel-back').animate({
                opacity : '0'
            }, 'fast')
            window.map_step = 0;
        }
        else if (window.map_step == 2) {
            $('.map-panel').animate({
                top: "60vh"
            },
            'slow');
            $('#map-panel-route-input-2').animate({
                opacity: '1', 
                display: 'block'
            }, 'fast');
            $('#map-input-fuel-price').animate({
                width : '85vw'
            });
            $('#map-input-fuel-box').css({
                'display' : 'none'
            });
            $("#map-input-fuel-box").animate({
                opacity: "0", 
                width: '93vw'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '0'
                },'fast')
            });
            window.map_step = 1;

        }
        else if (window.map_step == 3) {
            $("#map-input-fuel-box").animate({
                opacity: "1", 
                display : 'block'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '1'
                },'fast')
            });
            $('#map-panel-route-input-2').animate({
                opacity : '0'
            }, 'fast')
            Calculate() 
            $('.map-panel').animate({
                height: "38vh",
                top: "79vh"
            }, 
            'slow');
            if (window.lang == 'rus') {
            document.getElementById('map-panel-rec').innerHTML = 'Оптимально';
            }
            else{
                document.getElementById('map-panel-rec').innerHTML = 'Recommended';
            }
            $('#map-panel-rec').animate({
                top : '17vh',
                left : '26px'
            })
                $('#map-output-dist-1').css({
                    'color' : '#000'
                });
                $("#map-output-time-1").css({
                    'color' : '#000'
                })
                $('#map-output-dist-2').css({
                    'color' : '#000'
                });
                $("#map-output-time-2").css({
                    'color' : '#000'
                })
                $('#map-output-dist-3').css({
                    'color' : '#000'
                });
                $("#map-output-time-3").css({
                    'color' : '#000'
                })
            window.map_step = 2;  

        };
    });

    $('.map-panel-close').click(function() {
        if (window.map_step == 3) {
            window.map_step = 1;
            $("#map-input-fuel-box").animate({
                opacity: "1", 
                display : 'block'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '1'
                },'fast')
            });
            $('#map-panel-route-input-2').animate({
                opacity : '0'
            }, 'fast')
            Calculate() 
            $('.map-panel').animate({
                height: "38vh",
                top: "79vh"
            }, 
            'slow');
            if (window.lang == 'rus') {
                document.getElementById('map-panel-rec').innerHTML = 'Оптимально';
                }
                else{
                    document.getElementById('map-panel-rec').innerHTML = 'Recommended';
                }
            $('#map-panel-rec').animate({
                top : '17vh',
                left : '26px'
            })
                $('#map-output-dist-1').css({
                    'color' : '#000'
                });
                $("#map-output-time-1").css({
                    'color' : '#000'
                })
                $('#map-output-dist-2').css({
                    'color' : '#000'
                });
                $("#map-output-time-2").css({
                    'color' : '#000'
                })
                $('#map-output-dist-3').css({
                    'color' : '#000'
                });
                $("#map-output-time-3").css({
                    'color' : '#000'
                })
                $('#map-panel-route-input-2').animate({
                    opacity: '1', 
                    display: 'block'
                }, 'fast');
                $('#map-input-fuel-price').animate({
                    width : '85vw'
                });
                $('#map-input-fuel-box').css({
                    'display' : 'none'
                });
                $("#map-input-fuel-box").animate({
                    opacity: "0", 
                    width: '93vw'
                }, 'fast', function() {
                    $('#map-continue').animate({
                        opacity: '1'
                    },'fast')
                });
                $('#map-panel-route-input').animate({
                    top : '-1vh',
                }, 'fast', function() {
                    $('#map-continue').animate({
                        opacity : '1'
                    }, 'fast')
                });
                $('#map-panel-route-input-2').css({'display' : 'none'})
                document.getElementById('map-panel-input').value = '';
                $("#map-panel-input").prop('disabled', false);
                $('.map-panel-route-input').animate({
                    width : '76vw'
                }, 'fast')
                $('.map-panel-route-input input').animate({
                    width : '73vw'
                }, 'fast')
                $('.map-panel-close').animate({
                    opacity : '0'
                }, 'fast');
                $('.map-panel-back').animate({
                    opacity : '0'
                }, 'fast')
                window.map_step = 0;
        }
        else if (window.map_step == 2) {
            $('.map-panel').animate({
                height: "38vh",
                top: "79vh"
            }, 
            'slow');
            $('#map-panel-route-input-2').animate({
                opacity: '1', 
                display: 'block'
            }, 'fast');
            $('#map-input-fuel-price').animate({
                width : '85vw'
            });
            $('#map-input-fuel-box').css({
                'display' : 'none'
            });
            $("#map-input-fuel-box").animate({
                opacity: "0", 
                width: '93vw'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '0'
                },'fast')
            });
            $('#map-panel-route-input').animate({
                top : '-0.5vh',
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity : '1'
                }, 'fast')
            });
            $('#map-panel-route-input-2').css({'display' : 'none'})
            document.getElementById('map-panel-input').value = '';
            $("#map-panel-input").prop('disabled', false);
            $('.map-panel-route-input').animate({
                width : '76vw'
            }, 'fast')
            $('.map-panel-route-input input').animate({
                width : '73vw'
            }, 'fast')
            $('.map-panel-close').animate({
                opacity : '0'
            }, 'fast');
            $('.map-panel-back').animate({
                opacity : '0'
            }, 'fast')
            window.map_step = 0
        }
        else if (window.map_step == 1) {
            $('.map-panel').animate({
                height: "38vh",
                top: "79vh"
            }, 
            'slow');
            $('#map-panel-route-input').animate({
                top : '-0.5vh',
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity : '1'
                }, 'fast')
            });
            $('#map-panel-route-input-2').css({'display' : 'none'})
            document.getElementById('map-panel-input').value = '';
            $("#map-panel-input").prop('disabled', false);
            $('.map-panel-route-input').animate({
                width : '76vw'
            }, 'fast')
            $('.map-panel-route-input input').animate({
                width : '73vw'
            }, 'fast')
            $('.map-panel-close').animate({
                opacity : '0'
            }, 'fast');
            $('.map-panel-back').animate({
                opacity : '0'
            }, 'fast')
            window.map_step = 0
        }
    })

// Отслеживание клика на боксы с выходным значением в MapMode
    $('#map-panel-output-box-1').click(function() {
        if (window.map_step == 1) {
            window.map_step = 2;
            window.choice_output = 1;
            $('.map-panel').animate({
                top: "79vh"
            },
            'slow');
            $('#map-panel-route-input-2').animate({
                opacity: '0', 
                display: 'none'
            }, 'fast');
            $('#map-input-fuel-price').animate({
                width : '20vw'
            });
            $('#map-input-fuel-box').css({
                'display' : 'block'
            });
            $("#map-input-fuel-box").animate({
                opacity: "1", 
                width: '79vw'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '1'
                },'fast')
            });
        }
        if (window.map_step == 3) {
            window.choice_output = 1;
            $('.map-panel').animate({
                height: "38vh",
                top: "50vh"
            }, 
            'slow');
            Calculate()
        }
    })
    $('#map-panel-output-box-2').click(function () {
        if (window.map_step == 1) {
            window.map_step = 2;
            window.choice_output = 2;
            $('.map-panel').animate({
                top: "79vh"
            },
            'slow');
            $('#map-panel-route-input-2').animate({
                opacity: '0', 
                display: 'none'
            }, 'fast');
            $('#map-input-fuel-price').animate({
                width : '20vw'
            });
            $('#map-input-fuel-box').css({
                'display' : 'block'
            });
            $("#map-input-fuel-box").animate({
                opacity: "1", 
                width: '79vw'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '1'
                },'fast')
            });

        }
        if (window.map_step == 3) {
            window.choice_output = 2;
            $('.map-panel').animate({
                height: "38vh",
                top: "50vh"
            }, 
            'slow');
            Calculate()
        }
    })

    $('#map-panel-output-box-3').click(function () {
        if (window.map_step == 1) {
            window.map_step = 2;
            window.choice_output = 3;
            $('.map-panel').animate({
                top: "79vh"
            },
            'slow');
            $('#map-panel-route-input-2').animate({
                opacity: '0', 
                display: 'none'
            }, 'fast');
            $('#map-input-fuel-price').animate({
                width : '20vw'
            });
            $('#map-input-fuel-box').css({
                'display' : 'block'
            });
            $("#map-input-fuel-box").animate({
                opacity: "1", 
                width: '79vw'
            }, 'fast', function() {
                $('#map-continue').animate({
                    opacity: '1'
                },'fast')
            });

        }
        else if (window.map_step == 3) {
            window.choice_output = 3;
            $('.map-panel').animate({
                height: "38vh",
                top: "50vh"
            }, 
            'slow');
            Calculate()
        }
    })
// end


$('.no-auto').click(function() {
     $('.another-car').animate({
         left : '0vw'
     }, 'fast', function() {
         $('.car-choice').animate({
             left : '-120vw'
         }, 'fast')
     });
});

$('#back-of-choice-db').click(function() {
    
    $('.car-choice').animate({
        left : "-120vw"
    }, 'fast');
});

$('#back-of-custom-choice').click(function() {
    $('.another-car').animate({
        left : '-120vw'
    },'fast')
})

$('.a-car-mechanic').click(function() {
    $('.a-car-choice-box').animate({
        left : '1%'
    }, 'fast');
});

$('.a-car-auto').click(function() {
    $('.a-car-choice-box').animate({
        left : "50%"
    }, 'fast');
});






    function Calculate() {
                    // изменение оптимально на выбрано
                    if (window.lang == 'rus') {
                        document.getElementById('map-panel-rec').innerHTML = 'Выбрано';
                        }
                        else{
                            document.getElementById('map-panel-rec').innerHTML = 'Selected';
                        }
                    if (window.choice_output == 1) {
                    $('#map-panel-rec').animate({
                        top : '27vh',
                        left : '3vh'
                    }) 
                }
                    else if (window.choice_output == 2) {
                        $('#map-panel-rec').animate({
                            top : '27vh',
                            left : '37vw'

                        }) 
                    }
                    else if (window.choice_output == 3) {
                        $('#map-panel-rec').animate({
                            top : '27vh',
                            left : '66vw'

                        }) 
                    }
                    if (window.choice_output == 1) {
                        $('#map-output-dist-1').css({
                            'color' : '#007AFF'
                        });
                        $("#map-output-time-1").css({
                            'color' : '#007AFF'
                        })
                        $('#map-output-dist-2').css({
                            'color' : '#000'
                        });
                        $("#map-output-time-2").css({
                            'color' : '#000'
                        })
                        $('#map-output-dist-3').css({
                            'color' : '#000'
                        });
                        $("#map-output-time-3").css({
                            'color' : '#000'
                        })
        
                    }
                   else if (window.choice_output == 2) {
                    $('#map-output-dist-2').css({
                        'color' : '#007AFF'
                    });
                    $("#map-output-time-2").css({
                        'color' : '#007AFF'
                    })
                    $('#map-output-dist-1').css({
                        'color' : '#000'
                    });
                    $("#map-output-time-1").css({
                        'color' : '#000'
                    })
                    $('#map-output-dist-3').css({
                        'color' : '#000'
                    });
                    $("#map-output-time-3").css({
                        'color' : '#000'
                    })
                    }
                    else if (window.choice_output == 3) {
                        $('#map-output-dist-3').css({
                            'color' : '#007AFF'
                        });
                        $("#map-output-time-3").css({
                            'color' : '#007AFF'
                        })
                        $('#map-output-dist-2').css({
                            'color' : '#000'
                        });
                        $("#map-output-time-2").css({
                            'color' : '#000'
                        })
                        $('#map-output-dist-1').css({
                            'color' : '#000'
                        });
                        $("#map-output-time-1").css({
                            'color' : '#000'
                        })
                    };
                    // end 

                    // Вычисление в MapMode 
                    var date = new Date();
                    window.month = date.getMonth() + 1;
                    var fuel_price = parseFloat(document.getElementById('map-input-fuel-price').value);
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
                        var rashod = parseFloat(localStorage.getItem('rashod'));
                        if (window.choice_output == 1) {
                        var fuel = parseFloat((0.01 * parseFloat(rashod) * parseFloat(window.map_distance_1) *(1+0.01*(Khs+D)))).toFixed(2);
                        var fp = parseFloat(fuel * parseFloat(fuel_price)).toFixed(2);
                        var total_hours = Math.floor(window.map_time_1 / 60);
                        var total_mins = Math.floor(window.map_time_1 - total_hours * 60);  
                        var auto = localStorage.getItem('mark') + " " + localStorage.getItem('model') + localStorage.getItem('mods');
                        var url =  "/api/set-log?auto=" + auto + '&point_a=' + window.point_a + "&point_b=" + window.point_b + "&time_road=" + window.map_time_1 + "&fuel=" + fuel + '&price=' + fp
                        if (window.logs) {
                        $.ajax({
                            type: "GET",
                            url: url,
                            dataType: 'json',
                            success: function(data){
                                    console.log('save auto');}
                            });    
                        }
                    }
                       else if (window.choice_output == 2) {
                            var fuel = parseFloat((0.01 * parseFloat(rashod) * parseFloat(window.map_distance_2) *(1+0.01*(Khs+D)))).toFixed(2);
                            var fp = parseFloat(fuel * parseFloat(fuel_price)).toFixed(2);
                            var total_hours = Math.floor(window.map_time_2 / 60);
                            var total_mins = Math.floor(window.map_time_2 - total_hours * 60);  
                            var url =  "/api/set-log?auto=" + auto + '&point_a=' + window.point_a + "&point_b=" + window.point_b + "&time_road=" + window.map_time_2 + "&fuel=" + fuel + '&price=' + fp
                            if (window.logs) {
                            $.ajax({
                                type: "GET",
                                url: url,
                                dataType: 'json',
                                success: function(data){
                                        console.log('save auto');}
                                }); 
                            }
                        }
                          else  if (window.choice_output == 3) {
                                var fuel = parseFloat((0.01 * parseFloat(rashod) * parseFloat(window.map_distance_3) *(1+0.01*(Khs+D)))).toFixed(2);
                                var fp = parseFloat(fuel * parseFloat(fuel_price)).toFixed(2);
                                var total_hours = Math.floor(window.map_time_3 / 60);
                                var total_mins = Math.floor(window.map_time_3 - total_hours * 60);        
                                var url =  "/api/set-log?auto=" + auto + '&point_a=' + window.point_a + "&point_b=" + window.point_b + "&time_road=" + window.map_time_3 + "&fuel=" + fuel + '&price=' + fp
                                if (window.logs) {
                                $.ajax({
                                    type: "GET",
                                    url: url,
                                    dataType: 'json',
                                    success: function(data){
                                            console.log('save auto');}
                                    });                
                                }
                            }
                            document.getElementById('map-output-fuel').innerHTML = fuel + ' л';
                            document.getElementById('map-output-price').innerHTML = "₽"+ fp;

    }


$('#map-panel-input').focus(function() {
    $('.map-panel').animate({
        top : '50vh'
    });
    $('#map-panel-rec').css({'display' : 'none'})
});
$('#map-panel-input').focusout(function() {
    $('.map-panel').animate({
        top : '79vh'
    });
    $('#map-panel-rec').css({'display' : 'block'})
})

$('#map-input-fuel-price').focus(function() {
    $('.map-panel').animate({
        top : '50vh'
    });
    $('#map-panel-rec').css({'display' : 'none'})
});
$('#map-input-fuel-price').focusout(function() {
    $('.map-panel').animate({
        top : '79vh'
    });
    $('#map-panel-rec').css({'display' : 'block'})
})

$('#log-select').change(function() {
    if (document.getElementById('log-select').value == 'yes') {
        localStorage.setItem('logs', 'true')
        window.logs = true;
    }
    else {
        localStorage.setItem('logs', 'false');
        window.logs = false;
    }
});

$('#mark-select').change(function() {
    $("#model-select").empty();
    $("#model-select").append('<option value="Модель">Модель</option>');
    var mark = document.getElementById('mark-select').value;
    var url = '/api/get-model?mark=' + mark;
    console.log(url);
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
                console.log(models[i]['model']);
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




function SetAuto(data) {
    localStorage.setItem('mark', data['mark']);
    localStorage.setItem('model', data['model']);
    localStorage.setItem('mods', data['mod']);
    localStorage.setItem('power', data['power']);
    localStorage.setItem('v', data['v']);
    localStorage.setItem('rashod', data['rashod']);
    localStorage.setItem('gen', data['gen']);
    // localStorage.setItem('vbak', data['vbak']);

}

function SaveAuto() {
    if (window.start_page) {
        localStorage.setItem('first_page', 'false');
        $('#map').css({'opacity': '1'});
        $('#map-panel').css({'opacity' : '1'});
        $('.map-get-geo').css({'opacity' : '1'});

    }
    var mark = document.getElementById('mark-select').value;
    var model = document.getElementById('model-select').value;
    var mod = document.getElementById('mod-select').value;
    if (mark == 'Производитель' || mod == 'Модификация' || model == 'Модель') {
        alert('выберете авто!')
        return false
    }
    else {
        document.getElementById('user-auto').innerHTML = localStorage.getItem('mark') + ' ' + localStorage.getItem('model');
        localStorage.setItem('selected_auto', true);
        return true
    }
}

$('#lang-choice').change(function(){
    var lang = document.getElementById('lang-choice').value;
    var selected_auto = localStorage.getItem('selected_auto')
    window.lang = lang;
    localStorage.setItem('lang', lang)
    if (lang == 'rus'){
    for (let data of window.Rus_lang) {
        document.getElementById(data[0]).innerHTML = data[1];
    }

}
    else if (lang == 'en') {
        for (let data of window.En_lang){
        document.getElementById(data[0]).innerHTML = data[1];

        }

    }
    if (selected_auto == 'true') {
        document.getElementById('user-auto').innerHTML = localStorage.getItem('mark') + " " + localStorage.getItem('model')
    }
    
})



$(".car-choice").onSwipe(function(direction) {
    if (!window.start_page || window.start_page == false) {
    if (direction.right) {
        $('.car-choice').animate({
            left : '110vw'
        }, 300, 'linear')
    }
    else if (direction.left) {
        $('.car-choice').animate({
            left: '-120vw'
        })
    }
}
});


$('.map-panel').onSwipe(function(direction) {
    if (window.map_step == 1) {
    if (direction.up) {
        $('.map-panel').animate({
            top: '60vh'
        });
    }
    else if (direction.down) {
        $('.map-panel').animate({
            top: '79vh'
        });
    }
}
    else if (window.map_step == 3) {
        if (direction.up) {
            $('.map-panel').animate({
                top: '50vh'
            });
        }
        else if (direction.down) {
            $('.map-panel').animate({
                top: '79vh'
            });
        }
    }
})


$('#callback-btn-open').click(function (e) { 
    $('.callback').animate({
        left: '0'
    })
    
});

$('#back-of-send-callback').click(function (e) { 
    $('.callback').animate({
        left: '-120vw'
    })
    
});

$('.callback').onSwipe(function(direction) {
    if (direction.right) {
        $('.callback').animate({
            left: '140vw'
        })

    }
    else if (direction.left) {
        $('.callback').animate({
            left: '-120vw'
        })
    }
})

$('#send-callback').click(function (e) { 
    if ($('#callback-message').val() != '') {
        $.ajax({
            type: "POST",
            url: "/send-msg",
            dataType: 'json',
            headers:{
                "X-CSRFToken": csrf_token
            },
            data : {
                name: document.getElementById('callback-name').value, 
                email: document.getElementById('callback-email').value,
                message: document.getElementById('callback-message').value, 
            },
            
            success: function(data){
                console.log('succses');
            },
            error: function() {
                console.log('error ajax');
            }
            });
            ['name', 'email', 'message'].forEach(function(i, number, arr){
                $('#callback-'+i).val('');
            })
    }
    else {
        $("#callback-message").effect("shake", {distance: 10});
    }
    
});