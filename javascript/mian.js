// === REFERENCIAS ===
const quitarModal = document.getElementById('eventofinalizar');
const pantalla = document.getElementById("pantalla");
const buscadorInput = document.getElementById('buscador'); // El botón
const valorBuscador = document.getElementById('input-buscador'); // El input
const contenedorPrincipal = document.getElementById('contenedor-principal');
const btnA = document.querySelector('.a-button');
const btnB = document.querySelector('.b-button');



// === DIGIMON CARRUSEL ===
async function cargarDigimons() {
    try {
        const res = await fetch("https://digi-api.com/api/v1/digimon");
        if (!res.ok) throw new Error('Error API Digimon');
        const data = await res.json();
        
        data.content.forEach(digimon => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="imagenContenedor">
                    <img src="${digimon.image}" alt="${digimon.name}">
                </div>
                <div class="textoContenedor">${digimon.name}</div>
            `;
            pantalla.appendChild(card);
        });
    } catch (error) {
        console.error('Error cargando Digimons:', error.message);
    }
}
cargarDigimons();

// === CARRUSEL BOTONES ===
btnA?.addEventListener('click', () => {
    pantalla.scrollLeft += pantalla.offsetWidth;
});
btnB?.addEventListener('click', () => {
    pantalla.scrollLeft -= pantalla.offsetWidth;
});
