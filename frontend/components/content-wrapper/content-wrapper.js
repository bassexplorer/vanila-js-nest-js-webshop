import loadComponent from "../../assets/javascript/component-loading.js";

export async function render() {
  await loadComponent("content", "components/content-wrapper");
}
