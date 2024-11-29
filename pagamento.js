document.addEventListener('DOMContentLoaded', function() {
    const pagarAgoraButton = document.getElementById("pagarAgora");

    if (!pagarAgoraButton) {
        console.error("Elemento pagarAgora não encontrado no DOM");
        return;
    }

    pagarAgoraButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        // Verifique se há produtos no carrinho
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        if (carrinho.length === 0) {
            console.log("Carrinho vazio.");
            return;
        }

        // Processar cada produto do carrinho
        const promises = carrinho.map(produto => {
            console.log(`Processando produto: ${produto.descricao}, ID: ${produto.id}, Quantidade no Carrinho: ${produto.quantidade}`);
            
            // Atualizar o estoque usando PATCH
            return fetch(`http://localhost:1777/produtos/${produto.id}`)
                .then(response => {
                    if (!response.ok) {
                        console.error(`Erro ao buscar estoque do produto ${produto.descricao}: ${response.statusText}`);
                        return Promise.reject(new Error(`Erro ao buscar estoque do produto ${produto.descricao}`));
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data || typeof data.qtd_estoque === 'undefined') {
                        console.error(`Dados de estoque ausentes para o produto ${produto.descricao}`);
                        return;
                    }

                    const estoqueAtual = data.qtd_estoque;
                    const novoEstoque = estoqueAtual - produto.quantidade;

                    // Verifique se o estoque é suficiente
                    if (novoEstoque < 0) {
                        console.error(`Estoque insuficiente para ${produto.descricao}. Estoque atual: ${estoqueAtual}, Quantidade a ser subtraída: ${produto.quantidade}`);
                        return; // Pula a atualização deste produto
                    }

                    console.log(`Estoque atualizado para ${produto.descricao} será: ${novoEstoque}`);

                    // Atualizar o estoque
                    return fetch(`http://localhost:1777/produtos/${produto.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            qtd_estoque: novoEstoque
                        })
                    });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro ao atualizar o estoque do produto ${produto.descricao}: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(`Estoque atualizado com sucesso para ${produto.descricao}`, data);
                })
                .catch(error => console.error("Erro ao processar atualização de estoque:", error));
        });

        // Aguarda todas as promessas serem resolvidas
        Promise.all(promises)
            .then(() => {
                // Limpar o carrinho e redirecionar após pagamento
                localStorage.removeItem('carrinho');
                alert("Pagamento realizado com sucesso!");
                window.location.href = "obrigado.html";
            })
            .catch(error => console.error("Erro ao processar o pagamento:", error));
    });
});
