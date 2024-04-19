function generateFingerprint() {
    var fingerprint = "";
  
    // Aggiungi informazioni uniche sul dispositivo o sul browser
    fingerprint += "Browser: " + encodeURIComponent(navigator.userAgent) + "&";
    fingerprint += "Screen size: " + screen.width + "x" + screen.height;
  
    // Costruisci l'URL con i parametri
    var url = 'http://localhost:5500/PagamentoOnline/pagamento-effettuato?' + fingerprint;
  
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