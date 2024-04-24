 /*RICHIESTA HTTP A MOCKOON*/

fetch('http://localhost:3000/PagamentoOnline/product-to-buy')
  .then(response => response.json())
  .then(data => {
    // Gestisci la risposta dalla tua API Mockoon
    console.log(data);
  })
  .catch(error => {
    // Gestisci gli errori di connessione
    console.error('Errore durante il recupero dei dati:', error);
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


document.getElementById("body").addEventListener('mousemove' , function(event){

  var mouseX = event.clientX;

  var mouseY = event.clientY; 

  print_event("Coordinata X: " + mouseX +" e "+"Coordinata y: " + mouseY);
});

function saveEvents(){

  var eventsJSON = JSON.stringify(array);

  var blob = new Blob([eventsJSON], {type: "application/json"});

  saveAs(blob, "product_events.json");
}

var download = document.getElementById("buyButton");

download.addEventListener('click', function(){

    saveEvents();
});

/***************************************IDENTIFICATORE UNIVOCO***************************************/

function generateUniqueID() {
  //Esempio di generazione di un ID univoco basato sul timestamp
 return 'userID_' + Date.now();
}

//funzione per salvare l'id univoco in un cookie
function saveUserIDToCookie(userId){
  document.cookie = "userId = " + userId + "; path=/";
}

// Funzione per recuperare l'ID univoco dal cookie
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

// Genera o recupera l'ID univoco dell'utente
var userID = getUserIDFromCookie();
if (!userID) {
  userID = generateUniqueID();
  saveUserIDToCookie(userID);
}


/***************************************FINGERPRINTING***************************************/


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

  fetch('http://localhost:3000/PagamentoOnline/product-to-buy?', {
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
  })
  .catch(error => {
    console.error('There was a problem sending the data:', error);
  });
 }

 // Aggiungi un event listener al pulsante per procedere con il pagamento
var buyButton = document.getElementById("buyButton");

buyButton.addEventListener('click', function() {
  var fingerprint = generateFingerprint(); // Genera il fingerprinting
  sendFingerprintAndEvents(fingerprint); // Invia il fingerprinting e gli eventi al server
});


