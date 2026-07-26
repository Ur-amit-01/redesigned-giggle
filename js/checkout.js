/* ==========================================================================
   CHECKOUT PAGE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#checkoutForm");
  if(!form) return;
  const lines = Cart.lines();

  if(!lines.length){
    document.querySelector("#checkoutContent").innerHTML = `
      <div class="cart-empty">
        <div class="ic">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some notes before checking out.</p>
        <a href="shop.html" class="btn btn-blue">Browse Notes</a>
      </div>`;
    return;
  }

  /* ---- Order summary render ---- */
  const summaryList = document.querySelector("#checkoutItems");
  summaryList.innerHTML = lines.map(l => `
    <div class="summary-row"><span>${l.title} × ${l.qty}</span><span>${formatINR(l.lineTotal)}</span></div>
  `).join("");
  const subtotal = Cart.subtotal();
  const coupon = localStorage.getItem("nns_checkout_coupon");
  const total = Number(localStorage.getItem("nns_checkout_total")) || subtotal;
  const discount = subtotal - total;
  document.querySelector("#coSubtotal").textContent = formatINR(subtotal);
  document.querySelector("#coTotal").textContent = formatINR(total);
  const discRow = document.querySelector("#coDiscountRow");
  if(discount > 0){ discRow.classList.remove("hidden"); document.querySelector("#coDiscount").textContent = "− " + formatINR(discount); }
  else discRow.classList.add("hidden");

  /* ---- Payment method selection ---- */
  document.querySelectorAll(".pay-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".pay-opt").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      opt.querySelector("input").checked = true;
    });
  });

  /* ---- Validation ---- */
  function validateField(input){
    const group = input.closest(".form-group");
    const errEl = group.querySelector(".form-error");
    let valid = true;
    if(input.hasAttribute("required") && !input.value.trim()) valid = false;
    if(input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) valid = false;
    if(input.name === "phone" && input.value && !/^[6-9]\d{9}$/.test(input.value)) valid = false;
    input.classList.toggle("err", !valid);
    if(errEl) errEl.classList.toggle("show", !valid);
    return valid;
  }
  form.querySelectorAll("input[required], select[required]").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => { if(input.classList.contains("err")) validateField(input); });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const inputs = [...form.querySelectorAll("input[required], select[required]")];
    const allValid = inputs.map(validateField).every(Boolean);
    if(!allValid){
      showToast("Please fix the highlighted fields", "error");
      form.querySelector(".err")?.scrollIntoView({ behavior:"smooth", block:"center" });
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg style="width:18px;height:18px;animation:spin .7s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity=".25"/><path d="M22 12a10 10 0 00-10-10"/></svg> Processing payment…`;

    /* Persist order for success page (UI-only checkout, no real payment) */
    const order = {
      id: "NNS" + Date.now().toString().slice(-8),
      name: form.name.value, email: form.email.value, phone: form.phone.value, state: form.state.value,
      items: lines, total, date: new Date().toISOString()
    };
    localStorage.setItem("nns_last_order", JSON.stringify(order));

    setTimeout(() => {
      Cart.clear();
      window.location.href = "download-success.html";
    }, 1400);
  });
});

const spinKeyframes = document.createElement("style");
spinKeyframes.textContent = "@keyframes spin{to{transform:rotate(360deg);}}";
document.head.appendChild(spinKeyframes);
