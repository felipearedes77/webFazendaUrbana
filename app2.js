// Mapeamento de produtos para imagens 
const productImages = {
    "Alface": "alface.png",
    "Batata": "bhbatata.png",
    "Cenoura": "cenoura-alanna.png",
    "Rucula":"rucula.png"
};

// Array para armazenar o carrinho de compras (pode ser migrado para localStorage para persistência)
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para buscar produtos da API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:1777/produtos');
        const produtos = await response.json();
        console.log(produtos); 
       
        const primeirosProdutos = produtos.slice(2, 6);
        renderProducts(primeirosProdutos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    // Verifica se o produto já está no carrinho
    const existingProduct = carrinho.find(item => item.descricao === produto.descricao);
    if (existingProduct) {
        // Se já existe, apenas aumenta a quantidade
        existingProduct.quantidade += 1;
    } else {
        // Se não existe, adiciona o produto com quantidade 1
        produto.quantidade = 1; // Inicializa a quantidade
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log(`Produto ${produto.descricao} adicionado ao carrinho!`);
}

// Função para atualizar o contador do carrinho no header
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) { // Verifica se o elemento existe
        const totalItems = carrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0); // Adiciona a verificação
        cartCountElement.innerText = totalItems; 
    } else {
        console.error("Elemento cartCount não encontrado no DOM");
    }
}


// Evento de clique para adicionar ao carrinho
function addToCart(produto) {
    let existingProduct = carrinho.find(item => item.descricao === produto.descricao);
    if (existingProduct) {
        existingProduct.quantidade += 1; // Incrementa a quantidade se já existir
    } else {
        produto.quantidade = 1; // Define a quantidade inicial como 1
        carrinho.push(produto);
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    updateCartCount(); // Atualiza o contador
    console.log(`Produto ${produto.descricao} adicionado ao carrinho!`);
}

// Função para renderizar produtos na página
function renderProducts(produtos) {
    const container = document.getElementById('product-cards'); // Acesse pelo ID correto
    container.innerHTML = ''; // Limpa o container antes de adicionar os produtos

    produtos.forEach(produto => {
        if (produto.qtd_estoque === 0) {
            return; 
        }
        // Imagem padrão
        const imagem = productImages[produto.descricao] || "link_da_imagem_predefinida";

        // Criando o card e seus elementos internos
        const card = document.createElement('div');
        card.className = 'card';

        const imgBx = document.createElement('div');
        imgBx.className = 'imgBx';
        const img = document.createElement('img');
        img.src = imagem;
        img.alt = produto.descricao;
        imgBx.appendChild(img);

        const contentBx = document.createElement('div');
        contentBx.className = 'contentBx';

        const title = document.createElement('h3');
        title.textContent = produto.descricao;

        const price = document.createElement('h2');
        price.className = 'price';
        price.textContent = `R$ ${produto.preco.toFixed(2)}`;

    
        const stockQuantity = document.createElement('h2');
        stockQuantity.className = 'stock';
        stockQuantity.textContent = `Estoque: ${produto.qtd_estoque}`;

        const buyButton = document.createElement('a');
        buyButton.href = '#';
        buyButton.className = 'buy';
        buyButton.textContent = 'Adicionar ao Carrinho';

        // Adicionando evento de clique ao botão de compra
        buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(produto);
        });

        // Montando o card
        contentBx.appendChild(title);
        contentBx.appendChild(price);
        contentBx.appendChild(stockQuantity); // Adiciona o novo h2 com a quantidade de estoque
        contentBx.appendChild(buyButton);
        card.appendChild(imgBx);
        card.appendChild(contentBx);

        // Adicionando o card ao container
        container.appendChild(card);
    });
}



// Chama updateCartCount() ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    fetchProducts();
});
