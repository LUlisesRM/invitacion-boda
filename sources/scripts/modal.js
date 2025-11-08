//sources/scripts/modal.js
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('intro-modal');
  const seal = document.getElementById('seal');

  document.body.classList.add('modal-open');

  // Detectar clic en toda la pantalla, incluyendo el sello
  modal.addEventListener('click', () => {
    animarSealYContinuar();
  });

  function animarSealYContinuar() {
    // Agregar clase de "pop" al sello
    if (seal) {
      seal.classList.add('clicked');
      setTimeout(() => {
        seal.classList.remove('clicked');
      }, 300);
    }

    // Ejecutar funciones de cierre
    cerrarModal();

    if (typeof window.reproducirMusica === 'function') {
      window.reproducirMusica();
    }
  }

  function cerrarModal() {
    window.scrollTo({ top: 0, behavior: 'auto' });

    modal.classList.add('fade-out');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }, 1000);
  }
});






