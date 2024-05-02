//@ts-nocheck
import { ChunkGenerator } from "svelte-spa-chunk";
import ChunkComponent from "svelte-spa-chunk/Chunk.svelte";
import { wrap } from "svelte-spa-router/wrap";
import { push } from "svelte-spa-router";
import jwt_decode from "jwt-decode";
import { decodeToken } from "$stores/dataStore";
const Chunk = ChunkGenerator(ChunkComponent);

/**
 * @description Client Side Render Index
 */
export default {
  "/Dashboard": wrap({
    component: Chunk(() => import("./routes/Admin/DashBoard.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Users": wrap({
    component: Chunk(() => import("./routes/Admin/UserManagement.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Carts": wrap({
    component: Chunk(() => import("./routes/Admin/CartManagement.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Cart": wrap({
    component: Chunk(() => import("./routes/Cart.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Reviews": wrap({
    component: Chunk(() => import("./routes/Admin/ReviewManagement.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Likes": wrap({
    component: Chunk(() => import("./routes/Admin/LikeManagement.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/Discounts": wrap({
    component: Chunk(() => import("./routes/Admin/DiscountManagement.svelte")),
    conditions: [(detail) => checkPermissions(detail, true)],
  }),

  "/": Chunk(() => import("./routes/Home.svelte")),
  "/Products": Chunk(() => import("./routes/Products.svelte")),
  "/ProductDetails/:product_id": Chunk(() => import("./routes/ProductDetails.svelte")),
  "/Profile": Chunk(() => import("./routes/Profile.svelte")),
  "/FAQ": Chunk(() => import("./routes/FAQ.svelte")),
  "/Restricted": Chunk(() => import("./routes/Restricted.svelte")),
  "/NotFound": Chunk(() => import("./routes/NotFound.svelte")),
  "*": Chunk(() => import("./routes/NotFound.svelte")),
};

function checkPermissions(detail, isAdminRequired) {
  if (localStorage.getItem("token") == null) {
    console.log("trying to access: " + detail.location);
    push("/Restricted");
    return;
  }

  const isAdmin = decodeToken(localStorage.getItem("token")).isAdmin;

  if (isAdmin === isAdminRequired) {
    console.log("trying to access: " + detail.location + " while " + (isAdmin ? "admin" : "user"));
    return true;
  }

  console.log("trying to access: " + detail.location + " while " + (isAdmin ? "admin" : "user"));
  push("/Restricted");
}
