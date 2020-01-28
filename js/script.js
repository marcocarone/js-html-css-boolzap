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

// CAMBIO ICONA INVIO - MICROFONO
$(".input_message").focus(function() {
  $(".invio").addClass("display-none");
  $(".audio").removeClass("display-none");
}).blur(function() {
  $(".audio").addClass("display-none");
  $(".invio").removeClass("display-none");
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
    var messaggioClonato = $('#remove').clone();
    messaggioClonato.find('.message_text').text(testoInput);
    messaggioClonato.find('.message_time').text(orario());
    $('.right-messages.active').append(messaggioClonato);
    $('.container-message .template_me').removeClass('display-none');
    $('.input_message').val("");
    scrollbar();
    $(".convers.active").find('.left__status__last-access').text("Sta scrivendo... ");

    //FUNZIONE MESSAGGIO DI RISPOSTA BOT
    setTimeout(function() {
      var frasiBot = [
        "So che mi piaci,perché non penso alle conseguenze.",
        "Ecco perché mi piaci così tanto.🤗 ",
        "Da quando ti ho incontrato non so più chi sono.",
        "Quale parte del “Mi fai impazzire” non ti è chiara",
        "Meglio in ritardo che struccata 🤗 ",
        "Non sono Google...non cercarmi solo quando ti servo",
        "Le sensazioni sono già mezze verità",
        "Sono a casa, tra poco ti chiamo 💋",
        "Non saprei",
        "Non dirmi di no",
      ];
      var messaggioRisposta2 = $('.template-user').children().clone();
      messaggioRisposta2.find('.message_time').text(orario());
      messaggioRisposta2.find('.message_text').text(frasiBot[numeroRandom(0, 9)]);
      $('.right-messages.active').append(messaggioRisposta2);
      $('.container-message .message__user').removeClass('display-none');

      $(".convers.active").find('.left__status__last-access').text("ultimo accesso oggi alle " + orario());
      $(".conversation.active").find('.time__last_message').text(orario());
      scrollbar();
    }, 1200);

    if ($('.conversation').hasClass("active") == true) {
      var conversazioneClonata = $('.conversation.active');
      $('.left__conversations').prepend(conversazioneClonata);
    }
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

function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scrollbar() {
  var altezzaContainer = $(".right-messages.active").height();
  console.log("altezza" + altezzaContainer);
  $(".container-message").scrollTop(altezzaContainer);
}
