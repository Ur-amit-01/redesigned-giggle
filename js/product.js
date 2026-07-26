/* ==========================================================================
   PRODUCT PAGE — gallery, tabs, dynamic content render
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-product]");
  if(!root) return;
  const p = getProduct(root.dataset.product);
  if(!p){ root.innerHTML = "<p>Product not found.</p>"; return; }

  RecentlyViewed.add(p.id);
  const off = Math.round(100 - (p.price / p.oldPrice) * 100);

  /* ---- Breadcrumb ---- */
  const bc = document.querySelector("#breadcrumbCurrent");
  if(bc) bc.textContent = p.title;
  document.title = `${p.title} | NEET Notes Store`;

  /* ---- Gallery ---- */
  let current = 0;
  const mainImg = document.querySelector("#galleryMainImg");
  const thumbsWrap = document.querySelector("#galleryThumbs");
  const dotsWrap = document.querySelector("#galleryDots");
  thumbsWrap.innerHTML = p.images.map((src,i) => `<button class="${i===0?'active':''}" data-idx="${i}"><img src="${src}" alt="${p.title} view ${i+1}" loading="lazy"></button>`).join("");
  dotsWrap.innerHTML = p.images.map((_,i) => `<span class="${i===0?'active':''}"></span>`).join("");

  function setImage(idx, animate = true){
    current = (idx + p.images.length) % p.images.length;
    if(animate){ mainImg.style.opacity = 0; }
    setTimeout(() => {
      mainImg.src = p.images[current];
      mainImg.style.opacity = 1;
    }, animate ? 160 : 0);
    thumbsWrap.querySelectorAll("button").forEach((b,i) => b.classList.toggle("active", i === current));
    dotsWrap.querySelectorAll("span").forEach((d,i) => d.classList.toggle("active", i === current));
  }
  setImage(0, false);

  thumbsWrap.addEventListener("click", e => {
    const btn = e.target.closest("button"); if(!btn) return;
    setImage(Number(btn.dataset.idx));
    resetAutoplay();
  });
  document.querySelector("#galleryPrev").addEventListener("click", () => { setImage(current - 1); resetAutoplay(); });
  document.querySelector("#galleryNext").addEventListener("click", () => { setImage(current + 1); resetAutoplay(); });

  /* Autoplay slideshow */
  let autoplayTimer = setInterval(() => setImage(current + 1), 4200);
  function resetAutoplay(){ clearInterval(autoplayTimer); autoplayTimer = setInterval(() => setImage(current + 1), 4200); }
  const galleryMain = document.querySelector("#galleryMain");
  galleryMain.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
  galleryMain.addEventListener("mouseleave", resetAutoplay);

  /* Zoom on hover (desktop) */
  galleryMain.addEventListener("mousemove", e => {
    if(window.innerWidth < 900) return;
    const rect = galleryMain.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    mainImg.style.transformOrigin = `${x}% ${y}%`;
    mainImg.style.transform = "scale(1.8)";
  });
  galleryMain.addEventListener("mouseleave", () => { mainImg.style.transform = "scale(1)"; });

  /* Lightbox */
  const lightbox = document.querySelector("#lightbox");
  const lbImg = document.querySelector("#lightboxImg");
  function openLightbox(){ lbImg.src = p.images[current]; lightbox.classList.add("show"); document.body.style.overflow = "hidden"; }
  function closeLightbox(){ lightbox.classList.remove("show"); document.body.style.overflow = ""; }
  galleryMain.addEventListener("click", openLightbox);
  document.querySelector("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
  document.querySelector("#lightboxPrev").addEventListener("click", () => { setImage(current - 1, false); lbImg.src = p.images[current]; });
  document.querySelector("#lightboxNext").addEventListener("click", () => { setImage(current + 1, false); lbImg.src = p.images[current]; });
  document.addEventListener("keydown", e => {
    if(!lightbox.classList.contains("show")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft"){ setImage(current - 1, false); lbImg.src = p.images[current]; }
    if(e.key === "ArrowRight"){ setImage(current + 1, false); lbImg.src = p.images[current]; }
  });

  /* Swipe support (mobile) */
  let touchStartX = 0;
  galleryMain.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive:true });
  galleryMain.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if(Math.abs(diff) > 40){ setImage(diff > 0 ? current - 1 : current + 1); resetAutoplay(); }
  }, { passive:true });

  /* ---- Info panel render ---- */
  document.querySelector("#pCat").textContent = `${p.cat} · ${p.tag}`;
  document.querySelector("#pTitle").textContent = p.title;
  document.querySelector("#pStars").textContent = starString(p.rating);
  document.querySelector("#pRatingText").textContent = `${p.rating} out of 5`;
  document.querySelector("#pReviewCount").textContent = `${p.reviews} reviews`;
  document.querySelector("#pNow").textContent = formatINR(p.price);
  document.querySelector("#pOld").textContent = formatINR(p.oldPrice);
  document.querySelector("#pSave").textContent = `You save ${formatINR(p.oldPrice - p.price)} (${off}% off)`;
  document.querySelector("#pShort").textContent = p.short;
  document.querySelector("#pDescription").textContent = p.description;
  document.querySelector("#pIncluded").innerHTML = p.included.map(i => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>${i}</li>`).join("");
  document.querySelector("#pWho").innerHTML = p.who.map(w => `<span>${w}</span>`).join("");
  document.querySelectorAll("[data-add-cart-hero]").forEach(b => b.dataset.addCart = p.id);
  document.querySelectorAll("[data-buy-now-hero]").forEach(b => b.dataset.buyNow = p.id);
  document.querySelectorAll("[data-wish-hero]").forEach(b => b.dataset.wishToggle = p.id);
  if(p.bundle){ document.querySelector("#bundleBadgeHero")?.classList.remove("hidden"); }

  const faqWrap = document.querySelector("#pFaqs");
  faqWrap.innerHTML = p.faqs.map((f,i) => `
    <div class="faq-item${i===0?' open':''}">
      <button class="faq-q"><span>${f.q}</span><span class="plus">+</span></button>
      <div class="faq-a" ${i===0?'style="max-height:200px"':''}><p>${f.a}</p></div>
    </div>`).join("");
  faqWrap.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-a");
      const isOpen = item.classList.contains("open");
      item.classList.toggle("open", !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---- Tabs ---- */
  document.querySelectorAll(".p-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".p-tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".p-tab-panel").forEach(pnl => pnl.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`#panel-${tab.dataset.tab}`).classList.add("active");
    });
  });

  /* ---- Related products ---- */
  const related = PRODUCTS.filter(x => x.id !== p.id && (x.cat === p.cat || x.bundle)).slice(0,4);
  renderGrid(document.querySelector("#relatedGrid"), related.length ? related : PRODUCTS.filter(x => x.id !== p.id).slice(0,4));

  /* ---- Recently viewed ---- */
  RecentlyViewed.render(document.querySelector("#recentGrid"), p.id);

  /* ---- Mobile sticky buy bar ---- */
  const buyBar = document.querySelector("#mobileBuyBar");
  if(buyBar){
    buyBar.querySelector(".mb-now").textContent = formatINR(p.price);
    buyBar.querySelector(".mb-old").textContent = formatINR(p.oldPrice);
    buyBar.querySelector("[data-add-cart]").dataset.addCart = p.id;
    buyBar.querySelector("[data-buy-now]").dataset.buyNow = p.id;
  }

  /* ---- Share buttons ---- */
  document.querySelectorAll("[data-share]").forEach(a => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(p.title + " — Premium NEET Short Notes");
    const type = a.dataset.share;
    const map = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      copy: null
    };
    if(type === "copy"){
      a.addEventListener("click", ev => {
        ev.preventDefault();
        navigator.clipboard?.writeText(window.location.href);
        showToast("Link copied to clipboard", "success");
      });
    } else {
      a.href = map[type]; a.target = "_blank"; a.rel = "noopener";
    }
  });
});
