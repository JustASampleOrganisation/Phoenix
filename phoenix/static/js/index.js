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