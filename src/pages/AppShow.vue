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
        this.store.showModal = true;
        setTimeout(() => {
          this.store.showModal = false;
        }, 3200);
      } else {
        this.store.cartData.push(myProduct);
        this.store.showModal = true;
        setTimeout(() => {
          this.store.showModal = false;
        }, 3200);
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

  <div v-if="!store.menuEmpty">
    <div class="container my-4">
      <!-- INFO RISTORANTE -->
      <div class="ms_restaurant d-flex justify-content-center gap-3 mb-4">
        <!-- IMMAGINE -->
        <img v-if="store.foodsFound[0].restaurant.cover_image"
          :src="`${store.baseUrl}/storage/${store.foodsFound[0].restaurant.cover_image}`" class="h-100 rounded-4"
          alt="Immagine del ristorante">
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
      <!-- AGGIUNGERE PER CELIACI E VEGANI -->
      <div class="row row-cols-1 row-cols-sm-2">
        <!-- CARD RISTORANTE -->
        <div v-for="food in store.foodsFound" class="col">
          <div class="card hover-zoom border-0 ms_bg-dark h-100 rounded-4">
            <!-- IMMAGINE -->
            <img v-if="food.cover_image" :src="`http://127.0.0.1:8000/storage/${food.cover_image}`"
              class="h-100 object-fit-cover" :alt="`Immagine di ${food.name}`">
            <img v-else src="../assets/images/noimg.png" class="h-100 object-fit-cover" alt="immagine non trovata">
            <!-- BODY -->
            <div>
              <h5 class="card-title text-light">{{ food.name }}</h5>
              <p class="card-text ms_description text-light">{{ food.description }}</p>
              <p class="card-text text-light">{{ food.price }} €</p>
            </div>
            <!-- BOTTONI -->
            <div>
              <button @click="addtoCart(food)" class="btn ms_btn-yellow position-absolute bottom-0 end-0">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <transition class="text-center ms_modal-text" name="fade">
      <div v-if="store.showModal || store.showError" :class="store.showModal ? 'modal-correct' : 'modal-error'"
        class="active d-flex modal align-items-center justify-content-center">
        <div v-if="store.showModal" class="modal-content text-white p-5">
          <p class="fs-5"><strong class="ms_color-yellow p-1 fs-4">{{ store.nameOfProductSelected }}</strong> aggiunto
            al carrello!</p>
        </div>
        <div v-if="store.showError"
          class="err-content text-center p-5 d-flex flex-row justify-content-center position-relative align-items-center">

          <button type="button" class="btn ms_btn-red position-absolute top-0 end-0" @click="close">
            <i class="fa-solid fa-x"></i>
          </button>

          <p class="fs-3">Non puoi ordinare da due ristoranti diversi!</p>
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
    border-radius: 6px 0 6px 0;
    padding: 0.7rem;
    font-weight: bold;
  }

  .hover-zoom {
    transition: all 0.3s ease-in-out;
    z-index: 1;

    &:hover {
      z-index: 2;
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
}

/* Styling for the modal */
.ms_modal-text {
  @media screen and (min-width: 576px) {
    width: 50% !important;
  }
}

.modal-correct {
  position: fixed;
  margin-top: 70vh;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content !important;
  display: none;
  justify-content: center;
  align-items: center;
  height: fit-content;
  z-index: 2;
}

.modal-error {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100% !important;
  display: none;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 2;
  backdrop-filter: blur(5px);
  padding: 10%;
}

.active {
  display: flex;
}

.modal-content {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.9);
}

.err-content {
  border-radius: 10px;
  background-color: white;
  color: $ms_dark;
  border: 5px solid $ms_yellow;
  font-weight: bolder;
}

.ms_btn-red {
  background-color: rgba(255, 255, 255, 0);
  color: $ms_dark;
  border: 0;
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
