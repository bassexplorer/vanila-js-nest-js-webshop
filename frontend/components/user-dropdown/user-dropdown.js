import { storageProxy } from "../../assets/javascript/storage.js";
import logoutUser from "../login-or-signup/login-or-signup.js";

export async function render() {
  if (storageProxy.user.loggedIn) {
    const userIcon = document.querySelector("nav.main .dropdown");
    if (userIcon) {
      userIcon.style.display = "flex";
      _initDropdown();
      _initLogoutListener();
    }
  }
}

function _initDropdown() {
  document.querySelector("nav.main .dropdown").addEventListener("click", () => {
    const dropdownList = document.querySelector("nav.main #userDropdown");
    dropdownList.classList.toggle("show");
  });
}

function _initLogoutListener() {
  document
    .querySelector("nav.main .dropdown .logout")
    .addEventListener("click", (e) => {
      e.preventDefault();

      logoutUser();
    });
}

export function removeAccountMenu() {
  document.querySelector("nav.main .dropdown").style.display = "none";
}
