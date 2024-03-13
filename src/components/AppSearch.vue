<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  created() {
    axios.get(`${this.store.baseUrl}/api/types`).then((resp) => {
      this.store.myTypes = resp.data.result;
      this.store.loading = false;
    });
  },
  methods: {
    getImagepath(img) {
      return new URL(`../assets/images/type_in_search/${img}.jpg`, import.meta.url).href;
    },
    filteredRestaurants() {
      this.store.checkedTypes = [];
      this.store.restaurants = [];
      if (this.store.search !== "") {
        this.store.loading = true;
        axios.get(`${this.store.baseUrl}/api/restaurants/searchText/${this.store.search}`)
          .then((resp) => {
            this.store.restaurants = resp.data.result;
          })
          .finally(() => {
            this.store.loading = false;
          });
      }
    },
    checkTypes() {
      this.store.loading = true;
      this.store.restaurants = [];

      if (this.store.checkedTypes.length > 0) {
        let data = [];
        this.store.checkedTypes.forEach((element) => {
          data.push(element.name);
        });
        const params = { types: data };
        axios.get(`${this.store.baseUrl}/api/restaurants/types`, { params })
          .then((resp) => {
            if (!(typeof resp.data.result === 'string')) {
              this.store.restaurants = resp.data.result;
            }
          })
          .finally(() => {
            this.store.loading = false;
            this.scrollToResult();
          })
      }
    },
    scrollToResult() {
      const resultElement = document.getElementById("result");

      if (resultElement) {
        // Calcola la posizione dell'elemento rispetto al top della pagina
        const offsetTop = resultElement.offsetTop;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  },
};
</script>

<template>
  <div class="container">
    <div id="title" class="text-center">
      <p class="fw-semibold">Il cibo che vuoi, quando vuoi...</p>
    </div>
    <div class="d-flex justify-content-center mt-5" v-if="store.checkedTypes.length === 0">
      <div class="input-group w-75 ms_width">
        <label class="input-group-text text-warning rounded-4 rounded-end-0" id="basic-addon1" for="search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </label>
        <input type="text" class="form-control bg-white rounded-4 rounded-start-0" placeholder="Cerca un Ristorante"
          aria-label="search" aria-describedby="basic-addon1" id="search" v-model="store.search"
          @input="filteredRestaurants" @keydown.enter.prevent="scrollToResult">
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-4 justify-content-between mt-4"
      :class="{ 'ms_margin_top': store.checkedTypes.length != 0 }" v-if="store.search.length === 0">
      <div v-for="myType in store.myTypes" class="checkbox-wrapper-10 position-relative ms_margin">
        <input v-bind:disabled="store.search.length > 0" v-model="store.checkedTypes" @change="checkTypes"
          :value="myType" class="tgl tgl-flip z-2" :id="`cb5-${myType.name}`" type="checkbox" />
        <label class="tgl-btn fs-5 z-2" :data-tg-off="myType.name" :data-tg-on="myType.name"
          :for="`cb5-${myType.name}`"></label>
        <img @click="$event.target.previousElementSibling.click()"
          class="border border-2 border-warning position-absolute start-50 translate-middle rounded-circle z-1 object-fit-cover"
          :src="getImagepath(myType.name)" :alt="myType.name" />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables/variables.scss" as *;

.checkbox-wrapper-10 img {
  cursor: pointer;
}

.container {
  padding-top: 5rem;
  padding-bottom: 6rem;

  #title {
    font-size: 3rem;
    color: $ms_yellow;
  }

  .ms_margin {
    margin-top: 10rem;
  }

  img {
    top: -65%;
    width: 130px;
    aspect-ratio: 1;
  }

  .hover-zoom {
    transition: all .3s ease-in-out;
    z-index: 1;
    padding: 1rem 1rem 0 1rem;

    img {
      border-radius: 20px 20px 0 0px;
    }

    &:hover {
      z-index: 2;
      transform: scale(1.05);
      transition: all .3s ease-in-out;
    }
  }

  // SEARCHBAR SHADOW
  .form-control:focus {
    box-shadow: none;
    border: 1px solid white;
    outline: none;
  }

  // CHECKBOX
  .checkbox-wrapper-10 .tgl {
    display: none;
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn {
    box-sizing: border-box;
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn::selection {
    background: none;
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn {
    outline: 0;
    display: block;
    width: 150px;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    //aggiunto per non modificare classi interne alle checkbox
    margin: 0 auto;

    @media screen and (max-width: 600px) {
      width: 135px;
    }
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn:after,
  .checkbox-wrapper-10 .tgl+.tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn:after {
    left: 0;
  }

  .checkbox-wrapper-10 .tgl+.tgl-btn:before {
    display: none;
  }

  .checkbox-wrapper-10 .tgl:checked+.tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-10 .tgl-flip+.tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 200px;
    font-size: 2rem;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  .checkbox-wrapper-10 .tgl-flip+.tgl-btn:after,
  .checkbox-wrapper-10 .tgl-flip+.tgl-btn:before {
    display: inline-block;
    padding: 0 .5rem 0 .5rem;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 10px;
  }

  .checkbox-wrapper-10 .tgl-flip+.tgl-btn:after {
    content: attr(data-tg-on);
    background: $ms_yellow;
    transform: rotateY(-180deg);
  }

  .checkbox-wrapper-10 .tgl-flip+.tgl-btn:before {
    background: $ms_dark;
    content: attr(data-tg-off);
  }

  .checkbox-wrapper-10 .tgl-flip+.tgl-btn:active:before {
    transform: rotateY(-20deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:before {
    transform: rotateY(180deg);
  }

  .checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: $ms_yellow;
    color: $ms_dark;
  }

  .checkbox-wrapper-10 .tgl-flip:checked+.tgl-btn:active:after {
    transform: rotateY(20deg);
  }

  // MEDIA QUERY SEARCHBAR
  @media screen and (min-width: 768px) {
    .ms_width {
      width: 50% !important;
    }
  }

  @media screen and (min-width: 1200px) {
    .ms_width {
      width: 30% !important;
    }
  }
}
</style>
