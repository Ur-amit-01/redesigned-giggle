/* ==========================================================================
   DOWNLOAD SUCCESS PAGE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.querySelector("#downloadContent");
  if(!wrap) return;
  let order;
  try{ order = JSON.parse(localStorage.getItem("nns_last_order")); }catch(e){ order = null; }

  if(!order){
    document.querySelector("#orderIdPill").textContent = "No recent order found";
    document.querySelector("#downloadList").innerHTML = `<p style="text-align:center;color:var(--ink-soft)">Head to the shop to purchase your notes.</p>`;
    document.querySelector("#invoiceBox").classList.add("hidden");
    return;
  }

  document.querySelector("#orderIdPill").textContent = "Order #" + order.id;
  document.querySelector("#successName").textContent = order.name.split(" ")[0] || "there";

  document.querySelector("#downloadList").innerHTML = order.items.map(l => `
    <div class="download-card">
      <div class="dc-ic">${l.initials}</div>
      <div class="dc-info"><strong>${l.title}</strong><span>PDF · Instant Download · Lifetime Access</span></div>
      <button class="btn btn-orange btn-sm" data-download="${l.id}">
        <svg style="width:15px;height:15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>
        Download
      </button>
    </div>`).join("");

  document.querySelector("#downloadList").addEventListener("click", e => {
    const btn = e.target.closest("[data-download]");
    if(!btn) return;
    showToast("Your download will begin shortly (demo)", "success");
  });

  const subtotal = order.items.reduce((s,l) => s + l.lineTotal, 0);
  document.querySelector("#invSubtotal").textContent = formatINR(subtotal);
  document.querySelector("#invDiscount").textContent = "− " + formatINR(subtotal - order.total);
  document.querySelector("#invTotal").textContent = formatINR(order.total);
  document.querySelector("#invOrderId").textContent = order.id;
  document.querySelector("#invEmail").textContent = order.email;
  document.querySelector("#invDate").textContent = new Date(order.date).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" });

  document.querySelector("#downloadAllBtn")?.addEventListener("click", () => showToast("Preparing ZIP of all notes… (demo)", "info"));
  document.querySelector("#invoicePrint")?.addEventListener("click", () => window.print());
});
