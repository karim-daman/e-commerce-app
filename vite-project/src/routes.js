import { ChunkGenerator } from "svelte-spa-chunk";
import ChunkComponent from "svelte-spa-chunk/Chunk.svelte";
const Chunk = ChunkGenerator(ChunkComponent);

/**
 * @description Client Side Render Index
 */
export default {
  "/": Chunk(() => import("./routes/Home.svelte")),

  "/Dashboard": Chunk(() => import("./routes/Admin/DashBoard.svelte")),

  "/Products": Chunk(() => import("./routes/Products.svelte")),
  "/ProductDetails/:product_id": Chunk(() => import("./routes/ProductDetails.svelte")),

  "/Profile": Chunk(() => import("./routes/Profile.svelte")),

  "/NotFound": Chunk(() => import("./routes/NotFound.svelte")),
  "*": Chunk(() => import("./routes/NotFound.svelte")),
};
