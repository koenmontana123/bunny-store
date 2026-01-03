function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = `(${count})`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            let cart = getCart();
            let item = cart.find(p => p.name === name);

            if (item) {
                item.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart(cart);
            updateCartCount();
        });
    });

    updateCartCount();
});
