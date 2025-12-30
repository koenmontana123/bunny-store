// script.js

// Function to add item to LocalStorage
function addToCart(name, price, imageSrc) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      image: imageSrc, // We now save the image too!
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  // Show a simple notification
  showNotification(name);
}

// Function to update the little number on the cart icon
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

// Simple toast notification
function showNotification(name) {
    const notice = document.createElement('div');
    notice.textContent = `${name} added to cart!`;
    notice.style.cssText = "position:fixed; right:20px; bottom:20px; background:#008080; color:#fff; padding:10px 20px; border-radius:5px; z-index:1000;";
    document.body.appendChild(notice);
    setTimeout(() => notice.remove(), 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Attach listeners to "Add to Cart" buttons
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            // Find the image inside the parent card to save it
            const card = btn.closest('.glass-card') || btn.closest('.card'); 
            const img = card.querySelector('img').src;

            addToCart(name, price, img);
        });
    });
});