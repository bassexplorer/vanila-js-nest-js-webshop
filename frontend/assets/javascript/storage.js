import { removeLoginIconFromSideNav } from "../../components/navigation/hamburger-menu/hamburger-menu.js";
import { removeLoginIconFromNormalNav } from "../../components/navigation/normal-menu/normal-menu.js";
import { removeAccountMenu } from "../../components/user-dropdown/user-dropdown.js";

const _localStorage = window.localStorage;

const _currentSession = {
  cart: [],
  user: {},
};

if (!_localStorage.getItem("session")) {
  _localStorage.setItem("session", JSON.stringify(_currentSession));
}

/**
 *This function make the cart badge visible
 *
 * @param {*} numOfProducts
 */
function _showCartBadge(numOfProducts) {
  const cartButton = document.querySelector("ul li .cart");
  if (numOfProducts < 1) {
    cartButton.classList.remove("item-in-cart");
    cartButton.querySelector(".cart-badge").innerHTML = numOfProducts;
  } else {
    cartButton.classList.add("item-in-cart");
    cartButton.querySelector(".cart-badge").innerHTML = numOfProducts;
  }
}

/**
 *
 * THis function update the local storage content
 * based on the app session, so after every reload
 * the app show the correct state.
 * @param {*} obj
 * @param {*} value
 */
function _updateStorageAndCart(obj, value) {
  _showCartBadge(obj.cart.length);
  _localStorage.session = JSON.stringify(obj);

  const quantityDiv = document.querySelector(
    `[data-product-id="${value.id}"].item .quantity input`
  );

  const priceDiv = document.querySelector(
    `[data-product-id="${value.id}"].item .total-price`
  );
  if (!quantityDiv && !priceDiv) return;
  priceDiv.innerHTML =
    parseFloat(value.unitPrice) * parseInt(value.quantity) +
    " " +
    value.currency;
  quantityDiv.value = value.quantity;
}
/**
 * Remove Item from list on cart page
 *
 * @param {*} obj
 * @param {*} prodId
 */
function _removeElementFromCart(value, obj) {
  const indexOfElement = obj.cart.indexOf(value);
  obj.cart.splice(indexOfElement, 1);

  const parentDiv = document.querySelector(".container .products-in-cart");
  if (!parentDiv) return;

  const checkoutBtn = document.querySelector(
    ".shopping-cart.container .btn.black"
  );
  if (!obj.cart[0]) checkoutBtn.disabled = true;

  const itemToDelete = document.querySelector(
    `[data-product-id="${value.id}"].item`
  );
  parentDiv.removeChild(itemToDelete);

  if (!storageProxy.cart[0])
    parentDiv.innerHTML =
      '<div class="no-products"> No products in the cart yet! :) </div>';
}

/**
 * This proxy helps broadcast events
 * to other components or from other components
 *
 *
 * */
const storageProxy = new Proxy(_currentSession, {
  set: function (obj, prop, value) {
    switch (prop) {
      case "loadLocalstorage":
        obj.cart = !value ? [] : value.cart;
        obj.user = !value ? {} : value.user;

        // _showCartBadge(obj.cart.length);
        return true;
      case "cart":
        const alreadyExists = obj.cart.find(
          (cartItem) => cartItem.id == value.id
        );

        if (!alreadyExists) {
          obj.cart.push(value);
        } else {
          alreadyExists.quantity += 1;
          alreadyExists.price =
            parseFloat(alreadyExists.price) +
            parseFloat(alreadyExists.unitPrice);
        }

        _showCartBadge(obj.cart.length);
        _localStorage.session = JSON.stringify(obj);
        return true;
      case "increaseQuantity":
        const prodToIncrease = obj.cart.find((p) => p.id == value.id);
        prodToIncrease.quantity += 1;
        prodToIncrease.price =
          parseFloat(prodToIncrease.price) +
          parseFloat(prodToIncrease.unitPrice);

        _updateStorageAndCart(obj, value);
        return true;
      case "decreaseQuantity":
        const prodToDecrease = obj.cart.find((p) => p.id == value.id);

        if (prodToDecrease.quantity == 1) {
          _removeElementFromCart(value, obj);
        } else {
          prodToDecrease.quantity -= 1;
          prodToDecrease.price =
            parseFloat(prodToDecrease.price) -
            parseFloat(prodToDecrease.unitPrice);
        }
        _updateStorageAndCart(obj, value);
        return true;
      case "removeItem":
        _removeElementFromCart(value, obj);
        _updateStorageAndCart(obj, value);
        return true;
      case "empty":
        obj.cart = [];
        _localStorage.session = JSON.stringify(obj);
        _showCartBadge(0);
        return true;

      case "user":
        obj.user = value;
        _localStorage.session = JSON.stringify(obj);
        // removeAccountMenu();
        removeLoginIconFromNormalNav();
        removeLoginIconFromSideNav();
        return true;
    }
  },
  get: function (obj, prop) {
    if (prop == "cart") {
      return obj.cart;
    }
    if (prop == "user") {
      return obj.user;
    }
  },
});

/**
 * Auto load cart content from local storage of the browser
 *  this started from the navigation component after it is loaded
 */
function autoloadLocalStorage() {
  const sessionStorageContent = JSON.parse(_localStorage.getItem("session"));
  storageProxy.loadLocalstorage = sessionStorageContent;
}

const setCartBadge = () => _showCartBadge(storageProxy.cart.length);

export { storageProxy, autoloadLocalStorage, setCartBadge };
