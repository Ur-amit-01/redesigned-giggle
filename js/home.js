/* ==========================================================================
   HOME PAGE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const featured = document.querySelector("#featuredGrid");
  if(featured){
    const order = ["complete-bundle","organic-chemistry","physics-12","physics-11","physical-chemistry","inorganic-chemistry"];
    const products = order.map(id => getProduct(id)).filter(Boolean);
    renderGrid(featured, products);
  }
});
