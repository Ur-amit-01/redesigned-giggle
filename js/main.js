/* ==========================================================================
   MAIN — global site behaviors shared across every page
   ========================================================================== */

/* ---------- Loading screen ---------- */
window.addEventListener("load", () => {
  const ls = document.querySelector(".loading-screen");
  if(ls) setTimeout(() => ls.classList.add("hide"), 380);
});

/* ---------- Sticky header shadow ---------- */
const siteHeader = document.querySelector(".site-header");
if(siteHeader){
  window.addEventListener("scroll", () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive:true });
}

/* ---------- Mobile nav panel ---------- */
const navToggle = document.querySelector(".nav-toggle");
const mobilePanel = document.querySelector(".mobile-panel");
const mobilePanelClose = document.querySelector(".mobile-panel-close");
function toggleMobilePanel(open){
  if(!mobilePanel) return;
  mobilePanel.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
navToggle && navToggle.addEventListener("click", () => toggleMobilePanel(true));
mobilePanelClose && mobilePanelClose.addEventListener("click", () => toggleMobilePanel(false));

/* ---------- Dark mode toggle ---------- */
const THEME_KEY = "nns_theme";
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  document.body && document.body.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) applyTheme(saved);
})();
document.querySelectorAll(".theme-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
});

/* ---------- Toasts ---------- */
function showToast(message, type = "info", icon = null){
  let wrap = document.querySelector(".toast-wrap");
  if(!wrap){ wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = {
    success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>'
  };
  toast.innerHTML = `${icon || icons[type] || icons.info}<span>${message}</span>`;
  wrap.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
window.showToast = showToast;

/* ---------- Ripple effect on all .btn ---------- */
document.addEventListener("click", e => {
  const btn = e.target.closest(".btn");
  if(!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (e.clientX - rect.left - size/2) + "px";
  ripple.style.top = (e.clientY - rect.top - size/2) + "px";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
});

/* ---------- Back to top ---------- */
const backToTop = document.querySelector(".back-to-top");
if(backToTop){
  window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 500), { passive:true });
  backToTop.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));
}

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add("in-view"); revealObserver.unobserve(entry.target); }
  });
}, { threshold:.15 });
document.querySelectorAll(".reveal,.reveal-scale,.stagger").forEach(el => revealObserver.observe(el));

/* ---------- Animated counters ---------- */
function animateCounter(el){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const decimals = el.dataset.count.includes(".") ? 1 : 0;
  let start = null;
  const duration = 1400;
  function step(ts){
    if(!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if(progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ animateCounter(entry.target); counterObserver.unobserve(entry.target); }
  });
}, { threshold:.5 });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

/* ---------- FAQ Accordion (generic) ---------- */
document.querySelectorAll(".faq-item .faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const answer = item.querySelector(".faq-a");
    const isOpen = item.classList.contains("open");
    item.closest(".faq-list, .p-faq")?.querySelectorAll(".faq-item.open").forEach(openItem => {
      if(openItem !== item){
        openItem.classList.remove("open");
        openItem.querySelector(".faq-a").style.maxHeight = null;
      }
    });
    item.classList.toggle("open", !isOpen);
    answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
  });
});

/* ---------- Header search suggestions ---------- */
function wireSearch(inputSel, suggestSel){
  const input = document.querySelector(inputSel);
  const suggestBox = document.querySelector(suggestSel);
  if(!input || !suggestBox || typeof PRODUCTS === "undefined") return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if(!q){ suggestBox.classList.remove("show"); suggestBox.innerHTML = ""; return; }
    const matches = PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)).slice(0,5);
    if(!matches.length){ suggestBox.innerHTML = `<a href="shop.html?q=${encodeURIComponent(q)}">No matches — see all in Shop</a>`; }
    else{
      suggestBox.innerHTML = matches.map(p => `<a href="${p.page}"><span>${p.title}</span><span class="price">${formatINR(p.price)}</span></a>`).join("");
    }
    suggestBox.classList.add("show");
  });
  document.addEventListener("click", e => {
    if(!suggestBox.contains(e.target) && e.target !== input) suggestBox.classList.remove("show");
  });
  input.addEventListener("keydown", e => {
    if(e.key === "Enter"){ window.location.href = `shop.html?q=${encodeURIComponent(input.value.trim())}`; }
  });
}
wireSearch("#headerSearch", "#headerSuggest");
wireSearch("#mobileSearch", "#mobileSuggest");

/* ---------- Newsletter form (UI only) ---------- */
document.querySelectorAll(".newsletter-form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Subscribed! Check your inbox for confirmation.", "success");
    form.reset();
  });
});

/* ---------- Wishlist buttons (delegated, works across pages) ---------- */
document.addEventListener("click", e => {
  const wbtn = e.target.closest("[data-wish-toggle]");
  if(!wbtn) return;
  const id = wbtn.dataset.wishToggle;
  const active = Cart.wtoggle(id);
  wbtn.classList.toggle("active", active);
  document.querySelectorAll(`[data-wish-toggle="${id}"]`).forEach(el => el.classList.toggle("active", active));
  showToast(active ? "Added to wishlist" : "Removed from wishlist", active ? "success" : "info");
});
document.addEventListener("DOMContentLoaded", () => {
  const wl = Cart.wget();
  document.querySelectorAll("[data-wish-toggle]").forEach(el => {
    if(wl.includes(el.dataset.wishToggle)) el.classList.add("active");
  });
});

/* ---------- Add to cart buttons (delegated) ---------- */
document.addEventListener("click", e => {
  const abtn = e.target.closest("[data-add-cart]");
  if(!abtn) return;
  const id = abtn.dataset.addCart;
  Cart.add(id, 1);
  const p = typeof getProduct === "function" ? getProduct(id) : null;
  showToast(`${p ? p.title : "Item"} added to cart`, "success");
});

/* ---------- Buy now buttons (delegated) ---------- */
document.addEventListener("click", e => {
  const bbtn = e.target.closest("[data-buy-now]");
  if(!bbtn) return;
  const id = bbtn.dataset.buyNow;
  Cart.add(id, 1);
  window.location.href = "checkout.html";
});

/* ---------- Active nav link highlighting ---------- */
(function highlightNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .bottom-nav a, .mobile-panel a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
})();
