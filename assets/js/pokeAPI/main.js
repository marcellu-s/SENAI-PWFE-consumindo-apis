const pokemonWrapper = document.querySelector('.pokemon-wrapper');

const limit = 8;
let offset = 0;

function createHTMLTemplate(pokemon) {

    const div = document.createElement('div');

    div.classList.add('pokemon-card', `${pokemon.primaryType}`);

    div.innerHTML = 
    `<div class="pokemon-sprite">
            <img src="${pokemon.sprite}" alt="${pokemon.name}">
            <span class="pokemon-id">#${pokemon.id}</span>
    </div>
    <div class="pokemon-details">
        <div class="pokemon-name">
            <span>${pokemon.name}</span>
        </div>
        <div class="pokemon-type">
            ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join(' ')}
        </div>
    </div>`;

    return div;
}

async function generatePokemon() {

    await pokeAPI.getPokemon(offset, limit)
        .then(pokemons => {
            if (!Array.isArray(pokemons)) {
                // Não é um array
                window.alert('ERRO no retorno da pokeAPI');
            } else {
                // Sim, é um array
                pokemonWrapper.innerHTML = '';
                pokemons.forEach(pokemon => pokemonWrapper.appendChild(createHTMLTemplate(pokemon)));
            }
        });

    modal();
}

document.querySelector('.poke-api-area #next').addEventListener('click', () => {

    offset += limit;

    generatePokemon(offset);
});


document.querySelector('.poke-api-area #back').addEventListener('click', () => {

    offset -= limit;

    if (offset < 0) {

        offset = 0;
    }

    generatePokemon(offset);
});

generatePokemon();
