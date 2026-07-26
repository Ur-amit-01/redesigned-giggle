/* ==========================================================================
   SHARED RENDER HELPERS — product card markup, recently viewed tracking
   ========================================================================== */
function starString(rating){
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function productCardHTML(p, i = 0){
  const off = Math.round(100 - (p.price / p.oldPrice) * 100);
  return `
  <article class="product-card reveal" data-cat="${p.cat}" data-price="${p.price}" data-name="${p.title.toLowerCase()}" data-rating="${p.rating}" style="transition-delay:${i * 0.05}s">
    <div class="pc-media">
      <span class="fold"></span>
      <button class="pc-wish" data-wish-toggle="${p.id}" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <div class="pc-badges">
        ${p.bundle ? '<span class="badge badge-best">⭐ Best Value</span>' : ""}
        <span class="badge badge-orange">${off}% OFF</span>
        <span class="badge badge-green">Instant Download</span>
      </div>
      <img src="${p.images[0]}" alt="${p.title} cover" loading="lazy">
      <div class="pc-quick">
        <button data-quick-view="${p.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>Quick View</button>
        <button data-add-cart="${p.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>Add</button>
      </div>
    </div>
    <div class="pc-body">
      <span class="pc-cat">${p.cat} · ${p.tag}</span>
      <a href="${p.page}"><h3 class="pc-title">${p.title}</h3></a>
      <div class="pc-rating"><span class="stars">${starString(p.rating)}</span><span class="count">${p.rating} (${p.reviews})</span></div>
      <div class="pc-price">
        <span class="now">${formatINR(p.price)}</span>
        <span class="old">${formatINR(p.oldPrice)}</span>
        <span class="off">${off}% off</span>
      </div>
      <div class="pc-actions">
        <button class="btn btn-ghost" data-add-cart="${p.id}">Add to Cart</button>
        <a href="${p.page}" class="btn btn-orange">View</a>
      </div>
    </div>
  </article>`;
}

function renderGrid(container, products){
  if(!container) return;
  if(!products.length){
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <div class="ic">🔍</div><h3>No notes found</h3><p>Try adjusting your filters or search term.</p>
      <a href="shop.html" class="btn btn-blue">Reset filters</a>
    </div>`;
    return;
  }
  container.innerHTML = products.map((p,i) => productCardHTML(p,i)).join("");
  requestAnimationFrame(() => {
    container.querySelectorAll(".product-card").forEach((c,i) => setTimeout(() => c.classList.add("in"), i * 40));
  });
  const wl = Cart.wget();
  container.querySelectorAll("[data-wish-toggle]").forEach(el => { if(wl.includes(el.dataset.wishToggle)) el.classList.add("active"); });
}

/* ---------- Recently viewed ---------- */
const RecentlyViewed = {
  KEY: "nns_recent",
  add(id){
    let items = this.get().filter(i => i !== id);
    items.unshift(id);
    items = items.slice(0, 6);
    localStorage.setItem(this.KEY, JSON.stringify(items));
  },
  get(){ try{ return JSON.parse(localStorage.getItem(this.KEY)) || []; }catch(e){ return []; } },
  render(container, excludeId = null){
    if(!container) return;
    const ids = this.get().filter(i => i !== excludeId);
    if(!ids.length){ container.closest(".recommend-strip")?.style.setProperty("display","none"); return; }
    const products = ids.map(id => getProduct(id)).filter(Boolean);
    container.innerHTML = products.map((p,i) => productCardHTML(p,i)).join("");
    requestAnimationFrame(() => container.querySelectorAll(".product-card").forEach(c => c.classList.add("in")));
  }
};
