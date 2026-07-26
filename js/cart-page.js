/* ==========================================================================
   CART PAGE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const listWrap = document.querySelector("#cartList");
  const emptyWrap = document.querySelector("#cartEmpty");
  const summaryWrap = document.querySelector("#cartSummaryWrap");
  if(!listWrap) return;

  let coupon = null;
  const COUPONS = { "NEET50": 0.5, "STUDENT10": 0.1, "WELCOME20": 0.2 };

  function render(){
    const lines = Cart.lines();
    listWrap.parentElement.classList.toggle("hidden", lines.length === 0);
    emptyWrap.classList.toggle("hidden", lines.length > 0);
    summaryWrap.classList.toggle("hidden", lines.length === 0);
    if(!lines.length){ listWrap.innerHTML = ""; return; }

    listWrap.innerHTML = lines.map(l => `
      <div class="cart-item" data-line="${l.id}">
        <img src="${l.images[0]}" alt="${l.title}">
        <div>
          <div class="ci-title">${l.title}${l.bundle ? ' <span class="badge badge-best" style="margin-left:6px;">⭐ Best Value</span>' : ""}</div>
          <div class="ci-meta">${l.cat} · Instant PDF Download</div>
          <div class="ci-qty">
            <button data-dec="${l.id}">−</button>
            <span>${l.qty}</span>
            <button data-inc="${l.id}">+</button>
          </div>
        </div>
        <div class="ci-right">
          <div class="ci-price">${formatINR(l.lineTotal)}</div>
          <button class="ci-remove" data-remove="${l.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z"/></svg>Remove</button>
        </div>
      </div>`).join("");

    renderSummary(lines);
    RecentlyViewed.render(document.querySelector("#cartRecommend"));
  }

  function renderSummary(lines){
    const subtotal = lines.reduce((s,l) => s + l.lineTotal, 0);
    const discount = coupon ? Math.round(subtotal * coupon.pct) : 0;
    const total = subtotal - discount;
    document.querySelector("#sumSubtotal").textContent = formatINR(subtotal);
    document.querySelector("#sumTotal").textContent = formatINR(total);
    const discRow = document.querySelector("#sumDiscountRow");
    if(discount > 0){
      discRow.classList.remove("hidden");
      document.querySelector("#sumDiscount").textContent = "− " + formatINR(discount);
    } else { discRow.classList.add("hidden"); }
    localStorage.setItem("nns_checkout_total", total);
    localStorage.setItem("nns_checkout_coupon", coupon ? coupon.code : "");
  }

  listWrap.addEventListener("click", e => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rem = e.target.closest("[data-remove]");
    if(inc){ const l = Cart.lines().find(x => x.id === inc.dataset.inc); Cart.setQty(inc.dataset.inc, l.qty + 1); render(); }
    if(dec){ const l = Cart.lines().find(x => x.id === dec.dataset.dec); if(l.qty > 1) Cart.setQty(dec.dataset.dec, l.qty - 1); render(); }
    if(rem){
      const row = rem.closest(".cart-item");
      row.classList.add("removing");
      setTimeout(() => { Cart.remove(rem.dataset.remove); render(); }, 280);
      showToast("Item removed from cart", "info");
    }
  });

  const couponInput = document.querySelector("#couponInput");
  const couponBtn = document.querySelector("#couponApply");
  const couponMsg = document.querySelector("#couponMsg");
  couponBtn?.addEventListener("click", () => {
    const code = couponInput.value.trim().toUpperCase();
    if(COUPONS[code]){
      coupon = { code, pct: COUPONS[code] };
      couponMsg.textContent = `"${code}" applied — ${Math.round(COUPONS[code]*100)}% off!`;
      couponMsg.className = "coupon-msg show ok";
      showToast("Coupon applied!", "success");
    } else {
      coupon = null;
      couponMsg.textContent = "Invalid coupon code. Try NEET50, STUDENT10 or WELCOME20.";
      couponMsg.className = "coupon-msg show bad";
    }
    render();
  });

  render();
});
