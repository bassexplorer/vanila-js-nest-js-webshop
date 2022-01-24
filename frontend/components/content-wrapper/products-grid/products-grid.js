import * as storage from "../../../assets/javascript/storage.js";

export async function render() {
  const fetchUrl = "http://localhost:3000/api/product";

  async function _fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  const products = await _fetchData(fetchUrl);
  const productGridContainer = document.querySelector(
    ".products-grid-container"
  );

  function _loadProducts(productsArray) {
    productGridContainer.innerHTML = "";
    let productsHTML = "";

    productsArray.forEach((p) => {
      productsHTML += `
    <div class="card">
      <div class="image-shadow">
        <img class="image" src="https://picsum.photos/200/200" alt="Image Description">
      </div>
    <div class="desc">
      <a class="category-name" href="#category?id=${p.productCategory.id}">${p.productCategory.productCategoryName}</a>

      <a class="title" href="#products?id=${p.id}">${p.name}</a>
      <span class="price">${p.price} ${p.currency.iso4217Iso}</span>
      <a class="btn black" data-product-id="${p.id}">Add to cart</a>
    </div>
  </div>
  `;
    });

    productGridContainer.insertAdjacentHTML("afterbegin", productsHTML);

    const addToCartButton = document.querySelectorAll(".card .btn");
    // const cartButton = document.querySelector("nav.main .cart");

    function addToCartFunc({ target }) {
      const productId = target.getAttribute("data-product-id");
      const produtToCart = products.find((p) => p.id == productId);

      const wannaBeInTheCart = {
        id: produtToCart.id,
        name: produtToCart.name,
        unitPrice: produtToCart.price,
        price: produtToCart.price,
        quantity: 1,
        currency: produtToCart.currency.iso4217Iso,
        categoryName: produtToCart.productCategory.productCategoryName,
      };

      storage.storageProxy.cart = wannaBeInTheCart;
    }

    addToCartButton.forEach((btn) => {
      btn.addEventListener("click", addToCartFunc);
    });
  }

  _loadProducts(products);

  window.addEventListener("hashchange", () => _loadDifferentCategories());

  if (document.readyState !== "loading") {
    _loadDifferentCategories();
  }

  function _loadDifferentCategories(event) {
    const pageHash = window.location.hash.substr(1);

    if (pageHash.includes("?")) {
      const querryParam = pageHash.split("?")[1].split("=");

      if (pageHash.split("?")[0] == "category") {
        const filteredProducts = products.filter(
          (p) => p.productCategory.id == querryParam[1]
        );

        _loadProducts(filteredProducts);
        if (!filteredProducts[0]) {
          productGridContainer.insertAdjacentHTML(
            "afterbegin",
            `<div class="bad-news">No products in this category...yet! 😥</div>`
          );
        }
      }
    } else {
      return;
    }
  }
}
