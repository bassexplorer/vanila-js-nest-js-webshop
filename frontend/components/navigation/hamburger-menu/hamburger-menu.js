import loadComponent from "../../../assets/javascript/component-loading.js";
import * as storage from "../../../assets/javascript/storage.js";
import { disableScroll, enableScroll } from "./prevent-scrolling.js";

const burgerMenuHTML = `
<div id="hamburgerMenu" class="sidenav">

  <a href="javascript:void(0)" class="closebtn" id="navClose">&times;</a>

  <ul class="pages">

      <li><a class="underline"
            href="#home">Home</a></li>

      <li><a class="underline"
            href="#aboutus">About Us</a></li>

      <li><a class="underline"
            href="#contact">Contact</a></li>

  </ul>

  <span class="menu-separator"></span>

      <div class="other">

          <a href="#cart" class="cart"> Cart
              <div class="cart-badge">1</div>
          </a>

          <div class="user-menus">

              <a href="#orders">Orders</a>

              <a href="#account">Account</a>
        
              <a href="#" class="logout"> Logout
                  <i class="fas fa-sign-out-alt"></i>
              </a>

          </div>
  
          <a href="#login-or-signup" class="login-or-signup"> Login
              <i class="fas fa-sign-in-alt">
          </a>


      </div>

  </div>`;

export async function render() {
  _initBurgerMenu();

  if (storage.storageProxy.user.loggedIn) {
    removeLoginIconFromSideNav();
  }
}

export function openNav() {
  document.getElementById("hamburgerMenu").style.width = "250px";
  document.querySelector("body#app").classList.add("nav-open");
  document.querySelector("body#app .menu-overlay").classList.add("nav-open");
  disableScroll();
}

export function closeNav() {
  document.getElementById("hamburgerMenu").style.width = "0";
  document.querySelector("body#app").classList.remove("nav-open");
  document.querySelector("body#app .menu-overlay").classList.remove("nav-open");
  enableScroll();
}

function _initBurgerMenu() {
  _inserBurgerMenu();
  _inserBurgerMenuOverlay();

  document.getElementById("navOpen").addEventListener("click", openNav);

  document.querySelector(".menu-overlay").addEventListener("click", closeNav);
  document
    .querySelectorAll("#hamburgerMenu a")
    .forEach((i) => i.addEventListener("click", closeNav));
}

function _inserBurgerMenu() {
  const isMenuAlreadyThere = document.querySelector("#hamburgerMenu");
  if (isMenuAlreadyThere) return;
  document.body.insertAdjacentHTML("beforebegin", burgerMenuHTML);
  const div = document.createElement("div");
  div.classList.add("menu-overlay");
  document.body.insertAdjacentElement("afterbegin", div);
}

function _inserBurgerMenuOverlay() {
  const isOverlayAlreadyThere = document.querySelector(".menu-overlay");
  if (isOverlayAlreadyThere) return;
  const div = document.createElement("div");
  div.classList.add("menu-overlay");
  document.body.insertAdjacentElement("afterbegin", div);
}

export function removeLoginIconFromSideNav() {
  document.querySelector("#hamburgerMenu .login-or-signup").style.display ="none";
  document.querySelector("#hamburgerMenu .user-menus").style.display ="flex";
}
