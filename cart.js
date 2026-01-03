function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById("cart-container");
    const totalEl = document.getElementById("cart-total");

    if (!cart.length) {
        container.textContent = "Your cart is empty";
        totalEl.textContent = "";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <div>
                ${item.name} — KSh ${item.price} × ${item.quantity}
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalEl.textContent = `Total: KSh ${total}`;
}

function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);

const addToCartButtons = document.getElementById("cereals")
const addToCartButtons1 = document.getElementById("beans")
const cereals = getElementById("cereals");
const beans = getElementById("beans");
addToCartButtons.onclick = function() {
    getElementById("cart-container").innerHTML = "Screenshot 2025-12-30 172530.png"
    const img = document.createElement("img");
    img.src = "Screenshot 2025-12-30 172530.png";
    img.style.width = "200px";

    document.getElementById("cart-container").appendChild(img);
}
addToCartButtons1.onclick = function() {
    getElementById("cart-container").innerHTML = "Screenshot 2025-12-30 172530.png"
    const img = document.createElement("img");
    img.src = "Screenshot 2025-12-30 172530.png";
    img.style.width = "200px";

    document.getElementById("cart-container").appendChild(img);
}