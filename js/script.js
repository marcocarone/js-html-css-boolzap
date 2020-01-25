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


  // COLLEGARE CONTATTO  ALLA CHAT
  $('.convers').removeClass('active');
  $('.right-messages').removeClass('active');
  $(document).on('click', '.conversation', function() {
    var dataChat = $(this).attr('data-chat');
    $('.splash').addClass('display-none');
    if ($('.conversation').hasClass("active") == true) {
      $('.conversation').removeClass('active');
      $('.right-messages').removeClass('active');
      $('.convers').removeClass('active');
    }
    $(this).addClass('active');
    $('.right-messages[data-chat="' + dataChat + '"]').addClass('active');
    $('.convers[data-chat="' + dataChat + '"]').addClass('active');
  });

});

// EMOJI

$(document).on("click", ".faccine li", function() {
  var emoji = $(this).text();
  console.log("emoticon copiata: " + emoji);
  var txt = $('.input_message').val();
  var txt = $('.input_message').val(txt + emoji);
});

// MENU TENDINA EMOJI

$(document).on('click', '.right__input-message__icon ', function() {
  $('.emoticon-container').slideToggle();
});

// FUNZIONI SCRIPT
function invioMessaggio() {
  var testoInput = $('.input_message').val();
  if (testoInput.length != 0) {
    var messaggioClonato = $('.container-message + .template_me').clone();
    messaggioClonato.find('.message_text').text(testoInput);
    messaggioClonato.find('.message_time').text(orario());
    $('.right-messages.active').append(messaggioClonato);
    $('.container-message .template_me').removeClass('display-none');
    $('.input_message').val("");
    //FUNZIONE MESSAGGIO DI RISPOSTA BOT
    setTimeout(function() {
      var messaggioRisposta2 = $('.template-user').children().clone();
      messaggioRisposta2.find('.message_time').text(orario());
      $('.right-messages.active').append(messaggioRisposta2);
      $('.container-message .message__user').removeClass('display-none');
    }, 1200);
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
