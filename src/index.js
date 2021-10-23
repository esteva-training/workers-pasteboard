import { handleRequest } from "./request"
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    let pathname = new URL(event.request.url).pathname;
    if(pathname === "/") return await getAssetFromKV(event);
    return await handleRequest(event.request)
  } catch (e) {    
    return new Response(`page not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}
