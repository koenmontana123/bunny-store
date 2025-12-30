// cart.js — complete cart rendering and actions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const totalDiv = document.getElementById('total');
  if (!cartItemsDiv || !totalDiv) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.textContent = 'Your cart is empty.';
    cartItemsDiv.appendChild(p);
    totalDiv.textContent = 'Total: KSh 0';
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'cart-item';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${item.name} (x${item.quantity})`;

    const priceSpan = document.createElement('span');
    priceSpan.textContent = `KSh ${item.price * item.quantity}`;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('aria-label', `Remove ${item.name} from cart`);
    removeBtn.addEventListener('click', () => {
      removeItem(index);
      // after removal, move focus to first remove button or clear button for continuity
      setTimeout(() => {
        const next = document.querySelector('.remove-btn');
        const clearBtn = document.getElementById('clear-cart-btn');
        if (next) next.focus();
        else if (clearBtn) clearBtn.focus();
      }, 50);
    });

    div.appendChild(nameSpan);
    div.appendChild(priceSpan);
    div.appendChild(removeBtn);
    cartItemsDiv.appendChild(div);
  });

  totalDiv.textContent = 'Total: KSh ' + total;
}

function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  // attach clear button listener (no inline handler)
  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearCart();
      const live = document.getElementById('total');
      if (live) live.textContent = 'Total: KSh 0';
      // announce for screen readers
      const cartLive = document.getElementById('cart-live');
      if (cartLive) cartLive.textContent = 'Cart cleared.';
    });
  }
});