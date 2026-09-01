const products=getProducts(), business=getBusiness();const path=location.pathname.split("/").pop()||"index.html";const app=document.getElementById("app");
function nav(){return `<nav class="nav"><div class="container nav-inner"><a class="brand" href="index.html">ORDERIN<span> / ${business.name}</span></a><div class="navlinks"><a href="products.html">Katalog</a><a href="index.html#how">Cara Order</a><a class="cart-btn" href="cart.html">🛒 Keranjang (${getCart().reduce((a,x)=>a+x.qty,0)})</a></div></div></nav>`}
function footer(){return `<footer class="footer"><div class="container"><b>${business.name}</b><p class="muted" style="color:#aaa">${business.tagline}</p><p style="color:#aaa">${business.address} · ${business.hours}</p></div></footer>`}
function card(p){return `<article class="card"><a href="product-detail.html?id=${p.id}"><div class="product-img">${p.emoji}</div></a><div class="card-body"><small class="muted">${p.category}</small><h3>${p.name}</h3><div class="price">${money(p.price)}</div><div class="card-actions"><a class="secondary" href="product-detail.html?id=${p.id}">Detail</a><button class="primary" onclick="addToCart(${p.id})">Tambah</button></div></div></article>`}
function addToCart(id,qty=1){let c=getCart(),item=c.find(x=>x.id==id);if(item)item.qty+=qty;else c.push({id,qty});saveCart(c);toast("Produk masuk keranjang");setTimeout(()=>location.reload(),350)}
function toast(t){let e=document.createElement("div");e.className="toast";e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1800)}
function renderHome(){
let cats=[...new Set(products.map(p=>p.category))];
let best=products.filter(p=>p.bestseller).slice(0,4);
app.innerHTML=nav()+`<main>
<section class="hero"><div class="container hero-grid">
<div><div class="eyebrow">NARA KITCHEN · CIREBON</div>
<h1>${business.tagline}</h1>
<p>${business.story}</p>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px">
<a class="primary" href="products.html">Lihat Menu →</a>
<a class="secondary" href="#story">Cerita Kami</a>
</div>
<div style="margin-top:18px;font-size:14px;color:#666">🔥 ${business.promo}</div>
</div>
<div class="hero-card">🍛</div>
</div></section>

<section class="section"><div class="container">
<div class="section-head"><div><div class="eyebrow">TODAY'S PICKS</div><h2>Menu favorit NARA</h2></div>
<a href="products.html">Lihat semua →</a></div>
<div class="grid">${best.map(card).join("")}</div>
</div></section>

<section class="section" id="story"><div class="container">
<div class="detail" style="padding:20px 0;align-items:center">
<div class="hero-card" style="min-height:300px">🌶️</div>
<div><div class="eyebrow">OUR STORY</div><h2 style="font-size:38px;margin:10px 0">Comfort food Indonesia, dengan cara kami.</h2>
<p class="muted" style="font-size:17px;line-height:1.8">${business.story}</p>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px">
<div class="panel"><b>Fresh</b><br><small class="muted">Bahan dipilih setiap hari.</small></div>
<div class="panel"><b>Made Daily</b><br><small class="muted">Sambal & saus diracik fresh.</small></div>
<div class="panel"><b>Fast Order</b><br><small class="muted">Pesan langsung via WhatsApp.</small></div>
</div></div>
</div></div></section>

<section class="section"><div class="container">
<div class="promo"><div><div class="eyebrow" style="color:#aaa">SPECIAL TODAY</div>
<h2 style="margin:8px 0">${business.promo}</h2>
<div style="color:#bbb">Berlaku untuk pesanan makan di tempat dan takeaway.</div></div>
<a class="primary" href="products.html">Pesan Sekarang</a></div>
</div></section>

<section class="section"><div class="container">
<div class="section-head"><div><div class="eyebrow">MENU</div><h2>Pilih sesuai mood</h2></div></div>
<div class="categories">${cats.map(c=>`<a class="chip" href="products.html?category=${encodeURIComponent(c)}">${c}</a>`).join("")}</div>
</div></section>

<section class="section"><div class="container">
<div class="panel" style="padding:28px">
<div class="eyebrow">VISIT US</div><h2 style="margin:8px 0">${business.name}</h2>
<p class="muted">${business.address}<br>Buka ${business.hours} · ${business.city}</p>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<a class="primary" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}">Buka Maps</a>
<a class="secondary" target="_blank" href="https://wa.me/${business.phone}">WhatsApp</a>
</div></div></div></section>
</main>${footer()}`}

