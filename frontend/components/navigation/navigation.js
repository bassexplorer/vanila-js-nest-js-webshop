import loadComponent from "../../assets/javascript/component-loading.js";

export async function render() {
  await loadComponent("normal-menu", "components/navigation");
  await loadComponent("hamburger-menu", "components/navigation");
}

