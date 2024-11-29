const productImages = {
    "Banana": "bananaa.png",
    "Laranja": "laranjaa.png",
    "Alface": "alface.png",
    "Batata": "bhbatata.png",
    "Cenoura": "cenoura-alanna.png",
    "Rucula":"rucula.png"
};

// Array para armazenar os produtos do carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para renderizar produtos no carrinho
function renderCartProducts() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Limpa o container antes de adicionar os produtos

    let total = 0;

    carrinho.forEach(produto => {
        const quantidade = produto.quantidade || 1; 
        const preco = produto.preco || 0; 
        const totalProduto = preco * quantidade;
        total += totalProduto;

        const row = `
            <tr>
                <td>
                    <div class="product">
                        <img src="${productImages[produto.descricao]}" alt="${produto.descricao}">
                        <div class="info">
                            <div class="title">${produto.descricao}</div>
                            <div class="descricao">Fazenda</div>
                        </div>
                    </div>
                </td>
                <td>R$ ${preco.toFixed(2)}</td>
                <td>
                    <div class="qtd">
                        <button onclick="updateQuantity('${produto.descricao}', -1)">-</button>
                        <span id="qty-${produto.descricao}">${quantidade}</span>
                        <button onclick="updateQuantity('${produto.descricao}', 1)">+</button>
                    </div>
                </td>
                <td>R$ ${totalProduto.toFixed(2)}</td>
                <td>
                    <button class="remove" onclick="removeFromCart('${produto.descricao}')">x</button>
                </td>
            </tr>
        `;
        
        cartItemsContainer.innerHTML += row;
    });

    // Atualiza os totais
    const subTotalElement = document.getElementById('subTotal');
    const totalElement = document.getElementById('total');

    if (subTotalElement && totalElement) {
        subTotalElement.textContent = `R$ ${total.toFixed(2)}`;
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    } else {
        console.error('Elementos subTotal ou total não encontrados');
    }
}

// Função para remover produtos do carrinho
function removeFromCart(descricao) {
    carrinho = carrinho.filter(cartItem => cartItem.descricao !== descricao);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCartProducts(); // Atualiza a lista após remoção
}


// Função para atualizar a quantidade de produtos no carrinho
function updateQuantity(descricao, change) {
    const qtyElement = document.getElementById(`qty-${descricao}`);
    let quantidade = parseInt(qtyElement.textContent);

    // Atualiza a quantidade
    quantidade += change;

    // Garantir que a quantidade mínima seja 1
    if (quantidade < 1) {
        quantidade = 1;
    }

    // Atualiza o texto do elemento
    qtyElement.textContent = quantidade;

    // Atualiza o produto no carrinho
    const product = carrinho.find(item => item.descricao === descricao);
    if (product) {
        product.quantidade = quantidade; // Atualiza a quantidade no objeto
    }

    // Salva a quantidade atualizada no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o total
    updateTotal(); // Chama a função para atualizar o total
}


// Função para atualizar o total da compra
function updateTotal() {
    let total = 0;

    // Calcula o total com base nos produtos do carrinho
    carrinho.forEach(produto => {
        total += produto.preco * produto.quantidade; // Calcula o total
    });

    // Atualiza os totais na tela
    const subTotalElement = document.getElementById('subTotal');
    const totalElement = document.getElementById('total');

    if (subTotalElement && totalElement) {
        subTotalElement.textContent = `R$ ${total.toFixed(2)}`; // Subtotal
        totalElement.textContent = `R$ ${total.toFixed(2)}`; // Total (sem frete)
    } else {
        console.error('Elementos subTotal ou total não encontrados');
    }
}

// Função para remover produtos do carrinho
function removeFromCart(descricao) {
    carrinho = carrinho.filter(cartItem => cartItem.descricao !== descricao);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderCartProducts(); // Atualiza a lista após remoção
}
document.addEventListener('DOMContentLoaded', function() {
    // Chamando a função para renderizar produtos do carrinho ao carregar a página
    renderCartProducts();
    // Adiciona o evento de clique ao botão "Finalizar Compra"
    const finalizarCompraBtn = document.getElementById("finalizarCompra");
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", function() {
            window.location.href = 'pagamentos.html';
        });
    }
});


