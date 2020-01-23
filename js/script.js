$(document).ready(function() {

  $(document).on('click', '.message_send', function() {
    var testoInput = $('.input_message').val();
    var messaggioClonato = $('.container-message + .template_me').clone();
    messaggioClonato.find('.message_text').text(testoInput);
    $('.container-message').append(messaggioClonato);
    $('.container-message .template_me').removeClass('display-none');
  });
});
