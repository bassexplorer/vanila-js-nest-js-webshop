import * as storage from "../../assets/javascript/storage.js";
import logoutUser from "../login-or-signup/login-or-signup.js";
let changeObj = {};

export async function render() {
  const userToken = storage.storageProxy.user.token;

  _loadAccountData(userToken);
  _initSaveButton(userToken);
}

function _loadAccountData(userToken) {
  const form = document.getElementById("account");
  const formData = new FormData(form);

  _isLoading(true);
  fetch("http://localhost:3000/api/customer", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.status === 401) {
        logoutUser();
      }
      return response.json();
    })
    .then((json) => {
      formData.forEach((value, key, parent) => {
        const inputField = document.querySelector(`#account [name='${key}']`);
        inputField.value = json[key];
        if (key == "email") {
          inputField.disabled = "true";
        } else {
          inputField.addEventListener(
            "change",
            (e) => (changeObj[key] = e.target.value)
          );
        }
      });
    })
    .then(() => _isLoading(false))
    .catch((err) => console.error(err));
}

function _initSaveButton(userToken) {
  document
    .querySelector("#account #save")
    .addEventListener("click", (e) => _saveAccountData(userToken, e));
}

function _saveAccountData(userToken, e) {
  e.preventDefault();

  fetch("http://localhost:3000/api/customer/update", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changeObj),
  })
    .then(async (response) => {
      if (response.status === 401) {
        logoutUser();
      }

      return response.text();
    })
    .then((token) => {
      storage.storageProxy.user = {
        loggedIn: true,
        token: token,
      };
    })
    .catch((err) => console.error(err));
}

async function _isLoading(boolean) {
  if (!boolean) await new Promise((resolve) => setTimeout(resolve, 500));

  document
    .querySelector(".account.container .submitting")
    .classList.toggle("active");
}
