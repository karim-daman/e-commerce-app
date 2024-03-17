import { ChunkGenerator } from "svelte-spa-chunk";
import ChunkComponent from "svelte-spa-chunk/Chunk.svelte";
const Chunk = ChunkGenerator(ChunkComponent);

/**
 * @description Client Side Render Index
 */
export default {
  "/": Chunk(() => import("./routes/Home.svelte")),

  "/Dashboard": Chunk(() => import("./routes/Admin/DashBoard.svelte")),
  "/Users": Chunk(() => import("./routes/Admin/UserManagement.svelte")),
  "/Reviews": Chunk(() => import("./routes/Admin/ReviewManagement.svelte")),
  "/Carts": Chunk(() => import("./routes/Admin/CartManagement.svelte")),

  "/Products": Chunk(() => import("./routes/Products.svelte")),
  "/ProductDetails/:product_id": Chunk(() => import("./routes/ProductDetails.svelte")),
  "/Cart": Chunk(() => import("./routes/Cart.svelte")),

  "/Profile": Chunk(() => import("./routes/Profile.svelte")),

  "/FAQ": Chunk(() => import("./routes/FAQ.svelte")),
  "/NotFound": Chunk(() => import("./routes/NotFound.svelte")),
  "*": Chunk(() => import("./routes/NotFound.svelte")),
};
