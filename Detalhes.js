// Detalhes.js - Para a página de detalhes
document.addEventListener('DOMContentLoaded', function() {
    carregarDetalhesCarta();
});

function carregarDetalhesCarta() {
    const urlParams = new URLSearchParams(window.location.search);
    const cartaId = urlParams.get('id');
    const container = document.getElementById('card-details-container');
    
    if (!cartaId || !dados.find(c => c.id == cartaId)) {
        container.innerHTML = `
            <div class="error-state">
                <div class="error-icon">❌</div>
                <h2>Carta Não Encontrada</h2>
                <p>A carta que você está procurando não existe em nossa coleção.</p>
                <a href="index.html" class="btn-primary">Voltar para a Coleção</a>
            </div>
        `;
        return;
    }
    
    const carta = dados.find(c => c.id == cartaId);
    
    document.title = `${carta.titulo} - Galo Cards`;
    container.innerHTML = `
        <div class="card-detail-view">
            <div class="detail-image-section">
                <div class="card-image-large">
                    <img src="${carta.imagem}" alt="${carta.titulo}">
                    <div class="image-overlay">
                        <span class="card-category-large ${carta.categoria}">${getCategoriaNome(carta.categoria)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-content-section">
                <div class="card-header">
                    <h1>${carta.titulo}</h1>
                    <div class="card-meta">
                        <span class="card-rarity-large">${carta.detalhes.Raridade}</span>
                        <span class="card-value-large">${carta.detalhes['Valor Estimado']}</span>
                    </div>
                </div>
                
                <div class="card-description-full">
                    <h3>📖 Descrição Completa</h3>
                    <p>${carta.descricaoCompleta}</p>
                </div>
                
                <div class="card-stats">
                    <h3>📊 Detalhes Técnicos</h3>
                    <div class="stats-grid">
                        ${Object.entries(carta.detalhes).map(([chave, valor]) => `
                            <div class="stat-item">
                                <span class="stat-label">${chave}</span>
                                <span class="stat-value">${valor}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card-history">
                    <h3>📝 Minha História com Esta Carta</h3>
                    <div class="history-content">
                        <p>${carta.historia}</p>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn-interest" onclick="mostrarInteresse(${carta.id})">
                        🎯 Tenho Interesse nesta Carta
                    </button>
                    <a href="index.html" class="btn-secondary">← Voltar para Coleção</a>
                </div>
            </div>
        </div>
    `;
    
    carregarCartasRelacionadas(cartaId);
}

function carregarCartasRelacionadas(cartaAtualId) {
    const container = document.getElementById('related-cards-container');
    if (!container) return;
    
    const outrasCartas = dados.filter(carta => carta.id != cartaAtualId).slice(0, 3);
    
    if (outrasCartas.length === 0) {
        container.innerHTML = '<p class="no-related">Nenhuma carta relacionada no momento.</p>';
        return;
    }
    
    container.innerHTML = outrasCartas.map(carta => `
        <div class="card-item">
            <a href="detalhes.html?id=${carta.id}" class="card-link">
                <div class="card-image">
                    <img src="${carta.imagem}" alt="${carta.titulo}">
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

function mostrarInteresse(cartaId) {
    const carta = dados.find(c => c.id == cartaId);
    if (carta) {
        alert(`🎉 Obrigado pelo interesse na carta "${carta.titulo}"!\n\nEntre em contato através dos canais na página inicial para negociarmos!`);
    }
}