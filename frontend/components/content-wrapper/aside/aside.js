export async function render() {
  const fetchUrl = "http://localhost:3000/api/product/categories";

  async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  const productCategoryContainer = document.querySelector(
    ".aside-menu ul.category"
  );

  const category = await fetchData(fetchUrl);
  productCategoryContainer.innerHTML = "";
  let categoryHTML = '<li class="item"><a href="#home">All</a></li>';

  category.forEach((cat) => {
    categoryHTML += `
      <li class="item"><a href="#category?id=${cat.id}">${cat.productCategoryName}</a></li>
    `;
  });

  productCategoryContainer.insertAdjacentHTML("afterbegin", categoryHTML);

  window.addEventListener("hashchange", () => activeCategoryHiglighter());

  if (document.readyState !== "loading") {
    activeCategoryHiglighter();
  }

  function activeCategoryHiglighter(event) {
    const pageHash = window.location.hash.substr(1);

    if (pageHash.includes("category?")) {
      const allElements = document.querySelectorAll(`.category a`);
      const element = document.querySelector(
        `.category a[href='${window.location.hash}']`
      );
      const productGridContainerTitle = document.querySelector(
        ".product-wrapper .title"
      );

      allElements.forEach((e) => e.classList.remove("active"));
      element.classList.add("active");

      document.title = "Ben's Awesome Webshop | " + element.innerText;
      productGridContainerTitle.innerHTML = `<h3 class="title">${element.innerText}</h3>`;
    } else {
      return;
    }
  }
}
