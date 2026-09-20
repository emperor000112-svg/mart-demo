const products = [
  {name:'Cloud Ceramic Mug', category:'Home & Living', price:499, icon:'☕', badge:'BESTSELLER'},
  {name:'Everyday Tote Bag', category:'Everyday Style', price:699, icon:'👜', badge:'NEW'},
  {name:'Glow Ritual Set', category:'Beauty & Care', price:899, icon:'✨', badge:'FAVORITE'},
  {name:'Sunday Scented Candle', category:'Home & Living', price:399, icon:'🕯️', badge:'LIMITED'},
];
const grid = document.querySelector('#product-grid');
const cart = [];
function money(value){ return `₹${value.toLocaleString('en-IN')}`; }
function renderProducts(){ grid.innerHTML = products.map((p,i) => `<article class="product-card"><div class="product-image"><span class="badge">${p.badge}</span>${p.icon}</div><div class="product-info"><h3>${p.name}</h3><p>${p.category}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" aria-label="Add ${p.name}" onclick="addToCart(${i})">+</button></div></div></article>`).join(''); }
function addToCart(index){ cart.push(products[index]); renderCart(); document.querySelector('.cart-panel').classList.add('open'); document.querySelector('.overlay').classList.add('open'); }
function renderCart(){ const total = cart.reduce((sum,p)=>sum+p.price,0); document.querySelector('#cart-count').textContent=cart.length; document.querySelector('#subtotal').textContent=money(total); document.querySelector('#cart-items').innerHTML=cart.length ? cart.map((p,i)=>`<div class="cart-item"><div class="mini">${p.icon}</div><div><strong>${p.name}</strong><span>${money(p.price)}</span><br><button class="remove" onclick="removeFromCart(${i})">Remove</button></div></div>`).join('') : '<p class="empty-cart">Your bag is waiting for a good find.</p>'; }
function removeFromCart(index){cart.splice(index,1);renderCart();}
function closeCart(){document.querySelector('.cart-panel').classList.remove('open');document.querySelector('.overlay').classList.remove('open');}
document.querySelector('.cart-button').addEventListener('click',()=>{document.querySelector('.cart-panel').classList.add('open');document.querySelector('.overlay').classList.add('open');});
document.querySelector('.close-cart').addEventListener('click',closeCart);document.querySelector('.overlay').addEventListener('click',closeCart);
document.querySelector('.checkout').addEventListener('click',()=> alert(cart.length ? 'Thanks! Connect a payment gateway to accept orders.' : 'Your bag is empty.'));
document.querySelector('.newsletter form').addEventListener('submit',(e)=>{e.preventDefault(); alert('Thanks! Your 10% code is on its way.');});
renderProducts();
