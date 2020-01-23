$(document).ready(function() {

  $(document).on('click', '.message_send', function() {
    invioMessaggio()
  });

  $('.input_message').keypress(
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        invioMessaggio()
      }
    }
  );
});


function invioMessaggio() {
  var testoInput = $('.input_message').val();
  var messaggioClonato = $('.container-message + .template_me').clone();
  messaggioClonato.find('.message_text').text(testoInput);
  $('.container-message').append(messaggioClonato);
  $('.container-message .template_me').removeClass('display-none');
  $('.input_message').val("");
}
