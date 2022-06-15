let quantidade = document.getElementById("quantidade");
quantidade.addEventListener("keyup", function(){
    pegaPokemons(quantidade.value);
});

pegaPokemons(3);

function pegaPokemons(quantidade) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantidade)
    .then(response => response.json())
    .then(allpokemon => {
        let pokemons = [];

        allpokemon.results.map(function(pokemon) {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokemonInfo => {
                    pokemons.push({nome:pokemon.name, imagem:pokemonInfo.sprites.front_default});
                    
                    if (pokemons.length == quantidade) {
                        let pokemonBox = document.querySelector(".pokemons");
                        pokemonBox.innerHTML = "";

                        pokemons.map(function(pokemon) {    
                            pokemonBox.innerHTML += `
                                <div class="pokemons__pokemon">
                                    <img src="${pokemon.imagem}">
                                    <p>${pokemon.nome}</p>
                                </div>
                            `;
                        });
                    }
            });
        });
    });

}
