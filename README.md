**Devvery - Front Office**

- Devvery è stato il progetto finale del corso in full stack web development di Boolean.
- E' stato realizzato interamente dal mio team su Vite, usando Vue e Vue Router per avere una single page application.
- Il progetto è suddiviso in due repository: questa che comprende tutto il codice client side e la repo devvery-backend che contiene invece il codice sviluppato in Laravel.
- Il sito si occupa di delivery di alimenti all'interno di una data città, il tutto è funzionante e pronto per essere operativo.
- La repo comunica tramite API con il backend, che manda le informazioni relative a ristoranti, ristoratori, piatti, disponibilità. Il front office invia invece tutte le informazioni relative agli ordini ed al pagamento.
- E' prevista la possibilità di cercare un ristorante tramite delle categorie o di cercare tramite una normale searchbar. Il risultato della ricerca verrà visualizzato come negli screen a seguire.
- Ogni Ristorante possiede una propria pagina con le informazioni di contatto, posizione e tutto il menù. Il menù tiene conto della disponibilità dei piatti e di eventuali intolleranze. Dalla pagina del menù sarà possibile aggiungere al carrello il piatto desiderato. Il carrello offre un riepilogo di tutti i piatti inseriti e da possibilità di modificarne la quantità. Non è possibile ordinare da ristoranti diversi contemporaneamente. Dal carrello si ha accesso alla pagina di conferma dell'ordine, dove sarà possibile inserire i dati di consegna e procedere col pagamento. Una volta effettuato il pagamento si verrà reindirizzati alla nostra home.
- Sono presenti tutti i controlli e le validazioni del caso in ogni form, sia lato frontoffice che lato backend. L'ordine viene controllato sia durante l'inserimento dei piatti nel carrello che dopo la conferma, così da avere sempre sotto controllo la disponibilità dei piatti. Ad ogni ordine segue una mail inviata al ristoratore, con un resoconto del pagamento e del cliente che l'ha effettuato.

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-1.png)

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-2.png)

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-3.png)

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-4.png)

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-5.png)

![Immagine repo](https://github.com/SalvoBevilacqua/devvery-frontoffice/blob/main/img_repo/devvery-front-6.png)