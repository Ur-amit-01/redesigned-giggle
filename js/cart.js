/* ==========================================================================
   CART & WISHLIST — localStorage-backed store
   ========================================================================== */
const Cart = {
  KEY: "nns_cart",
  WKEY: "nns_wishlist",

  get(){ try{ return JSON.parse(localStorage.getItem(this.KEY)) || []; }catch(e){ return []; } },
  set(items){ localStorage.setItem(this.KEY, JSON.stringify(items)); this.updateBadges(); document.dispatchEvent(new Event("cart:change")); },

  add(id, qty = 1){
    const items = this.get();
    const existing = items.find(i => i.id === id);
    if(existing){ existing.qty += qty; } else { items.push({ id, qty }); }
    this.set(items);
    return items;
  },
  remove(id){ this.set(this.get().filter(i => i.id !== id)); },
  setQty(id, qty){
    const items = this.get();
    const it = items.find(i => i.id === id);
    if(it){ it.qty = Math.max(1, qty); }
    this.set(items);
  },
  clear(){ this.set([]); },
  count(){ return this.get().reduce((s,i) => s + i.qty, 0); },

  lines(){
    return this.get().map(i => {
      const p = typeof getProduct === "function" ? getProduct(i.id) : null;
      return p ? { ...p, qty: i.qty, lineTotal: p.price * i.qty } : null;
    }).filter(Boolean);
  },
  subtotal(){ return this.lines().reduce((s,l) => s + l.lineTotal, 0); },

  /* ---- Wishlist ---- */
  wget(){ try{ return JSON.parse(localStorage.getItem(this.WKEY)) || []; }catch(e){ return []; } },
  wset(items){ localStorage.setItem(this.WKEY, JSON.stringify(items)); this.updateBadges(); document.dispatchEvent(new Event("wishlist:change")); },
  wtoggle(id){
    let items = this.wget();
    if(items.includes(id)){ items = items.filter(i => i !== id); } else { items.push(id); }
    this.wset(items);
    return items.includes(id);
  },
  wcount(){ return this.wget().length; },

  updateBadges(){
    document.querySelectorAll("[data-cart-count]").forEach(el => {
      const n = this.count();
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
      el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    });
    document.querySelectorAll("[data-wishlist-count]").forEach(el => {
      const n = this.wcount();
      el.textContent = n;
      el.style.display = n > 0 ? "flex" : "none";
    });
  }
};

document.addEventListener("DOMContentLoaded", () => Cart.updateBadges());
