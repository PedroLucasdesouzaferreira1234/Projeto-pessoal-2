
document.addEventListener('DOMContentLoaded', function() {
    carregarCartasHomepage();
    inicializarFiltros();
});

function carregarCartasHomepage() {
    const container = document.getElementById('cards-container');
    
    if (!container) return;
    
    container.innerHTML = dados.map(carta => `
        <div class="card-item" data-category="${carta.categoria}">
            <a href="detalhes.html?id=${carta.id}" class="card-link">
                <div class="card-image">
                    <img src="${carta.imagem}" alt="${carta.titulo}" loading="lazy">
                    <div class="card-category ${carta.categoria}">${getCategoriaNome(carta.categoria)}</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${carta.titulo}</h3>
                    <p class="card-description">${carta.descricao}</p>
                    <div class="card-footer">
                        <span class="card-rarity">${carta.detalhes.Raridade}</span>
                        <span class="card-value">${carta.detalhes['Valor Estimado']}</span>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

function getCategoriaNome(categoria) {
    const categorias = {
        'rara': 'Rara',
        'classica': 'Clássica',
        'promocional': 'Promocional',
        'autografada': 'Autografada'
    };
    return categorias[categoria] || categoria;
}

function inicializarFiltros() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cardItems = document.querySelectorAll('.card-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            cardItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.card-item')) {
            const card = e.target.closest('.card-item');
            card.style.transform = 'translateY(-10px)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.card-item')) {
            const card = e.target.closest('.card-item');
            card.style.transform = 'translateY(0)';
        }
    });
});