$(document).ready(function() {
  $('.button-submit:not([disabled]):not(.disabled)').click(function (e) {

    e.preventDefault();  
    
    const $button = $(this);
    
    // we can not semantically disable button here
    // cause then no status is read by screenreaders!
    // so we just set a disabled class instead
    // and so block a second click

    $button.addClass('disabled');
    
    function changeStatus (status) {
      $button.removeAttr('class');
      $button.addClass('button-submit');
      $button.addClass('button-submit--' + status);
      $('.button-submit__text').attr('hidden', true);
      $('.button-submit__text--' + status).removeAttr('hidden');    
    }

    // fist change status to "loading"
    changeStatus('loading');
    
    // we're just ajaxing some dummy data
    // to simulate some server interaction    
    var request = $.getJSON('//codepen.io/chriscoyier/pen/EAIJj.js');

    request.done(function(data) {
      setTimeout(function(){
        changeStatus('ready');
        $button.attr('disabled', true);
      },1500);      
    });
    request.fail(function() {
      setTimeout(function(){
        changeStatus('fail');
      },1500);
    }); 
  });
  
  // reset button for example only
  $('.button-submit__reset').click(function () {
    const $button = $('.button-submit');     
    $button.removeAttr('class');
    $button.addClass('button-submit');    
    $button.removeAttr('disabled');
    
    $('.button-submit__text').attr('hidden', true);
    $('.button-submit__text--submit').removeAttr('hidden');
  });
});