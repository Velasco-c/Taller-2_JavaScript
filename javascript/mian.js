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

// === BUSCADOR POR ID ===
async function buscarDigimon() {
    const id = valorBuscador.value.trim();
    if (!id) {
        alert('⚠️ Ingresa un ID para buscar');
        return;
    }

    try {
        const res = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
        if (!res.ok) throw new Error('Digimon no encontrado');
        const digimon = await res.json();

        const img = digimon.images?.[0]?.href || 'https://via.placeholder.com/150';
        const desc = digimon.descriptions?.[1]?.description || "Sin descripción";
        const tipo = digimon.types?.[0]?.type || "Unknown";
        const level = digimon.levels?.[0]?.level || "Unknown";

        contenedorPrincipal.innerHTML = `
            <button id="eventofinalizar" class="btn-close">✕</button>
            <div class="card modal-card">
                <div class="imagenContenedor">
                    <img src="${img}" alt="${digimon.name}">
                </div>
                <div class="textoContenedor"><strong>${digimon.name?.toUpperCase()}</strong></div>
                <div class="textoContenedor"><small>📝 ${desc}</small></div>
                <div class="textoContenedor">⚡ Tipo: ${tipo}</div>
                <div class="textoContenedor">📊 Level: ${level}</div>
            </div>
        `;
        contenedorPrincipal.style.opacity = "1";
        document.getElementById('eventofinalizar')?.addEventListener('click', () => {
            contenedorPrincipal.style.opacity = "0";
            contenedorPrincipal.innerHTML = '<button id="eventofinalizar">x</button>';
            setTimeout(() => {
                document.getElementById('eventofinalizar')?.addEventListener('click', arguments.callee);
            }, 100);
        });

    } catch (error) {
        console.error('Error búsqueda:', error.message);
        alert('❌ No se encontró el Digimon con ID: ' + id);
    }
}

// Eventos del buscador
buscadorInput?.addEventListener('click', buscarDigimon);
valorBuscador?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarDigimon();
});

// Inicializar botón de cerrar modal (para cuando está vacío)
quitarModal?.addEventListener('click', () => {
    contenedorPrincipal.style.opacity = "0";
});