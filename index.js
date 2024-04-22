
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


var loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    var address = document.getElementById("inputAddress").value;
    var city = document.getElementById("inputCity").value;


     // Pulisci gli errori precedenti
    document.getElementById('mailError').textContent = '';
    document.getElementById('pswError').textContent = '';
    document.getElementById('addressError').textContent = '';
    document.getElementById('cityError').textContent = '';

    /*EMAIL*/
    if(email === ""){
      document.getElementById('mailError').textContent="Please, enter your email.";
      return;
    }

    if(!isValidEmail(email)){
      document.getElementById('mailError').textContent="Please, enter a valid email.";
      return;
    }

    /*PSW*/
    if(psw===""){
        document.getElementById('pswError').textContent="Please, enter your password.";
        return;
    }

    if(psw.length<6){
        document.getElementById('pswError').textContent="The password is too short.";
      return;
    }
    /*ADDRESS*/
    if(address===""){
        document.getElementById('addressError').textContent="Please, enter your addres.";
        return;
    }
    /*CITY*/
    if(city===""){
        document.getElementById('cityError').textContent="Please, enter your city.";
      return;
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

  var email = document.getElementById("email").value;

  var psw = document.getElementById("psw").value;

  var address = document.getElementById("inputAddress").value;

  var city = document.getElementById("inputCity").value;

  var eventsJSON = JSON.stringify(array);

  var blob = new Blob([eventsJSON], {type: "application/json"});

  var dati={
    email: email,
    password: psw,
    address: address,
    city: city
  };

  array.forEach(function(evento){
    dati[evento] = evento;
  });

  var datiJSON = JSON.stringify(dati);


  saveAs(blob, "index.json");
}

var download = document.getElementById("proceedToPayment");

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

/***********************POST e FINGERPRINT***********************/ 

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

  fetch('http://localhost:5500/PagamentoOnline/pre-payment?', {
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
    window.location.href="pagamento.html";
  })
  .catch(error => {
    console.error('There was a problem sending the data:', error);
    alert('There was a problem with the data load.');
  });
 }

 // Aggiungi un event listener al pulsante per procedere con il pagamento
var buyButton = document.getElementById("proceedToPayment");
buyButton.addEventListener('click', function() {
  var fingerprint = generateFingerprint(); // Genera il fingerprinting
  sendFingerprintAndEvents(fingerprint); // Invia il fingerprinting e gli eventi al server
});

