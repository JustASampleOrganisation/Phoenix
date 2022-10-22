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

function ChoiceTable() {
    var table_id = document.querySelector('select').value;
    $.ajax({
        type: 'GET',
        url: `/get_app_frame?frame=6&table_id=${table_id}`,
        success: function(response) {
             document.querySelector('body').innerHTML = response;
        },
        failed: function(error) {
            alert(error);
        }
    })
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