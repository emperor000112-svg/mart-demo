const products = [
  {name:'Maxo Liq 45ml', category:'Home & Living', price:49, badge:'BEST DEAL', image:'assets/deal-1.jpg'},
  {name:'Lux Soap 500gm', category:'Beauty & Care', price:69, badge:'DEAL', image:'assets/deal-2.jpg'},
  {name:'Stayfree 18 Pads', category:'Beauty & Care', price:99, badge:'DEAL', image:'assets/deal-3.jpg'},
  {name:'Himalaya Baby Cream 200ml', category:'Beauty & Care', price:249, badge:'DEAL', image:'assets/deal-4.jpg'},
  {name:'Get Real Coconut Oil 250ml', category:'Beauty & Care', price:0, badge:'BUY 1 GET 1 FREE', image:'assets/deal-5.jpg'},
  {name:'Patanjali Dant Kanti 800gm', category:'Beauty & Care', price:279, badge:'DEAL', image:'assets/deal-6.jpg'},
  {name:'Close Up 150gm × 4', category:'Beauty & Care', price:249, badge:'DEAL', image:'assets/deal-7.jpg'},
  {name:'Detergent Powder 1kg', category:'Home & Living', price:49, badge:'DEAL', image:'assets/deal-8.jpg'},
  {name:'MamyPoko Pants S-M-L-XL', category:'Beauty & Care', price:249, badge:'DEAL', image:'assets/deal-9.jpg'},
  {name:'Parachute Coconut Oil 1L', category:'Beauty & Care', price:425, badge:'DEAL', image:'assets/deal-10.jpg'},
  {name:'Haldiram Soan Cake 200gm', category:'Gifts & More', price:45, badge:'DEAL', image:'assets/deal-11.jpg'},
  {name:'Himalaya Neem Face Wash 200ml', category:'Beauty & Care', price:175, badge:'DEAL', image:'assets/deal-12.jpg'},
  {name:'Face/Body Lotion 240ml', category:'Beauty & Care', price:199, badge:'DEAL', image:'assets/deal-13.jpg'},
  {name:'Joy Honey Almond Cream 200gm', category:'Beauty & Care', price:125, badge:'DEAL', image:'assets/deal-14.jpg'},
  {name:'Dove Intense Repair Shampoo 650ml', category:'Beauty & Care', price:599, badge:'DEAL', image:'assets/deal-15.jpg'},
  {name:'Head & Shoulders Shampoo 650ml', category:'Beauty & Care', price:499, badge:'DEAL', image:'assets/deal-16.jpg'},
  {name:'Baby Hug Diaper Pants S-M-L-XL-NB', category:'Beauty & Care', price:229, badge:'DEAL', image:'assets/deal-17.jpg'},
  {name:'Johnson\'s Baby Cream 75gm', category:'Beauty & Care', price:75, badge:'DEAL', image:'assets/deal-18.jpg'},
  {name:'Neo Toilet Clean 1L', category:'Home & Living', price:59, badge:'DEAL', image:'assets/deal-19.jpg'},
  {name:'Medimix Handwash 675ml', category:'Beauty & Care', price:49, badge:'DEAL', image:'assets/deal-20.jpg'},
  {name:'Godrej Fab Liq 825gm', category:'Home & Living', price:79, badge:'DEAL', image:'assets/deal-21.jpg'},
  {name:'Fiama Soap 125gm × 5', category:'Beauty & Care', price:225, badge:'DEAL', image:'assets/deal-22.jpg'},
  {name:'Nivea Body Milk Lotion 400ml', category:'Beauty & Care', price:0, badge:'BUY 1 GET 1 FREE', image:'assets/deal-23.jpg'},
  {name:'Mega Fresh Dishwash 1L', category:'Home & Living', price:59, badge:'DEAL', image:'assets/deal-24.jpg'},
  {name:'Ayur Shampoo 1L', category:'Beauty & Care', price:249, badge:'DEAL', image:'assets/deal-25.jpg'},
  {name:'Perfume', category:'Beauty & Care', price:0, badge:'40% OFF ON MRP', image:'assets/deal-26.jpg'},
  {name:'AB Jodi 1kg', category:'Home & Living', price:259, badge:'DEAL', image:'assets/deal-27.jpg'},
  {name:'Yardley Body Lotion 400ml', category:'Beauty & Care', price:175, badge:'DEAL', image:'assets/deal-28.jpg'}
];
const grid = document.querySelector('#product-grid');
const cart = [];

function money(value){
  return value ? `₹${value.toLocaleString('en-IN')}` : '—';
}

