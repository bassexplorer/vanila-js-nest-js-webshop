import * as storage from "../../assets/javascript/storage.js";
import logoutUser from "../login-or-signup/login-or-signup.js";

export async function render() {
  document
    .querySelector(".checkout.container a.btn.black")
    .addEventListener("click", async (e) => {
      await _dispatchOrder(e);
    });
}

async function _dispatchOrder(e) {
  e.preventDefault();
  const form = document.getElementById("checkout");
  const formData = new FormData(form);

  let isInvalid = false;
  isInvalid = validateForm(formData);

  if (isInvalid) return;
  document
    .querySelector(".checkout.container .submitting")
    .classList.add("active");

  const today = new Date();
  today.setDate(today.getMonth() + 2);
  const orderObject = {
    invoiceNumber: 1,
    paid: false,
    paidDate: null,
    dueDate: today.toISOString(),
    comment: formData.get("comment"),
    currencyId: "c000eba0-5ea2-11ec-bf63-0242ac130002",

    name: formData.get("name"),
    address: formData.get("address"),
    zipcode: formData.get("zipcode"),
    city: formData.get("city"),
    country: formData.get("country"),

    invoicelines: [],
  };

  storage.storageProxy.cart.forEach((item) => {
    orderObject.invoicelines.push({
      productId: item.id,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity),
    });
  });

  const userToken = storage.storageProxy.user.token;

  const response = await fetch("http://localhost:3000/api/orders/insert", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderObject),
  });

  if (response.status === 401) {
    logoutUser();
  }

  if (response.status == 201)
    await _stopLoadingAndShowMessage("minden is fasza :D", false);
  else await _stopLoadingAndShowMessage(response.statusText, true);
}

async function _stopLoadingAndShowMessage(message, isError) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (isError) return;

  document
    .querySelector(".checkout.container .submitting")
    .classList.remove("active");

  storage.storageProxy.empty = true;

  document.querySelector(".checkout.container").innerHTML = `
    <div class="title">
    <h3>${
      isError ? "Ups...Something went wrong...!" : "Thank you for your order!"
    }</h3>
    <div>${
      isError
        ? "Its probably on our side, try it agan please!"
        : "I mean your money, as usually you get nothing! ^^"
    }</div>
    <a href="#home" >Go continue wasting your money!</a>
    
    </div>
    `;
}

function validateForm(formData) {
  let isInvalid = false;
  formData.forEach((value, key, parent) => {
    const inputField = document.querySelector(`[name='${key}']`);

    if (!value && key !== "comment") {
      inputField.style.border = "1px solid red";
      isInvalid = true;
    }

    inputField.addEventListener("keyup", (e) => {
      e.target.style.border = "none";
    });
  });
  return isInvalid;
}
