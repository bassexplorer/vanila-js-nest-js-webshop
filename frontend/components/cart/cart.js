import * as storage from "../../assets/javascript/storage.js";
import loadComponent from "../../assets/javascript/component-loading.js";

export async function render() {
  _loadCart();
  _addQuantityBtns();
  _calculateTotalPrice();
}

async function _loadCart() {
  let html = "";
  const cartItemListCont = document.querySelector(
    ".container .products-in-cart"
  );

  const checkoutBtn = document.querySelector(
    ".shopping-cart.container .btn.black"
  );

  if (!storage.storageProxy.cart[0]) checkoutBtn.disabled = true;

  checkoutBtn.addEventListener("click", () => _goToCheckout());

  storage.storageProxy.cart.forEach((item) => {
    html += _itemWithValues(item);
  });
  if (!storage.storageProxy.cart[0])
    html = '<div class="no-products"> No products in the cart yet! :) </div>';
  cartItemListCont.insertAdjacentHTML("afterbegin", html);
}

function _itemWithValues(item) {
  return `
  <div class="item" data-product-id="${item.id}">
  
      <div class="buttons">
          <i class="fas fa-times" data-product-id="${item.id}"></i>
          <!---- <span class="like-btn"></span> ----->
      </div>

      <div class="image">
          <img src="https://picsum.photos/70/70"
              alt="" /> 
      </div>

      <div class="description">
          <span>${item.name}</span>
          <span>${item.unitPrice} ${item.currency} / piece</span>
          <span>${item.categoryName}</span>
      </div>

      <div class="quantity">
          <button class="plus-btn"
                  type="button" data-product-id="${item.id}">
              <i class="fas fa-plus"></i>
          </button>
          <input type="text"
                  name="name"
                  value="${item.quantity}">

          <button class="minus-btn"
          data-product-id="${item.id}"
                  type="button">
              <i class="fas fa-minus"></i>
          </button>
      </div>

      <div class="total-price">${item.price} ${item.currency}</div>
  </div>
  `;
}

function _addQuantityBtns() {
  document.querySelectorAll("button.minus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const prod = storage.storageProxy.cart.find(
        (pro) => pro.id == btn.dataset.productId
      );
      storage.storageProxy.decreaseQuantity = prod;
      _calculateTotalPrice();
    });
  });
  document.querySelectorAll("button.plus-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const prod = storage.storageProxy.cart.find(
        (pro) => pro.id == btn.dataset.productId
      );
      storage.storageProxy.increaseQuantity = prod;
      _calculateTotalPrice();
    });
  });

  document.querySelectorAll(".buttons .fas.fa-times").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const prod = storage.storageProxy.cart.find(
        (pro) => pro.id == btn.dataset.productId
      );
      storage.storageProxy.removeItem = prod;
      _calculateTotalPrice();
    });
  });
}

function _calculateTotalPrice() {
  const totalPriceContainer = document.getElementById("totalPrice");

  const totalPrice = storage.storageProxy.cart.reduce(
    (previousValue, currentValue) => {
      return previousValue + parseFloat(currentValue.price);
    },
    0
  );

  totalPriceContainer.innerHTML = totalPrice + " DKK";
}

async function _goToCheckout() {
  if (!storage.storageProxy.user.loggedIn) {
    return (window.location.hash = "login-or-signup");
  }

  const div = `
  <div class="component-checkout"
  data-name="checkout"
  data-script=true
  data-ext="html"></div>
  `;

  const shoppingCartContainer = document.querySelector(
    ".shopping-cart.container"
  );

  shoppingCartContainer.insertAdjacentHTML("beforebegin", div);

  await loadComponent("checkout");
  shoppingCartContainer.remove();

  const pageHash = (window.location.hash = "checkout");
}
