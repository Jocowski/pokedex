// Elementos principais
const inputQuantidade = document.getElementById("quantidade");
const divCarregando = document.getElementById("carregando");
const listaPokemons = document.querySelector(".lista-pokemons");

// Função para mostrar ou esconder o carregando
function mostrarCarregando(mostrar) {
    divCarregando.style.display = mostrar ? "block" : "none";
}

// Função para criar o cartão de Pokémon
function criarCartaoPokemon(pokemon) {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao-pokemon");

    const imagem = document.createElement("img");
    imagem.src = pokemon.sprites.front_default;
    imagem.alt = pokemon.name;

    const nome = document.createElement("p");
    nome.textContent = pokemon.name;

    cartao.appendChild(imagem);
    cartao.appendChild(nome);

    return cartao;
}

// Função para buscar pokémons
function buscarPokemons(quantidade) {
    // Mostra a mensagem de carregando
    mostrarCarregando(true);
    listaPokemons.innerHTML = ""; // Limpa a lista existente

    // Busca a lista de pokémons
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const promessas = dados.results.map(pokemon =>
                fetch(pokemon.url).then(res => res.json())
            );

            // Quando todos os pokémons forem carregados
            Promise.all(promessas).then(pokemons => {
                listaPokemons.textContent = ""; // Limpa a lista (caso algo tenha mudado)

                // Adiciona cada Pokémon à lista
                pokemons.forEach(pokemon => {
                    const cartao = criarCartaoPokemon(pokemon);
                    listaPokemons.appendChild(cartao);
                });

                mostrarCarregando(false);
            });
        })
        .catch(() => {
            listaPokemons.textContent = "Erro ao carregar pokémons. Tente novamente.";
            mostrarCarregando(false);
        });
}

// Evento ao digitar no campo de quantidade
inputQuantidade.addEventListener("input", () => {
    const quantidade = parseInt(inputQuantidade.value, 10);
    if (quantidade > 0) {
        buscarPokemons(quantidade);
    }
});

// Busca inicial de 3 pokémons
buscarPokemons(3);
