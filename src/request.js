import { clipboardView } from "./clipboard";
export async function handleRequest(request) {
  const contentType = request.headers.get("content-type") || "";

  //application/x-www-form-urlencoded
  if (contentType.includes("form")) {    
    const formData = await request.formData();
    const body = Object.fromEntries(formData);    
    const key = new Date()
    await CLIPBOARD.put(key.toISOString(), JSON.stringify(body.content));
    return new Response(`Done`);
  } else {  
    // list of items ready to be copy/pasted  
    const html = await clipboardView()    
    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  }
}
