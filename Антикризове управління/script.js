// script.js
let currentSlide = 1;
const totalSlides = 12;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = 0;
        slide.style.transform = 'translateY(20px)';
    });
    const targetSlide = document.getElementById('slide' + n);
    targetSlide.classList.add('active');
    setTimeout(() => {
        targetSlide.style.opacity = 1;
        targetSlide.style.transform = 'translateY(0)';
    }, 10);
    currentSlide = n;
    updateButtons();
}

function updateButtons() {
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Додати навігацію клавішами
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Початкова ініціалізація
showSlide(currentSlide);