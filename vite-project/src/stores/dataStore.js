import { writable } from "svelte/store";
import jwt_decode from "jwt-decode";

export const isFetching = writable(false);
export const app_user = writable({});
export const app_products = writable([]);
export const app_user_cart = writable({});
export const app_categories = writable([]);
export const app_product_details = writable({});

export const app_user_list = writable([]);
export const app_cart_list = writable([]);
export const app_review_list = writable([]);

export async function deleteProduct(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let response;

  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products/${id}`;
  await fetch(endPoint, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      app_products.update((products) => products.filter((product) => product.id != id));
      response = result;
    })
    .catch((error) => {
      console.log("error", error);
      response = error;
    });
  return response;
}

export async function deleteCategory(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let response;

  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/categories/${id}`;
  await fetch(endPoint, {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      app_categories.update((categories) => categories.filter((category) => category.id != id));
      response = result;
    })
    .catch((error) => {
      console.log("error", error);
      response = error;
    });
  return response;
}

export async function createProduct(json) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var formdata = new FormData();
  formdata.append("name", json.name);
  formdata.append("description", json.description);
  formdata.append("richDescription", json.richDescription);

  if (json.images.length > 0) {
    formdata.append("image", json.images[0], json.images[0].path);
    json.images.forEach((element) => {
      formdata.append("images", element, element.path);
    });
  }

  formdata.append("brand", json.brand);
  formdata.append("price", json.price);
  formdata.append("category", json.category);
  formdata.append("countInStock", json.countInStock);
  formdata.append("rating", "0");
  formdata.append("numReviews", "0");
  formdata.append("isFeatured", json.isFeatured);

  let response;

  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products`;

  console.log("fetching from : ");
  console.log(endPoint);
  console.log("form: ");
  for (var pair of formdata.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  await fetch(endPoint, {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      response = result;
    })
    .catch((error) => {
      response = error;
    });
  console.log(response);
  return response;
}
export async function getProducts() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products`;
  await fetch(endPoint, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      app_products.set(data);
    })
    .catch((error) => console.error(error));
}

export async function getProductById(id) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products/${id}`;
  await fetch(endPoint, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      app_product_details.set(result);
    })
    .catch((error) => console.log("error", error));
}

export async function createCategory(json) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/categories`;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  var raw = JSON.stringify({
    name: json.name,
    icon: json.icon,
    color: json.color,
  });
  let response;

  await fetch(endPoint, {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      response = result;
    })
    .catch((error) => {
      response = error;
    });
  // console.log(response);
  return response;
}

export async function getCarts() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      app_cart_list.set(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function removeFromCart(id) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/cartItems/${id}`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Delete",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })

    .catch((error) => console.log("error", error));
}

export async function clearCart(id) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts/clear/${id}`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      app_user_cart.set(result);
    })

    .catch((error) => console.log("error", error));
}

export async function addCartItemToCart(id, item) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts/${id}`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  let response;

  await fetch(endPoint, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(item),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.cart);
      app_user_cart.set(result.cart);
      response = result;
    })
    .catch((error) => {
      console.log("error", error);
      response = error;
    });
  return response;
}

// export async function updateCart(id, raw) {
//   const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts/${id}`;
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

//   fetch(endPoint, {
//     method: "PUT",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   })
//     .then((response) => response.text())
//     .then((result) => app_user_cart.set(result))
//     .catch((error) => console.log("error", error));
// }

// export async function getUserCart(user_id) {
//   const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts/${user_id}`;
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

//   await fetch(endPoint, {
//     method: "Get",
//     headers: myHeaders,
//     redirect: "follow",
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       app_user_cart.set(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

export async function getCartById(id) {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/carts/${id}`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      app_user_cart.set(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getReviews() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/reviews`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      app_review_list.set(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getUsers() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/users`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  await fetch(endPoint, {
    method: "Get",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      app_user_list.set(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCategories() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/categories`;
  await fetch(endPoint, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      app_categories.set(data);
      // console.log(data);
    })
    .catch((error) => console.error(error));
}

export async function loginHandler(json) {
  isFetching.set(true);
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/users/login`;
  var raw = JSON.stringify({
    email: json.email,
    password: json.password,
  });

  await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("user", data.user);
      localStorage.setItem("token", data.token);
      app_user.set(decodeToken(data.token));
    })
    .catch((error) => console.error(error));
}

export async function registerHanlder(json) {
  isFetching.set(true);
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/users/register`;
  var raw = JSON.stringify({
    name: "undefined",
    email: json.email,
    password: json.password,
    phone: "undefined",
    isAdmin: "false",
    street: "undefined",
    apartment: "undefined",
    zip: "undefined",
    city: "undefined",
    country: "undefined",
  });

  await fetch(endPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      isFetching.set(false);
      console.log(data);
    })
    .catch((error) => console.error(error));
}

export async function verifyTokenExpiry() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/users/verify`;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", localStorage.getItem("token"));

  let response;

  await fetch(endPoint, {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("verification: ");
      console.log(data);

      if (!data.success) {
        app_user.update((user) => (user = null));
        localStorage.clear();
      }

      response = data;
    })
    .catch((error) => {
      console.error("!!! " + error);
      response = error;
    });

  return response;
}

export function decodeToken(token) {
  if (token == null) {
    console.log("not logged in.");
    return null;
  }
  return jwt_decode(token);
}
