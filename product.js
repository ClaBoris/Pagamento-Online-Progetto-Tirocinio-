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