import * as storage from "../../../assets/javascript/storage.js";
import loadComponent from "../../../assets/javascript/component-loading.js";

export async function render() {
  await loadComponent("dropdown");
  
  window.addEventListener("hashchange", () => _activeMenuItemHiglighter());
  
  if (document.readyState !== "loading") {
    _activeMenuItemHiglighter();
  }
  storage.setCartBadge();

  if (storage.storageProxy.user.loggedIn) {
    removeLoginIconFromNormalNav();
  }
}

function _activeMenuItemHiglighter(event) {
  const pageHash = window.location.hash.substr(1);

  if (!pageHash.includes("?")) {
    const allElements = document.querySelectorAll(`nav.main ul a`);

    const element = document.querySelector(
      `nav.main ul a[href='${window.location.hash}']`
    );

    allElements.forEach((e) => e.classList.remove("active"));
    if (!element)
      document.querySelector("a[href='#home']").classList.add("active");
    else element.classList.add("active");
  } else {
    return;
  }
}


export function removeLoginIconFromNormalNav() {
  document.querySelector("nav.main .login-or-signup").style.display = "none";
}