function productImgBox(p,sizeClass){return `<div class="relative ${sizeClass} w-full overflow-hidden bg-gradient-to-br from-surface-container to-surface-container-highest flex items-center justify-center"><span class="text-6xl md:text-7xl group-hover:scale-105 transition-transform duration-500">${p.emoji}</span>${p.bestseller?`<div class="absolute top-sm left-sm bg-tertiary-container text-on-tertiary px-2 py-1 rounded font-label-caps text-label-caps tracking-widest">BESTSELLER</div>`:""}</div>`}
function productCard(p){let qty=cartQtyFor(p.id);return `<div class="bg-surface-container-lowest border border-outline-variant/50 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group" data-card="${p.id}">
${productImgBox(p,"h-48 md:h-64")}
<div class="p-md flex flex-col flex-grow">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-xs">${p.name}</h3>
<p class="font-body-sm text-body-sm text-on-surface-variant flex-grow mb-md">${p.description}</p>
<div class="flex justify-between items-center mt-auto">
<span class="font-mono-data text-mono-data text-primary font-semibold">${money(p.price)}</span>
<button class="${qty>0?"hidden":""} w-10 h-10 rounded-full bg-primary text-on-primary-fixed flex items-center justify-center hover:bg-primary-fixed transition-colors duration-200 active:scale-95" data-add="${p.id}">
<span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">add</span>
</button>
<div class="${qty>0?"flex":"hidden"} items-center gap-sm bg-surface-variant rounded-full p-1" data-qty-controls="${p.id}">
<button class="w-8 h-8 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center border border-outline-variant/30 active:bg-surface-variant" data-dec="${p.id}">
<span class="material-symbols-outlined text-[18px]">remove</span>
</button>
<span class="font-mono-data text-mono-data w-4 text-center" data-qtyval="${p.id}">${qty||1}</span>
<button class="w-8 h-8 rounded-full bg-primary text-on-primary-fixed flex items-center justify-center active:bg-primary-fixed" data-inc="${p.id}">
<span class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 1">add</span>
</button>
</div>
</div>
</div>
</div>`}
function cartQtyFor(id){let it=getCart().find(x=>x.id==id);return it?it.qty:0}
function cartTotalQty(){return getCart().reduce((a,x)=>a+x.qty,0)}
function productsHeader(){return `<header class="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant/30">
<div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto">
<div class="flex items-center gap-4">
<a class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary" href="index.html">${business.name}</a>
</div>
<nav class="hidden md:flex gap-lg items-center font-body-md text-body-md">
<a class="text-primary font-bold border-b-2 border-primary pb-1" href="products.html">Menu</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-200 pb-1" href="index.html">Promo</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-200 pb-1" href="index.html#story">Tentang Kami</a>
<a class="text-on-surface-variant hover:text-primary transition-colors duration-200 pb-1" href="cart.html">Pesanan</a>
</nav>
<div class="flex items-center gap-md">
<button id="searchToggle" class="text-on-surface-variant hover:text-primary transition-colors duration-200 p-2 md:hidden">
<span class="material-symbols-outlined">search</span>
</button>
<a href="cart.html" class="text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-xs relative">
<span class="material-symbols-outlined">shopping_bag</span>
<span class="hidden md:inline-block font-label-caps text-label-caps">Keranjang</span>
<span class="absolute -top-2 -right-2 md:static md:ml-1 w-4 h-4 md:w-auto md:h-auto bg-error md:bg-transparent text-on-error md:text-primary rounded-full text-[10px] md:text-mono-data flex items-center justify-center font-bold" data-cart-badge>${cartTotalQty()}</span>
</a>
</div>
</div>
</header>`}
function productsBottomNav(){return `<nav class="fixed bottom-0 w-full z-50 md:hidden bg-surface-container border-t border-outline-variant/20 shadow-lg">
<div class="flex justify-around items-center h-16 pb-safe">
<button class="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-full py-1 px-4 active:bg-surface-variant/50 active:scale-90 transition-all duration-150">
<span class="material-symbols-outlined mb-1">restaurant_menu</span>
<span class="font-label-caps text-label-caps">Menu</span>
</button>
<button id="searchToggleMobile" class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-variant/50 active:scale-90 transition-all duration-150">
<span class="material-symbols-outlined mb-1">search</span>
<span class="font-label-caps text-label-caps">Cari</span>
</button>
<a href="cart.html" class="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-variant/50 active:scale-90 transition-all duration-150 relative">
<span class="material-symbols-outlined mb-1">shopping_cart</span>
<span class="font-label-caps text-label-caps">Keranjang</span>
<span class="absolute top-0 right-2 w-4 h-4 bg-error text-on-error rounded-full text-[10px] flex items-center justify-center font-bold" data-cart-badge>${cartTotalQty()}</span>
</a>
</div>
</nav>`}
function renderProducts(){
let cats=["Semua",...new Set(products.map(p=>p.category))];
let active=new URLSearchParams(location.search).get("category")||"Semua";
app.innerHTML=`${productsHeader()}
<main class="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop pt-lg md:pt-xl">
<div id="searchWrap" class="hidden mb-md">
<input id="search" class="w-full px-md py-3 rounded-lg bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant font-body-md" placeholder="Cari produk...">
</div>
<div class="overflow-x-auto no-scrollbar py-sm mb-lg -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 border-b border-outline-variant/20 sticky top-20 bg-background z-40">
<div class="flex gap-sm">
${cats.map(c=>`<button class="chip-cat px-md py-2 rounded-full font-label-caps text-label-caps whitespace-nowrap transition-colors ${c===active?"bg-primary text-on-primary-fixed":"bg-surface-container border border-outline-variant text-on-surface-variant hover:bg-surface-variant"}" data-cat="${c}">${c}</button>`).join("")}
</div>
</div>
<div id="productGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md md:gap-lg"></div>
</main>
${productsBottomNav()}`;

function update(){
let q=(document.getElementById("search")?.value||"").toLowerCase();
let list=products.filter(p=>(active==="Semua"||p.category===active)&&p.name.toLowerCase().includes(q));
document.getElementById("productGrid").innerHTML=list.length?list.map(productCard).join(""):`<div class="col-span-full text-center py-xxl text-on-surface-variant">Produk tidak ditemukan.</div>`;
wireCardEvents();
}

function wireCardEvents(){
document.querySelectorAll("[data-add]").forEach(btn=>btn.onclick=()=>{
let id=Number(btn.dataset.add);
addToCartInline(id,1);
});
document.querySelectorAll("[data-inc]").forEach(btn=>btn.onclick=()=>{
addToCartInline(Number(btn.dataset.inc),1);
});
document.querySelectorAll("[data-dec]").forEach(btn=>btn.onclick=()=>{
decCartInline(Number(btn.dataset.dec));
});
}

function addToCartInline(id,delta){
let c=getCart(),item=c.find(x=>x.id==id);
if(item)item.qty+=delta;else c.push({id,qty:delta});
saveCart(c);
syncCardUI(id);
toast("Produk masuk keranjang");
}
function decCartInline(id){
let c=getCart(),item=c.find(x=>x.id==id);
if(!item)return;
item.qty-=1;
if(item.qty<=0)c=c.filter(x=>x.id!=id);
saveCart(c);
syncCardUI(id);
}
function syncCardUI(id){
let qty=cartQtyFor(id);
let card=document.querySelector(`[data-card="${id}"]`);
if(card){
let addBtn=card.querySelector(`[data-add="${id}"]`);
let controls=card.querySelector(`[data-qty-controls="${id}"]`);
let val=card.querySelector(`[data-qtyval="${id}"]`);
if(qty>0){addBtn.classList.add("hidden");controls.classList.remove("hidden");controls.classList.add("flex");val.textContent=qty;}
else{addBtn.classList.remove("hidden");controls.classList.add("hidden");controls.classList.remove("flex");}
}
document.querySelectorAll("[data-cart-badge]").forEach(b=>b.textContent=cartTotalQty());
}

document.getElementById("search")?.addEventListener("input",update);
document.querySelectorAll(".chip-cat").forEach(x=>x.onclick=()=>{
active=x.dataset.cat;
document.querySelectorAll(".chip-cat").forEach(c=>{
c.classList.toggle("bg-primary",c.dataset.cat===active);
c.classList.toggle("text-on-primary-fixed",c.dataset.cat===active);
c.classList.toggle("bg-surface-container",c.dataset.cat!==active);
c.classList.toggle("border",c.dataset.cat!==active);
c.classList.toggle("border-outline-variant",c.dataset.cat!==active);
c.classList.toggle("text-on-surface-variant",c.dataset.cat!==active);
});
update();
});
function toggleSearch(){document.getElementById("searchWrap").classList.toggle("hidden");document.getElementById("search")?.focus();}
document.getElementById("searchToggle")?.addEventListener("click",toggleSearch);
document.getElementById("searchToggleMobile")?.addEventListener("click",toggleSearch);
update();
}
function renderDetail(){
let id=new URLSearchParams(location.search).get("id"),p=products.find(x=>x.id==id)||products[0];
let variants=(p.variants||[]).map((v,i)=>`<option>${v}</option>`).join("");
app.innerHTML=nav()+`<main class="container"><div class="detail">
<div class="detail-img">${p.emoji}</div>
<div><small class="muted">${p.category}${p.bestseller?" · ⭐ Best Seller":""}</small>
<h1>${p.name}</h1><div class="bigprice">${money(p.price)}</div>
<p class="muted" style="line-height:1.7">${p.description}</p>
${variants?`<label style="font-size:13px;font-weight:800;display:block;margin-top:20px">Pilihan<select id="variant" style="display:block;width:100%;padding:13px;border:1px solid #ddd;border-radius:11px;background:#fff;margin-top:7px">${variants}</select></label>`:""}
<div class="qty"><button onclick="changeQty(-1)">−</button><span id="q">1</span><button onclick="changeQty(1)">+</button></div>
<button class="primary" onclick="addToCart(${p.id},Number(document.getElementById('q').textContent))">Tambah ke Keranjang</button>
<div style="margin-top:15px;color:#666;font-size:13px">✓ Bisa dipesan takeaway · ✓ Checkout via WhatsApp</div>
</div></div></main>${footer()}`;
let q=1;window.changeQty=n=>{q=Math.max(1,q+n);document.getElementById("q").textContent=q}
}

