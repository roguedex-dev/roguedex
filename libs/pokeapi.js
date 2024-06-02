class PokeApi {
	static async getTypeEffectiveness(type) {
	  try {
	    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
	    const data = await response.json();
	    return data.damage_relations;
	  } catch (error) {
	    console.error(`Error fetching type effectiveness for ${type}:`, error);
	    return null;
	  }
	}

	static async getAbility(pokemonId, abilityIndex) {
	  try {
	    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
	    const data = await pokemonInfo.json();

	    const abilityLength = data.abilities.length

	    if (abilityIndex >= abilityLength) {
	        abilityIndex = abilityLength - 1 // Pokerogue uses a "None" ability as padding when pokémon have less than 3.
	    }
	    
	    const abilityName = data.abilities[abilityIndex].ability.name
	    const abilityInfo = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
	    const abilityData = await abilityInfo.json();
	    const description = abilityData.flavor_text_entries.find((entry) => entry.language.name === "en") || "No description found"
	    return {
	        'name': abilityName.toUpperCase().replace('-', ' '),
	        'description': description.flavor_text,
	        'isHidden': data.abilities[abilityIndex].is_hidden
	    }
	  } catch (error) {
	    console.error('Error fetching Pokémons ability:', error);
	    return null;
	  }
	}

	static async getNature(nature) {
		try {
			const natureInfo = await fetch(`https://pokeapi.co/api/v2/nature/${nature}`)
			const data = await natureInfo.json();
		} catch (error) {
			console.error("Error fetching Nature details:", error)
			return null;
		}
	}

	// Function to get Pokémon type
	static async getPokemonType(id) {
	  try {
	    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	    const data = await response.json();
	    const types = data.types.map(type => type.type.name);
	    return types;
	  } catch (error) {
	    console.error('Error fetching Pokémon type:', error);
	    return null;
	  }
	}
}