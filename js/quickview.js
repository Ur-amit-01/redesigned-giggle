/* ==========================================================================
   QUICK VIEW MODAL
   ========================================================================== */
(function(){
  let scrim = document.querySelector(".modal-scrim");
  if(!scrim){
    scrim = document.createElement("div");
    scrim.className = "modal-scrim";
    scrim.innerHTML = `<div class="qv-modal">
      <button class="qv-close" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
      <div class="qv-media"><img alt=""></div>
      <div class="qv-body"></div>
    </div>`;
    document.body.appendChild(scrim);
  }
  const img = scrim.querySelector(".qv-media img");
  const body = scrim.querySelector(".qv-body");
  const closeBtn = scrim.querySelector(".qv-close");

  function open(id){
    const p = getProduct(id);
    if(!p) return;
    const off = Math.round(100 - (p.price / p.oldPrice) * 100);
    img.src = p.images[0]; img.alt = p.title;
    body.innerHTML = `
      <span class="badge badge-blue">${p.cat} · ${p.tag}</span>
      <h3>${p.title}</h3>
      <div class="pc-rating" style="margin-bottom:14px;"><span class="stars">${starString(p.rating)}</span><span class="count">${p.rating} (${p.reviews} reviews)</span></div>
      <p style="color:var(--ink-soft);font-size:14px;margin-bottom:16px;">${p.short}</p>
      <div class="p-price-box" style="margin-bottom:16px;">
        <div class="row1"><span class="now">${formatINR(p.price)}</span><span class="old">${formatINR(p.oldPrice)}</span><span class="badge badge-orange">${off}% OFF</span></div>
        <div class="save">You save ${formatINR(p.oldPrice - p.price)}</div>
      </div>
      <div class="p-actions" style="margin-bottom:14px;">
        <button class="btn btn-ghost" data-add-cart="${p.id}">Add to Cart</button>
        <a href="${p.page}" class="btn btn-orange">View Full Details</a>
      </div>
      <a href="${p.page}" style="font-size:13px;font-weight:700;color:var(--blue-600);">See full description, gallery & reviews →</a>
    `;
    scrim.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function close(){ scrim.classList.remove("show"); document.body.style.overflow = ""; }

  document.addEventListener("click", e => {
    const qv = e.target.closest("[data-quick-view]");
    if(qv){ open(qv.dataset.quickView); }
  });
  closeBtn.addEventListener("click", close);
  scrim.addEventListener("click", e => { if(e.target === scrim) close(); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") close(); });
})();
