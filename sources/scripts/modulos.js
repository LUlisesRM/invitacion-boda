//sources/scripts/modulos.js
const modules = document.querySelectorAll('.module');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, {
  threshold: 0.2
});

modules.forEach(module => {
  observer.observe(module);
});

// Animación para el header, después del modal
window.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const introModal = document.getElementById('intro-modal');

  // Solo si ambos existen
  if (header && introModal) {
    // Agrega clase inicial oculta
    header.classList.add('header-hidden');

    const observerModal = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (
          mutation.attributeName === "style" &&
          introModal.style.display === "none"
        ) {
          setTimeout(() => {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
          }, 100); // 1 segundo después de desaparecer el modal

          observerModal.disconnect(); // detener la observación
        }
      });
    });

    observerModal.observe(introModal, { attributes: true });
  }
});
