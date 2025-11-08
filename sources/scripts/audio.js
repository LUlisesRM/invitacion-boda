window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const muteBtn = document.getElementById('mute-toggle');
  const seal = document.getElementById('seal');

  window.reproducirMusica = function () {
    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Reproducción automática activada por usuario.");
          muteBtn.style.display = 'block';
          actualizarIconoMute();
        })
        .catch((error) => {
          console.warn("Error al reproducir audio:", error);
        });
    }
  };

  muteBtn.addEventListener('click', () => {
    music.muted = !music.muted;
    actualizarIconoMute();
  });

  function actualizarIconoMute() {
    muteBtn.classList.toggle('muted', music.muted);
    muteBtn.classList.toggle('unmuted', !music.muted);
  }

  // Pausar y reanudar música cuando el usuario cambia de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      music.pause();
      console.log("Música pausada (usuario cambió de pestaña).");
    } else {
      music.play().catch((error) => {
        console.warn("No se pudo reanudar la música:", error);
      });
    }
  });

  // Agregar efecto "pop" al hacer clic en el sello
  if (seal) {
    seal.addEventListener('click', () => {
      seal.classList.add('clicked');
      setTimeout(() => {
        seal.classList.remove('clicked');
      }, 300); // duración igual a la transición CSS
    });
  }
});