function renderProducts(){
  grid.innerHTML = products.map((p,i) => `<article class="product-card" onclick="openProduct(${i})">
  <div class="product-image deal-photo"><span class="badge">${p.badge}</span><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
  <div class="product-info"><h3>${p.name}</h3><p>${p.category}</p><div class="product-bottom"><span class="price">${money(p.price)}</span>
  <button class="add-button" aria-label="Add ${p.name}" onclick="event.stopPropagation();addToCart(${i})">+</button></div></div></article>`).join('');
}
function addToCart(index,qty=1){
  const p=products[index]; if(!p.price)return alert(p.badge);
  for(let n=0;n<qty;n++)cart.push(p); renderCart();
  document.querySelector('.cart-panel').classList.add('open');document.querySelector('.overlay').classList.add('open');
}
function renderCart(){
 const total=cart.reduce((s,p)=>s+p.price,0);document.querySelector('#cart-count').textContent=cart.length;document.querySelector('#subtotal').textContent=money(total);
 const g={};cart.forEach(p=>{g[p.name]=g[p.name]||{p,qty:0};g[p.name].qty++});
 document.querySelector('#cart-items').innerHTML=cart.length?Object.values(g).map(({p,qty})=>`<div class="cart-item"><div class="mini"><img src="${p.image}" alt=""></div><div><strong>${p.name}</strong><span>${money(p.price)} × ${qty}</span><div class="cart-qty"><button onclick="changeCartQty('${p.name.replace("'","\\'")}',-1)">−</button><b>${qty}</b><button onclick="changeCartQty('${p.name.replace("'","\\'")}',1)">+</button></div></div></div>`).join(''):'<p class="empty-cart">Your bag is waiting for a good deal.</p>';
}
function changeCartQty(name,delta){const i=cart.findIndex(p=>p.name===name);if(i<0)return;if(delta>0)cart.push(cart[i]);else cart.splice(i,1);renderCart();}
function openProduct(i){const p=products[i];document.querySelector('#modal-image').src=p.image;document.querySelector('#modal-image').alt=p.name;document.querySelector('#modal-name').textContent=p.name;document.querySelector('#modal-category').textContent=p.category;document.querySelector('#modal-price').textContent=p.price?money(p.price):p.badge;document.querySelector('#modal-badge').textContent=p.badge;document.querySelector('#modal-offer').textContent=p.price?'Special LP Deal price • Limited stock':p.badge;document.querySelector('#modal-qty').textContent=1;document.querySelector('#modal-add').onclick=()=>{addToCart(i,+document.querySelector('#modal-qty').textContent);closeProduct()};document.querySelector('#modal-whatsapp').onclick=()=>orderProductWhatsApp(p,+document.querySelector('#modal-qty').textContent);document.querySelector('#product-modal').classList.add('open');}
function closeProduct(){document.querySelector('#product-modal').classList.remove('open');}
function orderProductWhatsApp(p,qty){if(!p.price)return alert(p.badge);const msg=`Hello LP Deal,%0A%0AI want to order:%0A• ${encodeURIComponent(p.name)}%0A• Quantity: ${qty}%0A• Total: ${money(p.price*qty)}%0A%0APlease confirm availability and delivery details.`;window.open(`https://wa.me/?text=${msg}`,'_blank');}
function orderCartWhatsApp(){if(!cart.length)return alert('Your bag is empty.');const g={};cart.forEach(p=>{g[p.name]=g[p.name]||{p,qty:0};g[p.name].qty++});let total=0,msg='Hello LP Deal,%0A%0AI want to order:%0A';Object.values(g).forEach(({p,qty})=>{total+=p.price*qty;msg+=`• ${encodeURIComponent(p.name)} × ${qty} = ${money(p.price*qty)}%0A`});msg+=`%0ASubtotal: ${money(total)}%0A%0APlease confirm availability and delivery details.`;window.open(`https://wa.me/?text=${msg}`,'_blank');}

function closeCart(){document.querySelector('.cart-panel').classList.remove('open');document.querySelector('.overlay').classList.remove('open');}
document.querySelector('.cart-button').addEventListener('click',()=>{document.querySelector('.cart-panel').classList.add('open');document.querySelector('.overlay').classList.add('open');});
document.querySelector('.close-cart').addEventListener('click',closeCart);
document.querySelector('.overlay').addEventListener('click',closeCart);
document.querySelector('.checkout').addEventListener('click',orderCartWhatsApp);
document.querySelector('.newsletter form').addEventListener('submit',(e)=>{e.preventDefault(); alert('Thanks! Your 10% code is on its way.');});
renderProducts();
\ndocument.querySelectorAll('[data-close-product]').forEach(e=>e.addEventListener('click',closeProduct));
document.querySelector('#qty-minus').addEventListener('click',()=>{let e=document.querySelector('#modal-qty');e.textContent=Math.max(1,+e.textContent-1)});
document.querySelector('#qty-plus').addEventListener('click',()=>{let e=document.querySelector('#modal-qty');e.textContent=+e.textContent+1});
