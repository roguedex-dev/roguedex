class PokemonMapperClass{
    constructor() {
        this.P2I = window.__Species;
        this.I2P;
        this.EvoMap = window.__EvolutionMap;
        this.PrevoMap;
        this.W2I = window.__WeatherMap;
        this.I2W;
        this.A2I = window.__AbilityMap;
        this.I2A;
        this.N2I = window.__NatureMap;
        this.I2N;
        PokemonMapperClass.#init(this);
    }

    static #init($this){
        $this.I2P = PokemonMapperClass.#calculateInverseMap($this.P2I);
        $this.I2W = PokemonMapperClass.#calculateInverseMap($this.W2I);
        $this.I2A = PokemonMapperClass.#calculateInverseMap($this.A2I);
        $this.I2N = PokemonMapperClass.#calculateInverseMap($this.N2I);
        $this.PrevoMap = PokemonMapperClass.#calcPrevolution($this.EvoMap);
    }

    static #calculateInverseMap(map){
        console.log(map);
        let returnMap = {};
        for (const [key, value] of Object.entries(map)) {
            returnMap[value] = key;
        }
        return returnMap;
    }

    static #calcPrevolution(evoMapT){
        // let evoMapT = window.__EvolutionMap;
        let preEvolutions = {};
        const prevolutionKeys = Object.keys(evoMapT);
        prevolutionKeys.forEach(pk =>{
            let evolutions =  evoMapT[pk];
            if (Array.isArray(evolutions)) {
                evolutions.forEach(evo => {
                    preEvolutions[evo.name] = pk;
                });
            } else {
                preEvolutions[evolutions.name] = pk;
            }
        });
        return preEvolutions;
    }

    findBasePokemon(pokemonName) {
        let currentName = pokemonName;
        while (this.PrevoMap[currentName] !== undefined) {
            currentName = this.PrevoMap[currentName];
        }
        return currentName;
    }

    static #mapPartyToPokemonArray(party) {
        return party.map(pokemon => ({
            species: pokemon.species,
            abilityIndex: pokemon.abilityIndex,
            nature: pokemon.nature,
            ivs: pokemon.ivs,
            pokerus: pokemon.pokerus,
            shiny: pokemon.shiny,
            variant: pokemon.variant,
            fusionSpecies: (pokemon.hasOwnProperty('fusionSpecies')) ? pokemon.fusionSpecies : null,
            fusionAbilityIndex: pokemon.fusionAbilityIndex,
        }));
    }

    static async #getPokeType(id) {
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

    static async #getPokemonTypeEffectiveness($this, id) {
        const types = await PokemonMapperClass.#getPokeType(id);
        if (types) {
            const { weaknesses, resistances, immunities } = await PokemonMapperClass.#calculateTypeEffectiveness($this, types);
            return {
                'weaknesses': weaknesses,
                'resistances': resistances,
                'immunities': immunities
            }
        }
        return {}
    }

    async getTypeEffectiveness(type) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();
            return data.damage_relations;
        } catch (error) {
            console.error(`Error fetching type effectiveness for ${type}:`, error);
            return null;
        }
    }

    static async #calculateTypeEffectiveness($this, types) {
        const typeEffectiveness = await Promise.all(types.map(type => $this.getTypeEffectiveness(type)));
        if (typeEffectiveness.some(data => data === null)) {
            return null;
        }

        const weaknesses = new Set();
        const resistances = new Set();
        const immunities = new Set();

        if (types.length === 1) {
            const data = typeEffectiveness[0];
            data.double_damage_from.forEach(t => weaknesses.add(t.name));
            data.half_damage_from.forEach(t => resistances.add(t.name));
            data.no_damage_from.forEach(t => immunities.add(t.name));
        } else if (types.length === 2) {
            const [type1, type2] = types;
            const type1Effectiveness = typeEffectiveness[0];
            const type2Effectiveness = typeEffectiveness[1];

            // Calculate weaknesses
            type1Effectiveness.double_damage_from.forEach(t => {
                if (!type2Effectiveness.half_damage_from.some(r => r.name === t.name)) {
                    weaknesses.add(t.name)
                }
            });
            type2Effectiveness.double_damage_from.forEach(t => {
                if (!type1Effectiveness.half_damage_from.some(r => r.name === t.name)) {
                    weaknesses.add(t.name)
                }
            });

            // Calculate resistances
            type1Effectiveness.half_damage_from.forEach(t => {
                if (!type2Effectiveness.double_damage_from.some(r => r.name === t.name)) {
                    resistances.add(t.name)
                }
            });

            type2Effectiveness.half_damage_from.forEach(t => {
                if (!type1Effectiveness.double_damage_from.some(r => r.name === t.name)) {
                    resistances.add(t.name)
                }
            });

            // Calculate immunities
            type1Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
            type2Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
            immunities.forEach(immunity => {
                weaknesses.delete(immunity);
                resistances.delete(immunity);
            })
        }

        return { weaknesses, resistances, immunities };
    }

    async getPokemonAbility(pokemonId, pokemonAbilityIndex, fusionId, fusionAbilityIndex) {
        let pokeID;
        let abilityIndex;
        if(fusionId){
            pokeID = (this.I2P[fusionId]).toLowerCase();
            abilityIndex = fusionAbilityIndex;
        }
        else{
            pokeID = (this.I2P[pokemonId]).toLowerCase();
            abilityIndex = pokemonAbilityIndex;
        }
        try {
            const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
            const data = await pokemonInfo.json();

            const abilityLength = data.abilities.length

            if (abilityIndex >= abilityLength) {
                abilityIndex = abilityLength - 1 // Pokerogue uses a "None" ability as padding when pokémon have less than 3.
            }

            const abilityName = data.abilities[abilityIndex].ability.name
            const abilityInfo = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
            const abilityData = await abilityInfo.json();
            return {
                'name': abilityName.toUpperCase().replace('-', ' '),
                'description': abilityData.flavor_text_entries[abilityData.flavor_text_entries.length - 1].flavor_text,
                'isHidden': data.abilities[abilityIndex].is_hidden
            }
        } catch (error) {
            console.error('Error fetching Pokémons ability:', error);
            return null;
        }
    }

    capitalizeFirstLetter(string) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async getPokemonArray(pokemonData, arena) {
        let $this = this;
        let pokemonArray = PokemonMapperClass.#mapPartyToPokemonArray(pokemonData);
        console.log(pokemonArray);
        let frontendPokemonArray = [];
        let weather = {};

        if (arena.weather && arena.weather.weatherType) {
            weather = {
                type: $this.I2W[arena.weather.weatherType],
                turnsLeft: arena.weather.turnsLeft || 0,
            };
        }

        const pokemonPromises = pokemonArray.map(async (pokemon) => {
            const pokemonId = $this.I2P[$this.convertPokemonId(pokemon.species)].toLocaleLowerCase();
            const typeEffectiveness = await PokemonMapperClass.#getPokemonTypeEffectiveness($this, pokemonId);
            let basePokemon = $this.findBasePokemon($this.I2P[pokemon.species]);
            let name = $this.getPokemonName(pokemon);
            return {
                id: pokemon.species,
                name: $this.capitalizeFirstLetter(name.toUpperCase()),
                typeEffectiveness: {
                    weaknesses: Array.from(typeEffectiveness.weaknesses),
                    resistances: Array.from(typeEffectiveness.resistances),
                    immunities: Array.from(typeEffectiveness.immunities),
                },
                ivs: pokemon.ivs,
                ability: await $this.getPokemonAbility(pokemon.species, pokemon.abilityIndex, pokemon.fusionSpecies, pokemon.fusionAbilityIndex),
                nature: $this.I2N[pokemon.nature],
                basePokemon: basePokemon,
                baseId: $this.P2I[basePokemon],
                fusionId: pokemon.fusionSpecies,
            };
        });

        frontendPokemonArray = await Promise.all(pokemonPromises);

        return { pokemon: frontendPokemonArray, weather: weather };
    }

    getPokemonName(pokemon){
        if(pokemon.fusionSpecies){
            let nameA = this.I2P[pokemon.species];
            let nameB = this.I2P[pokemon.fusionSpecies];
            return this.getFusedSpeciesName(nameA, nameB);
            //getFusedSpeciesName
        }
        else{
            return this.I2P[pokemon.species]
        }

    }

     getFusedSpeciesName(speciesAName, speciesBName) {
        const fragAPattern = /([a-z]{2}.*?[aeiou(?:y$)\-\']+)(.*?)$/i;
        const fragBPattern = /([a-z]{2}.*?[aeiou(?:y$)\-\'])(.*?)$/i;

        const [ speciesAPrefixMatch, speciesBPrefixMatch ] = [ speciesAName, speciesBName ].map(n => /^(?:[^ ]+) /.exec(n));
        const [ speciesAPrefix, speciesBPrefix ] = [ speciesAPrefixMatch, speciesBPrefixMatch ].map(m => m ? m[0] : '');

        if (speciesAPrefix)
            speciesAName = speciesAName.slice(speciesAPrefix.length);
        if (speciesBPrefix)
            speciesBName = speciesBName.slice(speciesBPrefix.length);

        const [ speciesASuffixMatch, speciesBSuffixMatch ] = [ speciesAName, speciesBName ].map(n => / (?:[^ ]+)$/.exec(n));
        const [ speciesASuffix, speciesBSuffix ] = [ speciesASuffixMatch, speciesBSuffixMatch ].map(m => m ? m[0] : '');

        if (speciesASuffix)
            speciesAName = speciesAName.slice(0, -speciesASuffix.length);
        if (speciesBSuffix)
            speciesBName = speciesBName.slice(0, -speciesBSuffix.length);

        const splitNameA = speciesAName.split(/ /g);
        const splitNameB = speciesBName.split(/ /g);

        let fragAMatch = fragAPattern.exec(speciesAName);
        let fragBMatch = fragBPattern.exec(speciesBName);
        let fragA;
        let fragB;

        fragA = splitNameA.length === 1
            ? fragAMatch ? fragAMatch[1] : speciesAName
            : splitNameA[splitNameA.length - 1];

        if (splitNameB.length === 1) {
            if (fragBMatch) {
                const lastCharA = fragA.slice(fragA.length - 1);
                const prevCharB = fragBMatch[1].slice(fragBMatch.length - 1);
                fragB = (/[\-']/.test(prevCharB) ? prevCharB : '') + fragBMatch[2] || prevCharB;
                if (lastCharA === fragB[0]) {
                    if (/[aiu]/.test(lastCharA))
                        fragB = fragB.slice(1);
                    else {
                        const newCharMatch = new RegExp(`[^${lastCharA}]`).exec(fragB);
                        if (newCharMatch?.index > 0)
                            fragB = fragB.slice(newCharMatch.index);
                    }
                }
            } else
                fragB = speciesBName;
        } else
            fragB = splitNameB[splitNameB.length - 1];

        if (splitNameA.length > 1)
            fragA = `${splitNameA.slice(0, splitNameA.length - 1).join(' ')} ${fragA}`;

        fragB = `${fragB.slice(0, 1).toLowerCase()}${fragB.slice(1)}`;
        return `${speciesAPrefix || speciesBPrefix}${fragA}${fragB}${speciesBSuffix || speciesASuffix}`;
    }

    convertPokemonId(pokemonId) {
        const conversionList = {
            2019: 10091,
            2020: 10092,
            2026: 10100,
            2027: 10101,
            2028: 10102,
            2037: 10103,
            2038: 10104,
            2050: 10105,
            2051: 10106,
            2052: 10107,
            2053: 10108,
            2074: 10109,
            2075: 10110,
            2076: 10111,
            2088: 10112,
            2089: 10113,
            2103: 10114,
            2105: 10115,
            2670: 10061,
            4052: 10162,
            4077: 10163,
            4078: 10164,
            4079: 10165,
            4080: 10166,
            4083: 10167,
            4110: 10168,
            4122: 10169,
            4144: 10170,
            4145: 10171,
            4146: 10172,
            4199: 10173,
            4222: 10174,
            4263: 10175,
            4264: 10176,
            4554: 10177,
            4555: 10178,
            4562: 10179,
            4618: 10180,
            6058: 10229,
            6059: 10230,
            6100: 10231,
            6101: 10232,
            6157: 10233,
            6211: 10234,
            6215: 10235,
            6503: 10236,
            6549: 10237,
            6570: 10238,
            6571: 10239,
            6628: 10240,
            6705: 10241,
            6706: 10242,
            6713: 10243,
            6724: 10244,
            8128: 10252,
            8194: 10253,
            8901: 10272
        }
        if (pokemonId in conversionList) {
            return conversionList[pokemonId]
        } else {
            return pokemonId
        }
    }
}



