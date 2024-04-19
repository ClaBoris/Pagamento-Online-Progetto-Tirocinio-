
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


/**POST E FINGERPRINTING**/

function generateFingerprint(callback) {
  var fingerprint = "";

  // Aggiungi informazioni uniche sul dispositivo o sul browser
  fingerprint += "Browser=" + encodeURIComponent(navigator.userAgent) + "&";
  fingerprint += "ScreenSize=" + screen.width + "x" + screen.height;

  // Chiamata alla funzione di callback con il fingerprint come argomento
  callback(fingerprint);
}



/*document.getElementById("proceedToPayment").addEventListener('click', function(event) {
  event.preventDefault(); // Evita il comportamento predefinito del modulo

  // Funzione di callback per inviare la richiesta POST con il fingerprint incluso
   function sendPostRequest(fingerprint) {
  // Ottieni i dati del modulo
  const formData = new FormData(document.getElementById("loginForm"));

  // Aggiungi il fingerprint ai dati del modulo
  formData.append('fingerprint', JSON.stringify(fingerprint));

  // Effettua una richiesta POST al server
  fetch('http://localhost:5500/PagamentoOnline/pre-payment', {
      method: 'POST',
      body: formData,
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parsa la risposta JSON
  })
  .then(data => {
      // Gestisci la risposta dal server
      console.log(data); // Mostra la risposta dal server nella console
      // Esegui ulteriori azioni se necessario, ad esempio mostrare un messaggio all'utente
      window.location.href="pagamento.html";

  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Gestisci gli errori, ad esempio mostrando un messaggio all'utente
      alert('There was a problem with the data load.');
  })

  } 

  // Genera il fingerprint e passa la funzione di callback
  generateFingerprint(sendPostRequest);


});*/

document.getElementById("proceedToPayment").addEventListener('click', function(event) {
  event.preventDefault(); // Evita il comportamento predefinito del modulo

  // Funzione di callback per inviare la richiesta POST con il fingerprint incluso
  function sendPostRequest(fingerprint) {
    // Ottieni i dati del modulo
    const formData = new FormData(document.getElementById("loginForm"));

    // Costruisci l'URL con i parametri del fingerprint
    const url = 'http://localhost:5500/PagamentoOnline/pre-payment?' +
                'fingerprint=' + encodeURIComponent(JSON.stringify(fingerprint));

    // Effettua una richiesta POST al server
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parsa la risposta JSON
    })
    .then(data => {
        // Gestisci la risposta dal server
        console.log(data); // Mostra la risposta dal server nella console
        // Esegui ulteriori azioni se necessario, ad esempio mostrare un messaggio all'utente
        window.location.href="pagamento.html";

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Gestisci gli errori, ad esempio mostrando un messaggio all'utente
        alert('There was a problem with the data load.');
    });
  }

  // Genera il fingerprint e passa la funzione di callback
  generateFingerprint(sendPostRequest);
});

