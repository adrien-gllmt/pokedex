const pokeApi = 'https://pokeapi.co/api/v2/';
const MAX_ATTEMPTS = 3;
export async function fetchPokemons(limit, offset) {
    try {
        const response = await fetch(`${pokeApi}pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}

export async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const pokemonData = await response.json();
        return {
            name: pokemonData.name,
            id: pokemonData.id,
            types: pokemonData.types.map((type) => type.type.name),
            abilities: pokemonData.abilities.map((ability) => ability.ability.name),
            image: pokemonData.sprites.front_default,
        };
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        throw error;
    }
}

export async function searchPokemons(searchTerm){
    try {
        const response = await fetch(`${pokeApi}pokemon/?limit=1000`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.results.filter((pokemon) => pokemon.name.includes(searchTerm.toLowerCase()));
    } catch (error) {
        console.error('Error searching Pokémon:', error);
        throw error;
    }
}

export async function fetchTeamPokemonList(pageUrl){
    try {
        const limit = 30;
        const url = pageUrl || `${pokeApi}pokemon?limit=${limit}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
            let pokemonData = null;

            for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
                try {
                    const response = await fetch(pokemon.url);
                    pokemonData = await response.json();
                    break;
                } catch (error) {
                    console.error('Error loading a Pokémon:', error);
                }
            }

            return pokemonData
                ? {
                    id: pokemonData.id,
                    name: pokemonData.name,
                    thumbnail: pokemonData.sprites.front_default,
                }
                : null;
        });

        const allPokemon = await Promise.all(promises);
        const filteredPokemon = allPokemon.filter((pokemon) => pokemon !== null);

        return {
            nextPageUrl: data.next,
            pokemonList: filteredPokemon,
        };
    } catch (error) {
        console.error('Error loading all Pokémon from the API:', error);
        throw error;
    }
}
