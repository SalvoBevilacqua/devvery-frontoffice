<script>
import AppCart from "./AppCart.vue";
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppCart,
  },
  methods: {
    closeModal() {
      this.store.showModal = false;
      this.store.showError = false;
    },
  },
  computed: {
    numberOfProducts() {
      return this.store.cartData.reduce((totale, item) => totale + item.quantity, 0);
    }
  },
}
</script>

<template>
  <header class="d-flex justify-content-center mt-5">
    <nav class="navbar bg-white w-75 rounded-5 border border-2 border-white"
      :class="$route.path !== '/' ? 'ms_border-color' : ''">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'home' }">
          <img src="../assets/images/main/logotipo.png" alt="" />
        </router-link>

        <div class="d-flex gap-3 ms_color-dark">
          <router-link v-if="$route.path !== '/'" to="/" class="btn btn-warning fw-bold ms_go-back">
            Torna indietro
          </router-link>

          <button v-if="$route.path !== '/shipment'"
            class="ms_button_cart navbar-toggler border-2 d-flex gap-1 align-items-center" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation" @click="closeModal()">

            <span v-if="store.cartData.length != 0" class="fw-bold ms_color-dark">
              {{ numberOfProducts }}
            </span>

            <i class="fa-solid fa-cart-shopping ms_color-dark"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
    <div class="offcanvas-header d-flex justify-content-between align-items-center">
      <h2 class="offcanvas-title" id="offcanvasNavbarLabel">Il tuo carrello</h2>
      <button type="button" class="btn" data-bs-dismiss="offcanvas" aria-label="Close">
        <i class="fa-solid fa-circle-xmark text-white fs-3"></i>
      </button>
    </div>

    <div class="offcanvas-body">
      <AppCart />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables/variables.scss" as *;

@media screen and (max-width: 768px) {
  .ms_go-back {
    display: none;
  }
}

.ms_border-color {
  border-color: $ms_dark !important;
}

img {
  height: 2rem;
}

.ms_button_cart {
  border-color: $ms_dark;

  &:hover {
    border-color: white;
    background-color: $ms_yellow;
    color: white;

    i {
      color: white;
    }

    .ms_color-dark {
      color: white;
    }
  }
}

.offcanvas-header {
  background-color: $ms_dark;
  color: white;
}

// CART SHADOW
.navbar-toggler:focus {
  box-shadow: none;
}
</style>
