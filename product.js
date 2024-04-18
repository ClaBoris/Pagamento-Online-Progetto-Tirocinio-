 /*RICHIESTA HTTP A MOCKOON*/

fetch('http://localhost:5500/PagamentoOnline/product-to-buy')
  .then(response => response.json())
  .then(data => {
    // Gestisci la risposta dalla tua API Mockoon
    console.log(data);
  })
  .catch(error => {
    // Gestisci gli errori di connessione
    console.error('Errore durante il recupero dei dati:', error);
  });


  /*FINGERPRINTING*/
  // fingerprint.js

function generateFingerprint() {
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

/*var fingerprint = generateFingerprint();
console.log(fingerprint);*/
