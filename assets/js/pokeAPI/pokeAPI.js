function createPokemon(pokemonDetail) {

    let id = pokemonDetail.id;
    let name = pokemonDetail.name;
    let types = pokemonDetail.types.map((slot) => slot.type.name);
    let [ primaryType ] = types;
    let sprite = pokemonDetail.sprites.versions['generation-v']['black-white'].animated.front_default;
    
    const pokemon = new Pokemon(id, name, types, primaryType, sprite);
    return pokemon;
}

const pokeAPI = {
    getDetails: (pokemon) => {

        return fetch(pokemon.url)

        .then((response) => response.json())

        .then(createPokemon);

    },
    getPokemon: (offset=0, limit=10) => {

        return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)

        .then((response) => response.json())

        .then((body) => body.results.map(pokeAPI.getDetails))

        .then((requests) => Promise.all(requests))

        .then((pokemons) => pokemons)

        .catch((error) => console.log(error));
    }
}