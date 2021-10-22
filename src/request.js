export async function handleRequest(request){
  const url = new URL(request.url);
  const currentValue = await COUNTER_NAMESPACE.get(url.pathname);
  const newValue = (parseInt(currentValue ?? "0") +1).toString();
  await COUNTER_NAMESPACE.put(url.pathname, newValue);
  return new Response(newValue);
}