function cartItems(){return getCart().map(x=>({...x,p:products.find(p=>p.id==x.id)})).filter(x=>x.p)}
function renderCart(){let items=cartItems(),total=items.reduce((a,x)=>a+x.p.price*x.qty,0);app.innerHTML=nav()+`<main class="container"><div class="cart-layout"><section class="panel"><h1>Keranjang</h1>${items.length?items.map(x=>`<div class="cart-row"><div class="thumb">${x.p.emoji}</div><div class="grow"><b>${x.p.name}</b><div class="muted">${money(x.p.price)} · ${x.qty} pcs</div></div><button class="secondary" onclick="removeItem(${x.id})">Hapus</button></div>`).join(""):`<div class="empty">Keranjang masih kosong.<br><a href="products.html"><u>Belanja sekarang</u></a></div>`}</section><aside class="panel"><h2>Ringkasan</h2><div class="summary-row"><span>Subtotal</span><b>${money(total)}</b></div><div class="summary-row"><span>Biaya layanan</span><b>${money(0)}</b></div><div class="summary-row total"><span>Total</span><b>${money(total)}</b></div>${items.length?`<a class="primary" style="display:block;text-align:center;margin-top:18px" href="checkout.html">Lanjut Checkout</a>`:""}</aside></div></main>${footer()}`;window.removeItem=id=>{saveCart(getCart().filter(x=>x.id!=id));renderCart()}}
function renderCheckout(){let items=cartItems(),total=items.reduce((a,x)=>a+x.p.price*x.qty,0);if(!items.length){location.href="products.html";return}app.innerHTML=nav()+`<main class="container"><div class="checkout-layout"><section class="panel"><h1>Checkout</h1><form id="form" class="form-grid"><label>Nama<input required name="name" placeholder="Nama pelanggan"></label><label>No. WhatsApp<input required name="phone" placeholder="08xxxxxxxxxx"></label><label>Alamat<textarea required name="address" rows="3" placeholder="Alamat pengantaran / keterangan"></textarea></label><label>Catatan<textarea name="note" rows="3" placeholder="Contoh: tanpa pedas"></textarea></label><button class="primary">Buat Pesanan & Kirim WhatsApp</button></form></section><aside class="panel"><h2>Pesanan</h2>${items.map(x=>`<div class="summary-row"><span>${x.p.name} × ${x.qty}</span><b>${money(x.p.price*x.qty)}</b></div>`).join("")}<div class="summary-row total"><span>Total</span><b>${money(total)}</b></div></aside></div></main>${footer()}`;document.getElementById("form").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target),order={id:"ORD-"+Date.now().toString().slice(-6),createdAt:new Date().toISOString(),customer:{name:f.get("name"),phone:f.get("phone"),address:f.get("address"),note:f.get("note")},items,total,status:"Baru"};let orders=getOrders();orders.push(order);saveOrders(orders);saveCart([]);let lines=[`Halo ${business.name}, saya ingin order *${order.id}*`,``,`Nama: ${order.customer.name}`,`No. WA: ${order.customer.phone}`,`Alamat: ${order.customer.address}`,order.customer.note?`Catatan: ${order.customer.note}`:"",``,`Detail:`,...items.map(x=>`- ${x.p.name} x${x.qty} = ${money(x.p.price*x.qty)}`),``,`Total: *${money(total)}*`].filter(Boolean);window.open(`https://wa.me/${business.phone}?text=${encodeURIComponent(lines.join("\\n"))}`,"_blank");location.href="order-success.html?id="+order.id}}
function renderSuccess(){let id=new URLSearchParams(location.search).get("id");app.innerHTML=nav()+`<main class="container success"><div class="icon">✅</div><h1>Pesanan dibuat!</h1><p class="muted">Nomor order kamu <b>${id||""}</b>. Detail pesanan sudah disiapkan untuk dikirim melalui WhatsApp.</p><a class="primary" href="products.html">Kembali ke Katalog</a></main>${footer()}`}
if(path==="products.html")renderProducts();else if(path==="product-detail.html")renderDetail();else if(path==="cart.html")renderCart();else if(path==="checkout.html")renderCheckout();else if(path==="order-success.html")renderSuccess();else renderHome();
