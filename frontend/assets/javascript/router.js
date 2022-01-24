import renderActivePage from "./page-render.js";
import * as init from "./initializer.js";
import * as storage from "./storage.js";

export const pages = [
  {
    name: "home",
    title: "Ben's Awesome Webshop | Home",
    rootPage: true,
    redirectFrom: true,
    needAuthentication: false,
  },

  {
    name: "cart",
    title: "Ben's Awesome Webshop | Cart",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: false,
  },

  {
    name: "orders",
    title: "Ben's Awesome Webshop | Orders",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: true,
  },

  {
    name: "category",
    title: "Ben's Awesome Webshop | Category",
    rootPage: false,
    redirectFrom: false,
    needAuthentication: false,
  },

  {
    name: "checkout",
    title: "Ben's Awesome Webshop | Checkout",
    rootPage: false,
    redirectFrom: false,
    needAuthentication: true,
  },

  {
    name: "product",
    title: "Ben's Awesome Webshop | Product",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: false,
  },

  // {
  //   name: "aboutus",
  //   title: "Ben's Awesome Webshop | About Us",
  //   rootPage: false,
  //   redirectFrom: true,
  //   needAuthentication: false,
  // },

  // {
  //   name: "contact",
  //   title: "Ben's Awesome Webshop | Contact",
  //   rootPage: false,
  //   redirectFrom: true,
  //   needAuthentication: false,
  // },

  {
    name: "account",
    title: "Ben's Awesome Webshop | My Account",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: true,
  },

  {
    name: "login-or-signup",
    title: "Ben's Awesome Webshop | Login or Signup",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: false,
  },

  {
    name: "404",
    title: "404 ERROR",
    rootPage: false,
    redirectFrom: true,
    needAuthentication: false,
  },
];
// A function that checks the URL change and lanch the render page function.
export async function direct() {
  const pageHash = window.location.hash.substr(1);
  const user = await storage.storageProxy.user;

  if (pageHash == "") {
    return await renderActivePage();
  }

  if (pageHash.includes("?") && !init.rootDiv.innerHTML.includes("div")) {
    return await renderActivePage();
  }

  if (
    !pageHash.includes("?") &&
    !pages.find((page) => page.name === pageHash)
  ) {
    return await renderActivePage("404");
  }

  pages.forEach(async (p) => {
    if (pageHash.includes(p.name) && p.redirectFrom) {
      if (p.needAuthentication && !user.loggedIn) {
        window.location.hash = "login-or-signup";
      } else {
        await renderActivePage(pageHash);
      }
    }
  });
}
