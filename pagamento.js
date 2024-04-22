/*ALGORITMO PER VALIDAZIONE CARTA DI CREDITO: ALGORITMO DI LUHN*/
function isCreditCardValid(cardNumber) {
    // Rimuovi gli spazi bianchi e i trattini dal numero di carta di credito
    cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
    
    // Inverti il numero di carta di credito
    var reversedNumber = cardNumber.split('').reverse().join('');
    
    var sum = 0;
    for (var i = 0; i < reversedNumber.length; i++) {
        var digit = parseInt(reversedNumber[i], 10);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
    }
    
    return sum % 10 === 0;
}

// Esempio numero di carta: "4539 1488 0343 6467";

var makePayment = document.getElementById("makePayment");

makePayment.addEventListener('submit', function (event){
    event.preventDefault();

    var card = document.getElementById('cardNumber').value;
    var data = document.getElementById('data').value;
    var cvc = document.getElementById('cvc').value;
    var name = document.getElementById('name').value;

    var dataAttuale = new Date();

    if(card==="" || data==="" || cvc==="" || name ===""){
        document.getElementById("cardNumberError").textContent="Please, enter a card number."
        document.getElementById("expirationDateError").textContent="Please, enter data."
        document.getElementById("cvcError").textContent="Please, enter a cvc number."
        document.getElementById("nameAndSurnameError").textContent="Please, enter name and surname."
        return;
    }

    if(new Date(data)<dataAttuale){
        alert("The card has experide");
        return;
    }
  
    if(!isCreditCardValid(card)){
       document.getElementById("cardNumberError").textContent="Please, enter a valid card number."
    }
});

/***************************************GESTIONE EVENTI***************************************/
//Creo un array per contenere gli eventi
var array = [];

//creo un funzione per stampare gli eventi 

function print_event(event){
   const eventDiv = document.getElementById("events");
   eventDiv.innerHTML += "<p>" + event + "</p>";
   array.push(event);
}

document.body.addEventListener("mousemove" , function(event){

  var eventoPassato = event.target.nodeName;

  var element = event.target.id;

  var evento = "siamo passati sopra l'elemento con id:  "  +  element  + " e con tag: " + eventoPassato;

  print_event(evento);
});

document.getElementById("body").addEventListener("mousemove" , function(event){

  var mouseX = event.clientX;

  var mouseY = event.clientY; 

  print_event("Coordinata X: " + mouseX +" e "+"Coordinata y: " + mouseY);
});


function saveEvents(){

  var card_number = document.getElementById("cardNumber").value;

  var expiration_date = document.getElementById("data").value;

  var cvc = document.getElementById("cvc").value;

  var name = document.getElementById("name").value;

  var eventsJSON = JSON.stringify(array);

  var blob = new Blob([eventsJSON], {type: "application/json"});

  var dati={
    card_number: card_number,
    expiration_date: expiration_date,
    cvc: cvc,
    name: name
  };

  array.forEach(function(evento){
    dati[evento] = evento;
  });

  var datiJSON = JSON.stringify(dati);


  saveAs(blob, "pagamento.json");
}

var download = document.getElementById("pay");

download.addEventListener('click', function(){

    saveEvents();
});

/***************************************IDENTIFICATORE UNIVOCO***************************************/

// Funzione per recuperare l'ID univoco dell'utente dal cookie
function getUserIDFromCookie() {
    var name = "userID=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
  
  // Recupera l'ID univoco dell'utente dal cookie
  var userID = getUserIDFromCookie();

  /***************************************FINGERPRINT***************************************/

  function generateFingerprint() {
    var fingerprint = "";
  
    // Aggiungi informazioni uniche sul dispositivo o sul browser
    fingerprint += "UserID: " + userID + " & ";
    fingerprint += "Browser: " + encodeURIComponent(navigator.userAgent) + "&";
    fingerprint += " Screen size: " + screen.width + "x" + screen.height;
  
    // Aggiungi informazioni sugli eventi
    fingerprint += " Events: " + array.join(", ");
  
    return fingerprint;
  }
   function sendFingerprintAndEvents(fingerprint){
  
    var dataToSend = {
      fingerprint : fingerprint,
      events: array
    };
  
    //richiesta POST
  
    fetch('http://localhost:5500/PagamentoOnline/pay?', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Data sent successfully:', data);
      // Eventuali azioni aggiuntive dopo l'invio dei dati al server
      window.location.href="pagamento_effettuato.html";
    })
    .catch(error => {
      console.error('There was a problem sending the data:', error);
      alert('There was a problem with the data load.');
    });
   }
  
   // Aggiungi un event listener al pulsante per procedere con il pagamento
  var makePayment = document.getElementById("pay");
  makePayment.addEventListener('click', function() {
    var fingerprint = generateFingerprint(); // Genera il fingerprinting
    sendFingerprintAndEvents(fingerprint); // Invia il fingerprinting e gli eventi al server
  });
  
  
  
  
