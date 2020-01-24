$(document).ready(function() {

  $(document).on('click', '.message_send', function() {
    invioMessaggio();
    setTimeout(function() {
      MessaggioRisposta();
    }, 2000);
  });

  var visible = false;
  $(document).on('click', '.message__icon', function() {
    if (visible == false) {
      $(this).find('.message_menu').fadeIn();
      visible = true;
    } else {
      $(this).find('.message_menu').fadeOut();
      visible = false;
    }
  });

  $('.input_message').keypress(
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        invioMessaggio();
      }
    }
  );

  $(document).on('click', '.delete-message', function() {
    $(this).parent().parent().parent().remove();
  });
});

function invioMessaggio() {
  var testoInput = $('.input_message').val();
  var messaggioClonato = $('.container-message + .template_me').clone();
  messaggioClonato.find('.message_text').text(testoInput);
  $('.container-message').append(messaggioClonato);
  $('.container-message .template_me').removeClass('display-none');
  $('.input_message').val("");
}

function MessaggioRisposta() {
  var messaggioRisposta2 = $('.template-user').children().clone();
  $('.container-message').append(messaggioRisposta2);
  $('.container-message .message__user').removeClass('display-none');

}
