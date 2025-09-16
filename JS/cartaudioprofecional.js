(function() {
  // Cart management using localStorage
  const cartKey = 'shoppingCart';

  function getCart() {
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  }
  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity: quantity });
    }
    saveCart(cart);
    updateCartUI();
  }

  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartUI();
  }

  function updateCartUI() {
    const cart = getCart();
    const cartCountElem = document.querySelector('.cart-count');
    const cartItemsElem = document.querySelector('.cart-items');
    const cartTotalElem = document.getElementById('cart-total');

    if (!cartCountElem || !cartItemsElem || !cartTotalElem) return;

    cartCountElem.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItemsElem.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - ${item.priceDescuento}`;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Eliminar';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => removeFromCart(item.id));
      li.appendChild(removeBtn);
      cartItemsElem.appendChild(li);

      // Remove $ and convert to number for calculation
      const priceNum = parseFloat(item.priceDescuento.replace(/[^0-9.-]+/g,""));
      total += priceNum * item.quantity;
    });

    cartTotalElem.textContent = `$${total.toFixed(2)}`;
  }

  // Expose functions globally for buttons to use
  window.cart = {
    addToCart,
    updateCartUI,
    getCart
  };

  // Initialize cart UI on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Toggle cart panel visibility on clicking cart icon/link
    const cartLink = document.querySelector('a[aria-label="Ver mi carrito de compras"]');
    const cartPanel = document.querySelector('.cart-panel');
    if (cartLink && cartPanel) {
      cartPanel.style.display = 'none'; // Hide initially
      cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (cartPanel.style.display === 'none') {
          cartPanel.style.display = 'block';
        } else {
          cartPanel.style.display = 'none';
        }
      });

      // Hide cart panel when clicking outside of it
      document.addEventListener('click', (e) => {
        if (!cartPanel.contains(e.target) && !cartLink.contains(e.target)) {
          cartPanel.style.display = 'none';
        }
      });
    }
  });

  // Helper function to add event listeners to buttons with class 'btn-carrito'
  function setupAddToCartButtons(products) {
    document.querySelectorAll('.btn-carrito').forEach((button, index) => {
      button.addEventListener('click', () => {
        // Redirect to productcelulares.html instead of adding to cart
        window.location.href = 'productcelulares.html';
      });
    });
  }

  // Expose setup function
  window.cart.setupAddToCartButtons = setupAddToCartButtons;
})();
