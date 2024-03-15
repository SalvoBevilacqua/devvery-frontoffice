<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {

        };
    },
};
</script>


<template>
    <div class="wrapper">
        <AppHeader />
        <div class="position-relative">
            <div class="ms_wave">
                <div class="container position-relative">
                    <img src="../assets/images/main/tree.png" alt="">
                    <div class="px-5">
                        <h2 class="fw-bolder my-5">Rivoluzioniamo il Gusto, Consegna dopo Consegna</h2>

                        <p class="fs-5">Benvenuti in Devvery, dove l'innovazione incontra la passione per il cibo.
                            Siamo più di una semplice azienda
                            di delivery; siamo un movimento dedicato a portare la bontà culinaria direttamente alla tua
                            porta.
                            Fondati sulla convinzione che il cibo di qualità debba essere accessibile a tutti, ci
                            impegniamo
                            a
                            rendere
                            la tua esperienza gastronomica più conveniente, veloce e deliziosa che mai.<br>
                            Il nostro approccio alla consegna di cibo è stato progettato per soddisfare le esigenze
                            moderne,
                            unendo
                            tecnologia all'avanguardia e un tocco umano. Con la nostra app intuitiva, puoi sfogliare
                            un'ampia
                            varietà di
                            ristoranti locali, selezionare i tuoi piatti preferiti e ricevere il tutto con pochi
                            click.<br>
                            Ma non ci fermiamo qui. In Devvery, crediamo nell'importanza di sostenere la comunità locale
                            e
                            ridurre
                            l'impatto ambientale. Collaboriamo strettamente con i ristoratori della tua zona, garantendo
                            che
                            ogni
                            ordine
                            vada a sostenere le piccole imprese e a promuovere l'ecosistema culinario locale. Inoltre,
                            adottiamo
                            pratiche sostenibili nella nostra logistica di consegna per ridurre al minimo l'impatto
                            ambientale
                            delle
                            nostre operazioni.<br>
                            Ci impegniamo costantemente a superare le aspettative dei nostri clienti, offrendo un
                            servizio
                            impeccabile e una varietà ineguagliabile di opzioni culinarie. Che tu stia cercando una
                            pizza
                            fragrante,
                            un sushi fresco o un comfort food a tarda notte, puoi contare su Devvery per consegnare il
                            piacere
                            del
                            cibo
                            direttamente alla tua porta, quando ne hai più bisogno.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>


<style lang="scss" scoped>
.wrapper {
    min-height: 100vh;

    .ms_wave {
        &:after {
            width: 100%;
            background-image: url(../assets/images/main/onda_white.png);
            content: '';
            height: 6rem;
            position: absolute;
            display: block;
            z-index: 9;
            bottom: -6rem;
            left: 0;
            background-size: cover;
            background-repeat: no-repeat;
            transform: rotateX(180deg);
        }

        img {
            position: absolute;
            opacity: 20%;
            max-width: 350px;
            top: 40%;
            right: 0;
        }
    }
}
</style>
