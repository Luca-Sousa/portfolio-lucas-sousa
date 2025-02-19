import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    .beforeUpload(() => {
      return true; // permite o upload
    })
    .beforeDelete(() => {
      return true; // permite a deleção
    }),

  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 10, // 10MB
      accept: ["image/jpeg", "image/png", "image/svg+xml"],
    })
    .beforeUpload(() => {
      return true; // permite o upload
    })
    .beforeDelete(() => {
      return true; // permite a deleção
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
