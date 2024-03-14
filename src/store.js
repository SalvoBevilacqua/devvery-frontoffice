import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://127.0.0.1:8000",
  showModal: false,
  showError: false,
  total: 0,
  restaurants: [],
  myTypes: [],
  search: "",
  cartData: getCart(),
  checkedTypes: [],
  loading: true,
  foodsFound: [],
  menuEmpty: true,
  nameOfProductSelected: "",
});

function getCart() {
  return JSON.parse(localStorage.getItem("cartData")) || [];
}
