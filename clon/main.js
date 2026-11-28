
// ========================================
// NEXOLIVE - BÚSQUEDA Y FILTROS
// Funciona en Inicio y Listado de eventos
// ========================================

// Obtener los elementos de la página
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#event-search");
const categoryButtons = document.querySelectorAll(".category-item");
const eventCards = document.querySelectorAll(".event-card");
const eventGrid = document.querySelector(".event-grid");

// Categoría seleccionada inicialmente
let selectedCategory = "Todas";

// Crear mensaje para cuando no haya resultados
let noResultsMessage = null;

if (eventGrid) {
    noResultsMessage = document.createElement("p");
    noResultsMessage.classList.add("no-results");
    noResultsMessage.textContent = "No se encontraron eventos. Intenta con otra búsqueda.";
    noResultsMessage.style.display = "none";

    eventGrid.appendChild(noResultsMessage);
}

// ========================================
// FUNCIÓN PARA FILTRAR LOS EVENTOS
// ========================================

function filterEvents() {
    if (!searchInput) return;

    const searchText = searchInput.value.trim().toLowerCase();

    let visibleEvents = 0;

    eventCards.forEach((card) => {
        const eventText = card.textContent.toLowerCase();

        const matchesSearch = eventText.includes(searchText);

        const matchesCategory =
            selectedCategory === "Todas" ||
            eventText.includes(selectedCategory.toLowerCase());

        const shouldShow = matchesSearch && matchesCategory;

        card.style.display = shouldShow ? "" : "none";

        if (shouldShow) {
            visibleEvents++;
        }
    });

    // Mostrar mensaje si no hay coincidencias
    if (noResultsMessage) {
        noResultsMessage.style.display =
            visibleEvents === 0 ? "block" : "none";
    }
}

// ========================================
// EVENTO DEL FORMULARIO DE BÚSQUEDA
// ========================================

if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        filterEvents();
    });
}

// Buscar automáticamente mientras se escribe
if (searchInput) {
    searchInput.addEventListener("input", filterEvents);
}

// ========================================
// EVENTOS DE LOS BOTONES DE CATEGORÍA
// ========================================

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        // Actualizar la categoría visualmente seleccionada
        categoryButtons.forEach((categoryButton) => {
            categoryButton.classList.remove("active");
        });

        button.classList.add("active");

        // Aplicar los filtros
        filterEvents();
    });
});
