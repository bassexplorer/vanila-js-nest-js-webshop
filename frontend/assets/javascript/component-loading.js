import * as router from "./router.js";
import * as init from "./initializer.js";
import fetchHtmlFile from "./helper.js";

export default async function loadComponent(
  nameOfComponent,
  locationOfComponentFolder
) {
  const components = document.querySelectorAll(".component-" + nameOfComponent);

  async function load(c) {
    const { name, ext, script } = c.dataset;
    const fileLocation = !locationOfComponentFolder
      ? `components/${name}`
      : locationOfComponentFolder + `/${name}`;

    _loadStyles(`${fileLocation}/${name}.css`);

    const hasScriptFile = script === "true";
    const html = await fetchHtmlFile(`${fileLocation}/${name}.html`);

    c.insertAdjacentHTML("beforebegin", html);
    c.parentNode.removeChild(c);

    if (hasScriptFile) {
      const module = await import(`../../${fileLocation}/${name}.js`);

      module.render();
    }
  }

  await [...components].forEach(load);
}

function _loadStyles(fileLocation) {
  const head = document.getElementsByTagName("head")[0];

  // find the tag that contains tha previous styles file url.
  const stylesSrc = head.querySelectorAll('[data-type="styles"]');
  // if it is exist then remove it from the head

  let exist = false;
  stylesSrc.forEach((s) => {
    if (s.href.includes(fileLocation)) exist = true;
  });

  if (exist) return;
  const stylesTag = document.createElement("link");
  stylesTag.dataset.type = "styles";
  stylesTag.rel = "stylesheet";
  stylesTag.href = fileLocation;
  head.appendChild(stylesTag);
}
