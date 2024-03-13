<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    resetFilter() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.store.search = "";
      this.store.checkedTypes = [];
      this.store.restaurants = [];
    }
  },
};
</script>

<template>
  <div class="py-5 bg-white position-relative" id="result">
    <div class="container ms_wave">

      <div class="mb-4 d-flex align-items-baseline justify-content-between gap-2">
        <p class="fs-5 fw-bold" v-if="store.restaurants.length === 1">Abbiamo trovato 1 ristorante</p>
        <p class="fs-5 fw-bold" v-else>Abbiamo trovato {{ store.restaurants.length }} ristoranti</p>
        <button type="button" class="btn fs-5 fw-bold rounded-3 ms_reset_filter" @click="resetFilter()">
          Azzera ricerca
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 mb-5">
        <router-link class="col ms_card" v-for="restaurant in this.store.restaurants"
          :to="{ name: 'show', params: { slug: restaurant.slug } }">

          <div class="mb-4 position-relative">
            <!-- IMMAGINE -->
            <div>
              <div class="ms_front">
                <img v-if="restaurant.cover_image" class="w-100 rounded-4 object-fit-cover"
                  :src="`${this.store.baseUrl}/storage/${restaurant.cover_image}`" alt="immagine ristorante" />
                <img v-else class="object-fit-cover" src="../assets/images/noimg.png" alt="nessuna_immagine" />
              </div>

              <div class="ms_back position-absolute w-100 rounded-4 p-3">
                <p class="fw-bold w-75">{{ restaurant.description }}</p>
              </div>
            </div>

            <!-- BADGE -->
            <div class="d-flex flex-wrap gap-1 my-2">
              <span class="border rounded-2 px-1 border-0 ms_bg-yellow ms_color-dark fw-bold"
                v-for="tipo in restaurant.types">
                {{ tipo.name }}
              </span>
            </div>

            <!-- INFO RISTORANTE -->
            <h3 class="text-wrap text-black">{{ restaurant.name }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables/variables.scss" as *;

.ms_wave {
  a {
    text-decoration: none;
  }

  &::before {
    width: 100%;
    background-image: url(../assets/images/main/onda_white.png);
    content: '';
    height: 6rem;
    position: absolute;
    display: block;
    z-index: 1;
    top: -60px;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .ms_reset_filter {
    background-color: $ms_yellow;
    color: $ms_dark;
  }

  .ms_card {
    img {
      aspect-ratio: 2;
    }

    .ms_front,
    .ms_back {
      backface-visibility: hidden;
      transition: transform 0.9s ease;
    }

    .ms_back {
      top: 0%;
      left: 0%;
      transform: rotateY(180deg);
      background-color: $ms_yellow;
      color: white;
      aspect-ratio: 2;
    }

    &:hover {
      .ms_front {
        transform: rotateY(-180deg);
      }

      .ms_back {
        transform: rotateY(0deg);
      }
    }
  }
}
</style>