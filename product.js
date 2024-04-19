 /*RICHIESTA HTTP A MOCKOON*/

/*fetch('http://localhost:5500/PagamentoOnline/product-to-buy')
  .then(response => response.json())
  .then(data => {
    // Gestisci la risposta dalla tua API Mockoon
    console.log(data);
  })
  .catch(error => {
    // Gestisci gli errori di connessione
    console.error('Errore durante il recupero dei dati:', error);
  });*/


  /*FINGERPRINTING*/
  // ho cercato di implementare il fingerpriting. Ho creato nella richiesta get su mockoon una nuova risposta che pottesse
  //rispondere al fingerprinting però essendo una get e questa una post, la risposta arriva ma sotto forma di get. Allora
  //ho pensato di mette al post di get "All request" ma comunque sempre sotto forma di get torna. Vorrei metterla sotto forma 
  //di POST. Vedere come farlo!!!

/*function generateFingerprint() {
  var fingerprint = "";

  // Aggiungi informazioni uniche sul dispositivo o sul browser
  fingerprint += "Browser: " + navigator.userAgent + "\n";
  fingerprint += "Screen size: " + screen.width + "x" + screen.height + "\n";

   // Invia i dati al server
   fetch('http://localhost:5500/PagamentoOnline/product-to-buy', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fingerprint: fingerprint })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
     return response.json();
  })
  .then(data => {
      console.log('Fingerprinting data sent successfully:', data);
  })
  .catch(error => {
      console.error('There was a problem sending the fingerprinting data:', error);
  });

    return fingerprint;
}

var fingerprint = generateFingerprint();
console.log(fingerprint);*/

function generateFingerprint() {
  var fingerprint = "";

  // Aggiungi informazioni uniche sul dispositivo o sul browser
  fingerprint += "Browser: " + encodeURIComponent(navigator.userAgent) + "&";
  fingerprint += "Screen size: " + screen.width + "x" + screen.height;

  // Costruisci l'URL con i parametri
  var url = 'http://localhost:5500/PagamentoOnline/product-to-buy?' + fingerprint;

  // Invia la richiesta GET
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fingerprinting data sent successfully:', data);
    })
    .catch(error => {
      console.error('There was a problem sending the fingerprinting data:', error);
    });

  return fingerprint;
}

var fingerprint = generateFingerprint();
console.log(fingerprint);