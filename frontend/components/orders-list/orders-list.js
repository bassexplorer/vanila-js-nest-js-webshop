import * as storage from "../../assets/javascript/storage.js";
import logoutUser from "../login-or-signup/login-or-signup.js";
export async function render() {
  const userToken = storage.storageProxy.user.token;

  const response = await fetch("http://localhost:3000/api/orders/of-customer", {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  });

  if(response.status === 401){
    logoutUser();
  }

  const responseJson = await response.json();

  let ordersInOrder = "";

  responseJson.forEach(({ invoicelines, currency, ...invoice }) => {
    const invoicelinesHtml = generateInvoiceLinesFromTemlate(
      invoicelines,
      currency
    );

    ordersInOrder += `
    <div class="item">
        <a class="collapsible">
            <div class="placed">
                  <div>ORDER PLACED</div>
                  <div>${invoice.createdAt}</div>
            </div>
            <div class="total-sum">
                  <div>TOTAL</div>
                  <div> ${invoice.createdAt}</div>
            </div>

            <div class="dispatched-to">
                  <div>DISPATCH TO</div>
                  <div>${invoice.name}</div>
            </div>
            <div class="order-number">
                  <div>ORDER NUMBER</div>
                  <div> ${invoice.id}</div>
            </div>
        </a>
        
        <div class="content-wrapper">
          ${invoicelinesHtml}
        </div>
 
    </div>
    `;
  });

  const ordersListContainer = document.querySelector(".orders-in-list");

  if (ordersInOrder == "")
    ordersInOrder = '<div class="no-products"> No money wasted yet! :( </div>';
  ordersListContainer.innerHTML = ordersInOrder;

  expansionPanelInitialize();
}

function expansionPanelInitialize() {
  const panel = document.querySelectorAll(".orders-list .collapsible");

  panel.forEach((p) => {
    p.addEventListener("click", function () {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
}

function generateInvoiceLinesFromTemlate(invoicelines, currency) {
  let invoiceLines = "";

  invoicelines.forEach((ivl) => {
    invoiceLines += ` 
    <div class="content">
       <div class="image">
            <img src="https://picsum.photos/70/70"
                 alt="" />
       </div>

       <div class="description">
            <span>${ivl.product.name}</span>
            <span>${ivl.product.price} ${ivl.product.currency.iso4217Iso} / piece</span>
            <span>${ivl.product.productCategory.productCategoryName}</span>
       </div>

       <div class="quantity">
       ${ivl.quantity}
       </div>

       <div class="total-price">${ivl.price} ${currency.iso4217Iso}</div>
       </div>
  `;
  });

  return invoiceLines;
}
