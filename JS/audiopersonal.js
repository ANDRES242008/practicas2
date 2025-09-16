(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const label = document.querySelector('.categories-label');
    const menu = document.querySelector('.menu-items');

    function toggleMenu() {
      const isVisible = menu.style.display === 'grid';
      menu.style.display = isVisible ? 'none' : 'grid';
      label.setAttribute('aria-expanded', String(!isVisible));
    }

    label.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que el clic cierre inmediatamente
      toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!label.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
        label.setAttribute('aria-expanded', 'false');
      }
    });

    // Accesibilidad con Enter o espacio
    label.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    const toggleButton = document.querySelector('.categories-label');
    const menuItems = document.querySelector('.menu-items');

    // Mostrar el menú cuando se hace clic en el botón
    toggleButton.addEventListener('click', () => {
      menuItems.classList.toggle('visible');
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener('click', (event) => {
      if (!toggleButton.contains(event.target) && !menuItems.contains(event.target)) {
        menuItems.classList.remove('visible');
      }
    });

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function highlightText(element, query) {
  if (!query) {
    element.innerHTML = element.textContent;
    return;
  }
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  element.innerHTML = element.textContent.replace(regex, '<mark>$1</mark>');
}

function filterProducts(query) {
  const cards = document.querySelectorAll('.card');
  const productos = document.querySelectorAll('.producto');
  let anyVisible = false;

  cards.forEach(card => {
    const titleEl = card.querySelector('.card-title');
    const title = titleEl.textContent.toLowerCase();
    const match = title.includes(query);
    card.style.display = match ? 'block' : 'none';
    highlightText(titleEl, query);
    if (match) anyVisible = true;
  });

  productos.forEach(producto => {
    const nameEl = producto.querySelector('.nombre-producto');
    const name = nameEl.textContent.toLowerCase();
    const match = name.includes(query);
    producto.style.display = match ? 'block' : 'none';
    highlightText(nameEl, query);
    if (match) anyVisible = true;
  });

  let noResults = document.querySelector('.no-results-message');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.className = 'no-results-message';
    noResults.style.color = 'red';
    noResults.style.fontWeight = 'bold';
    noResults.style.marginTop = '1em';
    noResults.textContent = 'No se encontraron resultados.';
    const productosContainer = document.querySelector('.productos');
    productosContainer.parentNode.insertBefore(noResults, productosContainer.nextSibling);
  }

  noResults.style.display = anyVisible ? 'none' : 'block';
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(function () {
  const query = this.value.trim().toLowerCase();
  filterProducts(query);
}, 300));

    // Sorting products functionality
    const ordenSelect = document.getElementById('orden-select');
    const productosContainer = document.querySelector('.productos');

    function parsePrice(priceString) {
      return parseFloat(priceString.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
    }

    function parseDiscount(discountString) {
      return parseInt(discountString.replace(/[^0-9]/g, '')) || 0;
    }

    function sortProducts(criteria) {
      const productos = Array.from(productosContainer.querySelectorAll('.producto'));

      productos.sort((a, b) => {
        if (criteria === 'precio-asc') {
          const priceA = parsePrice(a.querySelector('.precio-descuento').textContent);
          const priceB = parsePrice(b.querySelector('.precio-descuento').textContent);
          return priceA - priceB;
        } else if (criteria === 'precio-desc') {
          const priceA = parsePrice(a.querySelector('.precio-descuento').textContent);
          const priceB = parsePrice(b.querySelector('.precio-descuento').textContent);
          return priceB - priceA;
        } else if (criteria === 'descuento') {
          const discountA = parseDiscount(a.querySelector('.descuento').textContent);
          const discountB = parseDiscount(b.querySelector('.descuento').textContent);
          return discountB - discountA;
        }
        return 0;
      });

      // Remove all products and re-append in sorted order
      productos.forEach(producto => productosContainer.appendChild(producto));
    }

    ordenSelect.addEventListener('change', (e) => {
      sortProducts(e.target.value);
    });
  });
})();
