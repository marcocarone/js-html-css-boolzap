$(document).ready(function() {

  // FUNZIONE INVIO MESSAGGIO CON CLICK MOUSE
  $(document).on('click', '.message_send', function() {
    invioMessaggio();
  });

  // FUNZIONE INVIO MESSAGGIO CON TASTO INVIO TASTIERA
  $('.input_message').keypress(
    function() {
      if (event.which == 13 || event.keyCode == 13) {
        invioMessaggio();
      }
    }
  );

  // MENU TENDINA OPZIONI
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

  // RIMUOVE I MESSAGGI
  $(document).on('click', '.delete-message', function() {
    $(this).parent().parent().parent().remove();
  });

  // RICERCA UTENTE CONVERSAZIONE
  $(".search-bar__input").keydown(function() {
    var inputRicerca = $(this).val().toLowerCase();
    $(".conversation").each(function() {
      var nomiConversazioni = $(this).find(".title__name").text().toLowerCase();
      if (nomiConversazioni.includes(inputRicerca)) {
        $(this).fadeIn();
      } else {
        $(this).fadeOut();
      }
    });
  });

});

// FUNZIONI SCRIPT
function invioMessaggio() {
  var testoInput = $('.input_message').val();
  if (testoInput.length != 0) {
    var messaggioClonato = $('.container-message + .template_me').clone();
    messaggioClonato.find('.message_text').text(testoInput);
    messaggioClonato.find('.message_time').text(orario());
    $('.container-message').append(messaggioClonato);
    $('.container-message .template_me').removeClass('display-none');
    $('.input_message').val("");
    //FUNZIONE MESSAGGIO DI RISPOSTA BOT
    setTimeout(function() {
      var messaggioRisposta2 = $('.template-user').children().clone();
      messaggioRisposta2.find('.message_time').text(orario());
      $('.container-message').append(messaggioRisposta2);
      $('.container-message .message__user').removeClass('display-none');
    }, 2000);
  }
}

function orario() {
  var data = new Date();
  var ora = data.getHours();
  if (ora < 10) {
    ora = "0" + ora;
  }
  var minuti = data.getMinutes();
  if (minuti < 10) {
    minuti = "0" + minuti;
  }
  return ora + ":" + minuti
}
