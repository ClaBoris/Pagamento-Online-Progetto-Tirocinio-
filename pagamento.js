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

/**POST E FINGERPRINTING**/

function generateFingerprint(callback) {
    var fingerprint = "";
  
    // Aggiungi informazioni uniche sul dispositivo o sul browser
    fingerprint += "Browser=" + encodeURIComponent(navigator.userAgent) + "&";
    fingerprint += "ScreenSize=" + screen.width + "x" + screen.height;
  
    // Chiamata alla funzione di callback con il fingerprint come argomento
    callback(fingerprint);
  }

/*document.getElementById("pay").addEventListener('click', function(event) {
    event.preventDefault(); // Evita il comportamento predefinito del modulo
  
    // Ottieni i dati del modulo
    const formData = new FormData(document.getElementById("makePayment"));
  
    // Effettua una richiesta POST al server
    fetch('http://localhost:5500/PagamentoOnline/pay', {
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
        window.location.href="product.html";
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Gestisci gli errori, ad esempio mostrando un messaggio all'utente
        alert('There was a problem with the data load.');
    })

  });*/

  document.getElementById("pay").addEventListener('click', function(event) {
    event.preventDefault(); // Evita il comportamento predefinito del modulo
  
    // Funzione di callback per inviare la richiesta POST con il fingerprint incluso
    function sendPostRequest(fingerprint) {
      // Ottieni i dati del modulo
      const formData = new FormData(document.getElementById("makePayment"));
  
      // Costruisci l'URL con i parametri del fingerprint
      const url = 'http://localhost:5500/PagamentoOnline/pay?' +
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
          window.location.href="pagamento_effettuato.html";
  
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
  
  
