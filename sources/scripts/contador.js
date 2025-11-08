//sources/scripts/contador.js
const misaDate = new Date("2025-07-19T08:00:00").getTime();
const fiestaDate = new Date("2025-07-19T15:00:00").getTime();
const wrapper = document.querySelector(".countdown-wrapper");

function pad(num) {
  return num.toString().padStart(2, '0');
}

function renderMainCountdown(tituloEvento) {
  wrapper.innerHTML = `
    <div class="countdown-block main-countdown">
      <h3 class="second-head-title" style="color: white">${tituloEvento}</h3>
      <div class="countdown-title">Faltan:</div>
      <div class="countdown-items">
        <div class="countdown-item"><div class="countdown-value" id="main-days">00</div><div class="countdown-label">Días</div></div>
        <div class="countdown-item"><div class="countdown-value" id="main-hours">00</div><div class="countdown-label">Horas</div></div>
        <div class="countdown-item"><div class="countdown-value" id="main-minutes">00</div><div class="countdown-label">Minutos</div></div>
        <div class="countdown-item"><div class="countdown-value" id="main-seconds">00</div><div class="countdown-label">Segundos</div></div>
      </div>
    </div>
  `;
}

function renderFiestaCountdown() {
  // Agrega el bloque para la fiesta debajo de la misa
  wrapper.innerHTML += `
    <h3 class="second-head-title" style="color: white; margin-top: 30px;">La fiesta es en:</h3>
    <div class="countdown-block fiesta-countdown">
      <div class="countdown-items">
        <div class="countdown-item"><div class="countdown-value" id="fiesta-hours">00</div><div class="countdown-label">Horas</div></div>
        <div class="countdown-item"><div class="countdown-value" id="fiesta-minutes">00</div><div class="countdown-label">Minutos</div></div>
        <div class="countdown-item"><div class="countdown-value" id="fiesta-seconds">00</div><div class="countdown-label">Segundos</div></div>
      </div>
    </div>
  `;
}

let currentPhase = "";

function updateCountdown() {
  const now = new Date().getTime();

  if (now < misaDate) {
    if (currentPhase !== "misa") {
      renderMainCountdown("Para la Ceremonia");
      currentPhase = "misa";
    }
    updateTimer(misaDate - now, "main");
  } else if (now >= misaDate && now < fiestaDate) {
    if (currentPhase !== "durante-misa") {
      wrapper.innerHTML = `
        <h3 class="second-head-title" style="color: white;">La misa es: ¡Ahora mismo!</h3>
      `;
      renderFiestaCountdown();
      currentPhase = "durante-misa";
    }
    updateTimer(fiestaDate - now, "fiesta");
  } else if (now >= fiestaDate) {
    if (currentPhase !== "fiesta") {
      renderMainCountdown("Fiesta - 15:00 hrs.");
      currentPhase = "fiesta";
    }
    updateTimer(fiestaDate - now, "main");
  }
}

// Ahora la función updateTimer maneja dos contadores según el prefijo id
function updateTimer(distance, prefix) {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (prefix === "main") {
    const d = document.getElementById("main-days");
    const h = document.getElementById("main-hours");
    const m = document.getElementById("main-minutes");
    const s = document.getElementById("main-seconds");

    if (d && h && m && s) {
      d.textContent = pad(days);
      h.textContent = pad(hours);
      m.textContent = pad(minutes);
      s.textContent = pad(seconds);
    }
  } else if (prefix === "fiesta") {
    const h = document.getElementById("fiesta-hours");
    const m = document.getElementById("fiesta-minutes");
    const s = document.getElementById("fiesta-seconds");

    if (h && m && s) {
      // Fiesta no muestra días, solo horas, minutos y segundos
      const totalHours = days * 24 + hours;
      h.textContent = pad(totalHours);
      m.textContent = pad(minutes);
      s.textContent = pad(seconds);
    }
  }
}

// Inicia el contador
updateCountdown();
setInterval(updateCountdown, 1000);
