<script>
import { store } from "../store";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="py-5 bg-white position-relative">
    <div class="container ms_wave">

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5 container ms_wave">
        <router-link class="col g-4 d-flex justify-content-center" v-for="restaurant in this.store.restaurants"
          :to="{ name: 'show', params: { slug: restaurant.slug } }">
          <div class="card py-3 hover-zoom rounded-5 border-2 w-100 ms_bg-dark text-white position-relative">
            <!-- IMMAGINE -->
            <img v-if="restaurant.cover_image" class="card-img-top object-fit-cover h-50"
              :src="`${this.store.baseUrl}/storage/${restaurant.cover_image}`" alt="immagine ristorante" />
            <img v-else class="card-img-top object-fit-cover h-50" src="../assets/images/noimg.png"
              alt="nessuna_immagine" />
            <!-- BADGE -->
            <div class="mt-3 px-1 d-flex flex-wrap gap-1">
              <span class="border border-2 rounded-2 px-1 border-0 ms_bg-yellow ms_color-dark fw-bold"
                v-for="tipo in restaurant.types">
                {{ tipo.name }}
              </span>
            </div>
            <!-- INFO RISTORANTE -->
            <div class="card-body h-50">
              <h3 class="card-title text-wrap">{{ restaurant.name }}</h3>
              <p class="card-text">{{ restaurant.description }}</p>
            </div>
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

  .hover-zoom {
    transition: all .3s ease-in-out;
    z-index: 1;
    padding: 1rem 1rem 0 1rem;

    &:hover {
      z-index: 2;
      transform: scale(1.05);
      transition: all .3s ease-in-out;
    }

    img {
      border-radius: 20px 20px 0 0px;
    }
  }
}
</style>