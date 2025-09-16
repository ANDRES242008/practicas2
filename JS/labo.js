(function() {
      const track = document.getElementById('carousel-track');
      const dotsContainer = document.querySelector('.carousel-dots');
      const cards = track.children;
      const cardCount = cards.length;
      const visibleCardsCount = 4; 
      const pageCount = Math.ceil(cardCount / visibleCardsCount);
      let currentIndex = 0;
      for(let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Mostrar página ${i + 1}`);
        dot.classList.add('carousel-dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('tabindex', i === 0 ? "0" : "-1");
        if(i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
      }
      const dots = dotsContainer.children;
      function updateCarousel(index) {
        if(index < 0) index = 0;
        if(index >= pageCount) index = pageCount - 1;
        currentIndex = index;
        const cardStyle = getComputedStyle(cards[0]);
        const cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginRight);
        let translateX = cardWidth * visibleCardsCount * index;
        const maxTranslateX = cardWidth * cardCount - cardWidth * visibleCardsCount;
        if(translateX > maxTranslateX) translateX = maxTranslateX;
        if(translateX < 0) translateX = 0;
        track.style.transform = `translateX(-${translateX}px)`;
        for(let i = 0; i < dots.length; i++) {
          dots[i].classList.toggle('active', i === index);
          dots[i].setAttribute('tabindex', i === index ? "0" : "-1");
          dots[i].setAttribute('aria-selected', i === index ? "true" : "false");
        }
      }
      Array.from(dots).forEach(dot => {
        dot.addEventListener('click', () => {
          updateCarousel(parseInt(dot.dataset.index));
        });
      });
      dotsContainer.addEventListener('keydown', e => {
        if(e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          let next = currentIndex + 1;
          if(next >= pageCount) next = 0;
          updateCarousel(next);
          dots[next].focus();
        }
        if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          let prev = currentIndex - 1;
          if(prev < 0) prev = pageCount - 1;
          updateCarousel(prev);
          dots[prev].focus();
        }
      });
      updateCarousel(0);
      window.addEventListener('resize', () => {
        updateCarousel(currentIndex);
      });
    })();