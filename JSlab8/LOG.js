document.getElementById('hamburger').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    var mainContent = document.getElementById('main-content');
    menu.classList.toggle('active');
    mainContent.classList.toggle('shifted');
});

// Карусель
let currentSlide = 0;
const slides = document.getElementById('slides');
const slideImages = slides.querySelectorAll('img');
const dots = document.querySelectorAll('.dot');
const totalSlides = slideImages.length;

function updateSlide() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
}

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.getAttribute('data-slide'));
        updateSlide();
    });
});

setInterval(nextSlide, 5000);

updateSlide();