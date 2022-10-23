function ChoiceRest(rest) {
    var rest_id = rest;
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=5&rest_id=${rest_id}`,
        success: function(response) {
            document.querySelector('body').innerHTML = response;
        },
        failed: function(error) {
            alert(error);
        }
    })
}

function GetProducts() {
    rest = parseInt(document.querySelector('meta[name="rest_id"]').attributes.content.value);
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=7&rest_id=${rest}`,
        success: function(response) {
            document.querySelector('body').innerHTML = response;
        },
        failed: function(error) {
            alert(error);
        }
    })


}

function addToBasket(product_id) {
    var product_id = parseInt(product_id);
    var order_id = parseInt(document.querySelector('meta[name="order_id"]').attributes.content.value);
    $.ajax({
        type: 'GET',
        url: `/add_to_basket?order_id=${order_id}&product_id=${product_id}&number=1`,
        success: function(response) {
            console.log(response);
        },
        failed: function(error) {
            alert(error);
        }
    })

}

function ChoiceTable() {
    var table_id = document.querySelector('select').value;
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=6&table_id=${table_id}`,
        success: function(response) {
            document.querySelector('body').innerHTML = response;
            var order_id = parseInt(document.querySelector('meta[name="order_id"]').attributes.content.value);
            $.ajax({
                type: "GET",
                url: `/get_basket?order_id=${order_id}`,
                success: function(response) {
                    console.log(response);
                    if (response.length > 1) {
                        for (var i = 0; i < response.length; i++) {
                            if (response[i].product) document.querySelector('.orders').insertAdjacentHTML('beforeend', `<h2>${response[i].product} ${response[i].price}Р</h2>`)
                        }
                    }

                },
                failed: function(error) {
                    alert(error);
                }
            });

        },
        failed: function(error) {
            alert(error);
        }
    })
}

function BackBasket() {
    var session_id = document.querySelector('meta[name="session_id"]').attributes.content.value
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=6&session_id=${session_id}`,
        success: function(response) {
            var order_id = parseInt(document.querySelector('meta[name="order_id"]').attributes.content.value);
            document.querySelector('body').innerHTML = response;
            $.ajax({
                type: "GET",
                url: `/get_basket?order_id=${order_id}`,
                success: function(response) {
                    console.log(response);
                    if (response.length > 1) {
                        for (var i = 0; i < response.length; i++) {

                            if (response[i].officiant) continue;
                            if (response[i].product) document.querySelector('.orders').insertAdjacentHTML('beforeend', `<h2>${response[i].product} ${response[i].price}Р</h2>`)
                        }
                    }
                },
                failed: function(error) {
                    alert(error);
                }
            });
        },
        failed: function(error) {
            alert(error);
        }
    })
}


function PayOrder() {
    var order_id = parseInt(document.querySelector('meta[name="order_id"]').attributes.content.value);
    $.ajax({
        type: "GET",
        url: `/get_app_frame?frame=12&order_id=${order_id}`,
        success: function(response) {
            console.log(response);
            alert('Оплата совершена!');
            window.location = '/';
        },
        failed: function(error) {
            alert(error);
        }
    });
}



$('.start-menu-handler').click(function(e) {
    $.ajax({
        type: "GET",
        url: "/get_app_frame?frame=4",
        success: function(response) {
            document.querySelector('body').innerHTML = response;
        },
        failed: function(error) {
            alert(error);
        }
    });
});


$('.rest-info').click(function(e) {
    var rest_id = $(this).attr('data-id');
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=5&rest_id=${rest_id}`,
        success: function(response) {
            document.querySelector('body').innerHTML = response;
        },
        failed: function(error) {
            alert(error);
        }
    })
})