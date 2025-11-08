document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.carousel');
    const firstLogosBlock = document.querySelector('.logos'); // Seleccionamos el primer bloque de logos
    let isDown = false;
    let startX;
    let scrollLeft;

    // --- FUNCIÓN PARA CALCULAR Y ESTABLECER EL ANCHO TOTAL DE UN BLOQUE .logos DINÁMICAMENTE ---
    // Esto es crucial para la fluidez perfecta y evitar los saltos.
    const updateCarouselWidth = () => {
        // Obtenemos el ancho real del primer bloque de .logos, incluyendo sus elementos hijos y gaps.
        // Asegúrate de que las imágenes estén renderizadas para obtener el ancho correcto.
        const logosBlockWidth = firstLogosBlock.offsetWidth;
        // Establecemos este ancho como una variable CSS personalizada en el elemento raíz del documento.
        document.documentElement.style.setProperty('--logos-total-block-width', `${logosBlockWidth}px`);
        console.log("Ancho calculado del bloque .logos:", logosBlockWidth + "px"); // Para depuración en consola
    };

    // Llamamos la función al cargar la página para establecer el ancho inicial
    updateCarouselWidth();
    // También la llamamos cuando la ventana se redimensiona, por si el ancho del carrusel cambia.
    window.addEventListener('resize', updateCarouselWidth);

    // --- Funcionalidad de arrastrar (scrolleable) ---
    carouselContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselContainer.classList.add('dragging');
        startX = e.pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        // Pausar la animación al iniciar el arrastre
        carousel.querySelector('.logos').style.animationPlayState = 'paused';
        carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'paused';
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isDown = false;
        carouselContainer.classList.remove('dragging');
        // Reanudar la animación si el ratón sale y no estamos arrastrando activamente
        carousel.querySelector('.logos').style.animationPlayState = 'running';
        carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'running';
    });

    carouselContainer.addEventListener('mouseup', () => {
        isDown = false;
        carouselContainer.classList.remove('dragging');
        // Reanudar la animación al soltar el clic
        carousel.querySelector('.logos').style.animationPlayState = 'running';
        carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'running';
    });

    carouselContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselContainer.offsetLeft;
        const walk = (x - startX) * 2;
        carouselContainer.scrollLeft = scrollLeft - walk;
    });

    // --- Funcionalidad táctil para móviles ---
    carouselContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        carouselContainer.classList.add('dragging');
        startX = e.touches[0].pageX - carouselContainer.offsetLeft;
        scrollLeft = carouselContainer.scrollLeft;
        // Pausar la animación al iniciar el toque
        carousel.querySelector('.logos').style.animationPlayState = 'paused';
        carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'paused';
    });

    carouselContainer.addEventListener('touchend', () => {
        isDown = false;
        carouselContainer.classList.remove('dragging');
        // Reanudar la animación al soltar el toque
        carousel.querySelector('.logos').style.animationPlayState = 'running';
        carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'running';
    });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - carouselContainer.offsetLeft;
        const walk = (x - startX) * 2;
        carouselContainer.scrollLeft = scrollLeft - walk;
    });


    // --- Asegurar el efecto infinito con scroll manual ---
    carouselContainer.addEventListener('scroll', () => {
        const currentScrollLeft = carouselContainer.scrollLeft;
        const maxScrollLeft = carouselContainer.scrollWidth - carouselContainer.clientWidth;
        const firstLogosWidth = firstLogosBlock.offsetWidth;

        if (currentScrollLeft <= 1) { // Pequeño margen para evitar redondeos (<= 1px)
            // Si el usuario scrollea hasta el principio, salta al final del primer grupo de logos.
            carouselContainer.scrollLeft = firstLogosWidth;
        } else if (currentScrollLeft >= maxScrollLeft - 1) { // Pequeño margen para el final (>= max - 1px)
            // Si el usuario scrollea hasta el final, salta al principio del primer grupo de logos (0).
            carouselContainer.scrollLeft = 0;
        }
    });

    // Iniciar la animación al cargar la página (por si acaso el CSS no lo hace inmediatamente)
    // Aseguramos que la animación esté corriendo si no hay interacción.
    carousel.querySelector('.logos').style.animationPlayState = 'running';
    carousel.querySelector('.logos[aria-hidden="true"]').style.animationPlayState = 'running';
});