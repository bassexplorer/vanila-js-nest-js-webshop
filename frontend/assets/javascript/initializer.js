import * as router from "./router.js";
import * as storage from "./storage.js";

const viewUrl = "views/"; // source where the html files are located
const rootDiv = document.getElementById("app"); // Main div that containts the site

export { viewUrl, rootDiv };

export default async function init() {
  storage.autoloadLocalStorage();

  window.addEventListener("hashchange", async (e) => {
    await router.direct();
  });

  if (document.readyState !== "loading") {
    await router.direct();
  }
}

