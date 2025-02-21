// Liste des images à afficher
const images = [
    "https://source.unsplash.com/250x150/?solar-panel",
    "https://source.unsplash.com/250x150/?wind-turbine",
    "https://source.unsplash.com/250x150/?hydro-energy",
    "https://source.unsplash.com/250x150/?renewable-energy",
    "https://source.unsplash.com/250x150/?green-energy",
    "https://source.unsplash.com/250x150/?solar-energy"
];

// Récupérer le conteneur d'images
const imageContainer = document.getElementById("image-container");
// Ajouter les images dynamiquement
images.forEach((url) => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Image d'énergie renouvelable"
    imageContainer.appendChild(img);
});
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    });

    window.addEventListener('resize', updateSlider);
});
