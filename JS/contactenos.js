let currentStep = 1;
const totalCards = 5;

function nextCard() {
  if (currentStep >= totalCards) return;

  const currentCard = document.getElementById(`card-${currentStep}`);
  const nextCard = document.getElementById(`card-${currentStep + 1}`);
  const nextCard2 = document.getElementById(`card-${currentStep + 2}`);
  const previousCard = document.getElementById(`card-${currentStep - 1}`);
  const dots = document.querySelectorAll('.dot');

  currentStep++;

  dots.forEach(dot => dot.classList.remove('active-dot'));

  if (currentCard) {
    currentCard.classList.remove('principal');
    currentCard.classList.add('anterior');
  }

  if (nextCard) {
    const nextCardDots = nextCard.querySelectorAll('.dot');
    if (nextCardDots.length > currentStep - 1) {
      nextCardDots[currentStep - 1].classList.add('active-dot');
    }
    nextCard.classList.remove('siguiente');
    nextCard.classList.add('principal');
  }

  if (nextCard2) {
    nextCard2.classList.remove('siguiente2');
    nextCard2.classList.add('siguiente');
  }

  if (previousCard) {
    previousCard.classList.remove('anterior');
    previousCard.classList.add('anterior2');
    document.getElementById('div-transparent-next')?.classList.add('ocultar');
  }

  document.getElementById('div-transparent-previous')?.classList.remove('ocultar');
}

function previousCard() {
  if (currentStep <= 1) return;

  const currentCard = document.getElementById(`card-${currentStep}`);
  const nextCard = document.getElementById(`card-${currentStep + 1}`);
  const previousCard = document.getElementById(`card-${currentStep - 1}`);
  const previousCard2 = document.getElementById(`card-${currentStep - 2}`);
  const dots = document.querySelectorAll('.dot');

  currentStep--;

  dots.forEach(dot => dot.classList.remove('active-dot'));

  if (currentCard) {
    currentCard.classList.remove('principal');
    currentCard.classList.add('siguiente');
  }

  if (previousCard) {
    const previousCardDots = previousCard.querySelectorAll('.dot');
    if (previousCardDots.length > currentStep - 1) {
      previousCardDots[currentStep - 1].classList.add('active-dot');
    }
    previousCard.classList.remove('anterior');
    previousCard.classList.add('principal');
  }

  if (previousCard2) {
    previousCard2.classList.remove('anterior2');
    previousCard2.classList.add('anterior');
  }

  if (nextCard) {
    nextCard.classList.remove('siguiente');
    nextCard.classList.add('siguiente2');
    document.getElementById('div-transparent-previous')?.classList.add('ocultar');
  }

  document.getElementById('div-transparent-next')?.classList.remove('ocultar');
}

// 👆 Control táctil para móvil
let touchStartX = 0;

function onTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX;
}

function onTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchStartX - touchEndX;
  const nextCardElement = document.getElementById(`card-${currentStep + 1}`);
  const previousCardElement = document.getElementById(`card-${currentStep - 1}`);

  if (deltaX > 50 && nextCardElement) {
    nextCard();
  } else if (deltaX < -50 && previousCardElement) {
    previousCard();
  }
}