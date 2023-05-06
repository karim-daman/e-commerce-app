import { writable } from "svelte/store";
import jwt_decode from "jwt-decode";

export const isFetching = writable(false);
export const app_user = writable({});
export const app_products = writable([]);
export const app_categories = writable([]);
export const app_product_details = writable({});

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

// export async function createProduct(json) {
//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

//   // var raw = JSON.stringify({
//   //   name: "product 1",
//   //   description: "description",
//   //   richDescription: "richDescription",
//   //   image: "image",
//   //   brand: "nokie",
//   //   price: 100,
//   //   category: "6448d7289bd209330c87e584",
//   //   countInStock: 10,
//   //   rating: 3,
//   //   numReviews: 22,
//   //   isFeatured: true,
//   // });

//   // note: no images are attached here, must modify backend to accept uploading images.

//   var raw = JSON.stringify({
//     name: json.name,
//     description: json.description,
//     richDescription: json.richDescription,
//     image: json.image,
//     brand: json.brand,
//     price: json.price,
//     category: json.category,
//     countInStock: json.countInStock,
//     rating: json.rating,
//     numReviews: json.numReviews,
//     isFeatured: json.isFeatured,
//   });

//   const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products`;

//   fetch(endPoint, {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   })
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

export async function createProduct(json) {

  

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
  // myHeaders.append("content-type", "multipart/form-data");

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
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

// export async function createProduct(json) {
//   const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/products`;

//   console.log(JSON.stringify(json, null, 2));

//   var raw = JSON.stringify({
//     name: json.name,
//     description: json.description,
//     richDescription: json.richDescription,
//     image: json.image,
//     images: json.images,
//     brand: json.brand,
//     price: json.price,
//     category: json.category,
//     countInStock: json.countInStock,
//     rating: json.rating,
//     numReviews: json.numReviews,
//     isFeatured: json.isFeatured,
//   });

//   await fetch(endPoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + localStorage.getItem("token"),
//     },
//     body: raw,
//     redirect: "follow",
//   })
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// }

export async function getCategories() {
  const endPoint = `${import.meta.env.VITE_backend_uri + import.meta.env.VITE_api_url}/categories`;
  await fetch(endPoint, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((data) => {
      app_categories.set(data);
      console.log(data);
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

export function decodeToken(token) {
  if (token == null) {
    console.log("not logged in.");
    return null;
  }
  console.log("logged in user: " + JSON.stringify(jwt_decode(token)));
  return jwt_decode(token);
}
