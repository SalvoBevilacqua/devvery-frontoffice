<script>
import axios from "axios";
import { store } from "../store";
import { RouterLink } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
export default {
  data() {
    return {
      store,
    };
  },
  components: {
    AppHeader,
  },
  created() {
    axios
      .get(`${this.store.baseUrl}/api/restaurants/` + this.$route.params.slug)
      .then((resp) => {
        if (resp.data.foods) {
          if (resp.data.foods.length > 0) {
            this.store.foodsFound = resp.data.foods;
            this.store.menuEmpty = false;
          } else {
            this.store.menuEmpty = true;
          }
        } else {
          this.$router.push('/not-found');
        }
      });
  },
  methods: {
    showModal() {
      this.store.showModal = true;
      setTimeout(() => {
        this.store.showModal = false;
      }, 1000);
    },
    addtoCart(product) {
      this.store.nameOfProductSelected = "";
      this.store.nameOfProductSelected = product.name;
      const existingProduct = this.store.cartData.find(
        (item) => item.id == product.id
      );
      const myProduct = {
        id: product.id,
        restaurant_id: product.restaurant_id,
        restaurant_name: product.restaurant.name,
        restaurant_slug: product.restaurant.slug,
        name: product.name,
        price: product.price,
        quantity: 1,
      };

      if (this.store.cartData[0] && myProduct.restaurant_id !== this.store.cartData[0].restaurant_id) {
        this.store.showError = true;
      } else if (existingProduct) {
        existingProduct.quantity++;
        this.showModal();
      } else {
        this.store.cartData.push(myProduct);
        this.showModal()
      }

      localStorage.setItem("cartData", JSON.stringify(this.store.cartData));
    },
    close() {
      this.store.showError = false;
    }
  },
};
</script>

<template>
  <AppHeader />

  <div v-if="!store.menuEmpty" class="position-relative">
    <div class="container my-5">
      <!-- INFO RISTORANTE -->
      <div class="ms_restaurant d-flex flex-column flex-sm-row justify-content-center gap-3 mb-5 align-items-center">
        <!-- IMMAGINE -->
        <img v-if="store.foodsFound[0].restaurant.cover_image"
          :src="`${store.baseUrl}/storage/${store.foodsFound[0].restaurant.cover_image}`"
          class="h-100 rounded-4 object-fit-cover" alt="Immagine del ristorante">
        <img v-else class="h-100 rounded-4" src="../assets/images/noimg.png" alt="immagine non trovata">
        <!-- INFO -->
        <div class="ms_restaurant-info">
          <h1 class="ms_color-dark">{{ store.foodsFound[0].restaurant.name }}</h1>
          <p class="fs-5 ms_color-dark"><i class="fa-solid fa-location-dot"></i>
            {{ store.foodsFound[0].restaurant.address }}
          </p>
          <p class="fs-5 ms_color-dark"><i class="fa-solid fa-phone-flip"></i>
            {{ store.foodsFound[0].restaurant.phone }}
          </p>
        </div>
      </div>

      <!-- MENU -->
      <div class="row row-cols-1 row-cols-sm-2">
        <!-- CARD -->
        <div v-for="food in store.foodsFound" class="col mb-3 hover-zoom">
          <div class="card position-relative h-100 border-0 rounded-4 bg-light">
            <div class="row g-0 h-100">
              <div class="col-md-4">
                <img v-if="food.cover_image" :src="`${store.baseUrl}/storage/${food.cover_image}`"
                  class="img-fluid rounded-start-4 h-100 object-fit-cover" :alt="food.name">
                <img v-else src="../assets/images/noimg.png" class="img-fluid rounded-start" alt="immagine non trovata">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ food.name }}</h5>
                  <p class="card-text">{{ food.description }}</p>
                  <p class="card-text">{{ food.price }} €</p>
                  <p class="card-text">
                    <small v-if="food.celiac === 1 && food.vegan === 0" class="text-body-secondary">Gluten Free</small>
                    <small v-if="food.vegan === 1 && food.celiac === 0" class="text-body-secondary">Vegano</small>
                    <small v-if="food.vegan === 1 && food.celiac === 1" class="text-body-secondary">Gluten Free e
                      Vegano</small>
                  </p>
                </div>
              </div>
            </div>
            <!-- BOTTONI -->
            <button @click="addtoCart(food)"
              class="btn position-absolute bottom-0 end-0 border-0 rounded-4 ms_btn-yellow">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <transition class="text-center ms_modal-text" name="fade">
      <div v-if="store.showModal || store.showError" :class="store.showModal ? 'modal-correct' : 'modal-error'"
        class="d-flex modal align-items-center justify-content-center">

        <div v-if="store.showModal" class="px-5 py-3 bg-white border border-3 rounded-4 border-black">
          <p class="fs-5">
            <strong class="ms_color-dark fs-4">{{ store.nameOfProductSelected }}</strong>
            <br>
            <span>aggiunto al carrello!</span>
          </p>
        </div>

        <div v-if="store.showError"
          class="position-absolute top-50 start-50 translate-middle bg-white border border-3 rounded-5 border-black">
          <button type="button" class="btn fs-3 p-5" @click="close">
            Non puoi ordinare da due ristoranti diversi!
          </button>

        </div>
      </div>
    </transition>

  </div>

  <div v-else>
    <h2 class="text-center">Il ristorante non dispone ancora di un menù</h2>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables/variables.scss" as *;

.container {
  .ms_restaurant {
    height: 8rem;
  }

  i {
    width: 1.5rem;
  }

  .ms_btn-yellow {
    padding: 0.7rem;
    font-weight: bold;
    border-top-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;

    &:hover {
      background-color: $ms_dark;
    }
  }

  .hover-zoom {
    transition: all 0.3s ease-in-out;

    &:hover {
      z-index: 1;
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
}

@media screen and (max-width: 576px) {
  .ms_restaurant {
    padding: 1.5rem;
    height: unset !important;
    width: 100%;
  }
}

/* Styling for the modal */
.modal-correct {
  padding: 0 2rem;
  position: fixed;
  margin-top: 70vh;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  height: fit-content;
  z-index: 2;
}

.modal-error {
  display: none;
  z-index: 2;
  backdrop-filter: blur(5px);
}

/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
