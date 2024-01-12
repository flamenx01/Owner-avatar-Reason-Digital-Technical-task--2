export async function onRequest(context) {

  class ElementHandler {
    async element(element) {
      const fact = await getFact();
      element.append(`<div>${fact}</div>`, {html: true});
    }
  }

  const asset = await context.env.ASSETS.fetch(new URL(context.request.url));
  return new HTMLRewriter().on('section#content', new ElementHandler()).transform(asset);


  async function getFact() {
    const response = await fetch(`https://catfact.ninja/fact`);
    try {
      const result = await response.json();
      return result.fact;
    } catch (err) {
      return err;
    }
  }
}
