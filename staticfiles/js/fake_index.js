$('#btn-modal-close').click(function(event) {
  /* Act on the event */
  $('.RF_modal').toggleClass('open');
  $('.overlay').css({
    'display' : 'none'
  });
});



$('#btn-o-modal').click(function(event) {
  window.modal = 'open';
  $('.RF_modal').toggleClass('open');
  $('.overlay').css({
    'display' : 'block'
  });
});


$('.overlay').click(function(event) {
  if (window.modal == 'open') {
  window.modal = 'close';
  $('.RF_modal').toggleClass('open');
  $('.overlay').css({
    'display' : 'none'
  });
}
});
