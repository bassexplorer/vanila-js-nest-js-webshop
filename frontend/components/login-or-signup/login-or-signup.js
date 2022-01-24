// http://localhost:3000/api/auth/local/signin
// {
//   "email": "webshop@test.me",
//   "password": "password123"
// }

import * as storage from "../../assets/javascript/storage.js";

export async function render() {
  initializeTheChangeBetweenTwoSidesOfTheLoginOrSignupPageAlsoImABitTiredNow();

  const loginBtn = document.querySelector("#loginButton");
  loginBtn.addEventListener("click", async () => {
    await loginUser();
  });

  const signupBtn = document.querySelector("#signupButton");
  signupBtn.addEventListener("click", async () => {
    await signupUser();
  });
}

function initializeTheChangeBetweenTwoSidesOfTheLoginOrSignupPageAlsoImABitTiredNow() {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
}

export default function logoutUser() {
  storage.storageProxy.user = {
    loggedIn: false,
    token: null,
  };

  window.location.hash = "#home";
}

async function loginUser() {
  const loginForm = document.querySelector("#loginForm");
  const formData = new FormData(loginForm);
  const errorContainer = document.querySelector(
    ".login-or-signup-container div.error"
  );

  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!credentials.email || !credentials.password) {
    errorContainer.innerHTML =
      "Please fill both of the Username & the Password.";
    errorContainer.style.display = "flex";
    return;
  }

  fetch("http://localhost:3000/api/auth/local/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(async (response) => {
      if (response.status != 201) {
        throw response;
      }

      return response.text();
    })
    .then((token) => {
      storage.storageProxy.user = {
        loggedIn: true,
        token: token,
      };
      window.location.hash = "#home";
    })
    .catch((err) => {
      console.error(err.status);
      if (err.status == 401) {
        errorContainer.innerHTML = "Incorrect username or password.";
        errorContainer.style.display = "flex";
      }
    });
}

async function signupUser() {
  const signupForm = document.querySelector("#signupForm");
  const formData = new FormData(signupForm);

  const userWannaBe = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  fetch("http://localhost:3000/api/auth/local/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userWannaBe),
  })
    .then(async (response) => {
      if (response.status != 201) {
        throw Error("Something went wrong...");
      }

      return response.text();
    })
    .then((token) => {
      storage.storageProxy.user = {
        loggedIn: true,
        token: token,
      };
      window.location.hash = "#home";
    })
    .catch((err) => console.error(err));
}
