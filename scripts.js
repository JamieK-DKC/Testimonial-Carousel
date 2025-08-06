parent.document.getElementsByTagName("iframe")[0].scrolling = "no";

document.addEventListener('DOMContentLoaded', function() {
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.nav.prev');
  const nextBtn = document.querySelector('.nav.next');
  let current = 0;
  let startX = 0;
  let isDragging = false;

  const updatePosition = () => {
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
  };
  updatePosition();

  setInterval(() => {
    current = (current + 1) % slides.length;
    updatePosition();
  }, 10000);

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    updatePosition();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    updatePosition();
  });

  slidesContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  slidesContainer.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    slidesContainer.style.transform = `translateX(${-current * 100 + diff / window.innerWidth * 100}%)`;
  });

  slidesContainer.addEventListener('touchend', e => {
    isDragging = false;
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) current = (current - 1 + slides.length) % slides.length;
    else if (diff < -50) current = (current + 1) % slides.length;
    updatePosition();
  });
});
