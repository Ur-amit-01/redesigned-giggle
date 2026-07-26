/* ==========================================================================
   SHOP PAGE — filter / sort / search
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#shopGrid");
  const countEl = document.querySelector("#resultCount");
  if(!grid) return;

  const params = new URLSearchParams(window.location.search);
  const searchInput = document.querySelector("#shopSearch");
  if(params.get("q")) searchInput.value = params.get("q");

  const state = { cats: [], maxPrice: 500, sort: "popular", q: searchInput ? searchInput.value.toLowerCase() : "" };

  function apply(){
    let list = PRODUCTS.filter(p => {
      const catOk = state.cats.length === 0 || state.cats.includes(p.cat);
      const priceOk = p.price <= state.maxPrice;
      const qOk = !state.q || p.title.toLowerCase().includes(state.q) || p.cat.toLowerCase().includes(state.q);
      return catOk && priceOk && qOk;
    });
    switch(state.sort){
      case "price-low": list.sort((a,b) => a.price - b.price); break;
      case "price-high": list.sort((a,b) => b.price - a.price); break;
      case "rating": list.sort((a,b) => b.rating - a.rating); break;
      case "newest": list.sort((a,b) => (b.bundle?1:0) - (a.bundle?1:0)); break;
      default: list.sort((a,b) => b.reviews - a.reviews);
    }
    renderGrid(grid, list);
    if(countEl) countEl.innerHTML = `<strong>${list.length}</strong> notes found`;
    renderChips();
  }

  function renderChips(){
    const wrap = document.querySelector("#filterChips");
    if(!wrap) return;
    let chips = state.cats.map(c => `<span class="filter-chip" data-remove-cat="${c}">${c} ✕</span>`);
    if(state.q) chips.push(`<span class="filter-chip" data-remove-q="1">"${state.q}" ✕</span>`);
    wrap.innerHTML = chips.join("");
  }

  document.querySelectorAll("[data-filter-cat]").forEach(cb => {
    cb.addEventListener("change", () => {
      const val = cb.value;
      state.cats = cb.checked ? [...state.cats, val] : state.cats.filter(c => c !== val);
      apply();
    });
  });

  const priceRange = document.querySelector("#priceRange");
  const priceLabel = document.querySelector("#priceLabel");
  if(priceRange){
    priceRange.addEventListener("input", () => {
      state.maxPrice = Number(priceRange.value);
      if(priceLabel) priceLabel.textContent = "Up to " + formatINR(state.maxPrice);
      apply();
    });
  }

  const sortSelect = document.querySelector("#sortSelect");
  if(sortSelect){ sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; apply(); }); }

  if(searchInput){
    searchInput.addEventListener("input", () => { state.q = searchInput.value.toLowerCase(); apply(); });
  }

  document.querySelector("#clearFilters")?.addEventListener("click", () => {
    state.cats = []; state.maxPrice = 500; state.q = "";
    document.querySelectorAll("[data-filter-cat]").forEach(cb => cb.checked = false);
    if(priceRange){ priceRange.value = 500; priceLabel.textContent = "Up to ₹500"; }
    if(searchInput) searchInput.value = "";
    apply();
  });

  grid.addEventListener("click", e => {
    const chip = e.target.closest("[data-remove-cat]");
    if(chip){
      const cat = chip.dataset.removeCat;
      state.cats = state.cats.filter(c => c !== cat);
      document.querySelector(`[data-filter-cat][value="${cat}"]`).checked = false;
      apply();
    }
  });
  document.querySelector("#filterChips")?.addEventListener("click", e => {
    if(e.target.dataset.removeCat){
      const cat = e.target.dataset.removeCat;
      state.cats = state.cats.filter(c => c !== cat);
      document.querySelector(`[data-filter-cat][value="${cat}"]`).checked = false;
      apply();
    }
    if(e.target.dataset.removeQ){ state.q = ""; if(searchInput) searchInput.value = ""; apply(); }
  });

  /* View toggle (grid density) */
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      grid.classList.toggle("grid-3", btn.dataset.view === "list");
      grid.classList.toggle("grid-4", btn.dataset.view === "grid");
    });
  });

  /* Mobile filter drawer */
  const filterPanel = document.querySelector(".shop-filters");
  const scrim = document.querySelector(".filter-scrim");
  document.querySelector("#openFilters")?.addEventListener("click", () => { filterPanel.classList.add("open"); scrim.classList.add("show"); });
  document.querySelector("#closeFilters")?.addEventListener("click", () => { filterPanel.classList.remove("open"); scrim.classList.remove("show"); });
  scrim?.addEventListener("click", () => { filterPanel.classList.remove("open"); scrim.classList.remove("show"); });

  apply();
});
