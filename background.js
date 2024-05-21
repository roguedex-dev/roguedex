const browserApi = typeof browser !== 'undefined' ? browser : chrome
let slotId = -1

let Nature
;(function (Nature) {
    Nature[(Nature.HARDY = 0)] = 'HARDY'
    Nature[(Nature.LONELY = 1)] = 'LONELY'
    Nature[(Nature.BRAVE = 2)] = 'BRAVE'
    Nature[(Nature.ADAMANT = 3)] = 'ADAMANT'
    Nature[(Nature.NAUGHTY = 4)] = 'NAUGHTY'
    Nature[(Nature.BOLD = 5)] = 'BOLD'
    Nature[(Nature.DOCILE = 6)] = 'DOCILE'
    Nature[(Nature.RELAXED = 7)] = 'RELAXED'
    Nature[(Nature.IMPISH = 8)] = 'IMPISH'
    Nature[(Nature.LAX = 9)] = 'LAX'
    Nature[(Nature.TIMID = 10)] = 'TIMID'
    Nature[(Nature.HASTY = 11)] = 'HASTY'
    Nature[(Nature.SERIOUS = 12)] = 'SERIOUS'
    Nature[(Nature.JOLLY = 13)] = 'JOLLY'
    Nature[(Nature.NAIVE = 14)] = 'NAIVE'
    Nature[(Nature.MODEST = 15)] = 'MODEST'
    Nature[(Nature.MILD = 16)] = 'MILD'
    Nature[(Nature.QUIET = 17)] = 'QUIET'
    Nature[(Nature.BASHFUL = 18)] = 'BASHFUL'
    Nature[(Nature.RASH = 19)] = 'RASH'
    Nature[(Nature.CALM = 20)] = 'CALM'
    Nature[(Nature.GENTLE = 21)] = 'GENTLE'
    Nature[(Nature.SASSY = 22)] = 'SASSY'
    Nature[(Nature.CAREFUL = 23)] = 'CAREFUL'
    Nature[(Nature.QUIRKY = 24)] = 'QUIRKY'
})(Nature || (Nature = {}))

let WeatherType
;(function (WeatherType) {
    WeatherType[(WeatherType.NONE = 0)] = 'NONE'
    WeatherType[(WeatherType.SUNNY = 1)] = 'SUNNY'
    WeatherType[(WeatherType.RAIN = 2)] = 'RAIN'
    WeatherType[(WeatherType.SANDSTORM = 3)] = 'SANDSTORM'
    WeatherType[(WeatherType.HAIL = 4)] = 'HAIL'
    WeatherType[(WeatherType.SNOW = 5)] = 'SNOW'
    WeatherType[(WeatherType.FOG = 6)] = 'FOG'
    WeatherType[(WeatherType.HEAVY_RAIN = 7)] = 'HEAVY_RAIN'
    WeatherType[(WeatherType.HARSH_SUN = 8)] = 'HARSH_SUN'
    WeatherType[(WeatherType.STRONG_WINDS = 9)] = 'STRONG_WINDS'
})(WeatherType || (WeatherType = {}))

function getPokemonSpriteURL(id) {
    // Construct the sprite URL based on the Pokemon ID
    const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    return spriteURL
}

// Function to get Pokémon type
async function getPokeType(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        const types = data.types.map(type => type.type.name)
        return types
    } catch (error) {
        console.error('Error fetching Pokémon type:', error)
        return null
    }
}

// Function to get type effectiveness
async function getTypeEffectiveness(type) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        const data = await response.json()
        return data.damage_relations
    } catch (error) {
        console.error(`Error fetching type effectiveness for ${type}:`, error)
        return null
    }
}
// i don't know how to do javascript please fix this if it's broken
// gets ability from pokeapi using the pokemon's ability index
async function getAbility(pokeID, abilityIndex) {
    try {
        const pokemonInfo = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokeID}`
        )
        const data = await pokemonInfo.json()

        const abilityLength = data.abilities.length

        if (abilityIndex >= abilityLength) {
            abilityIndex = abilityLength - 1 // Pokerogue uses a "None" ability as padding when pokémon have less than 3.
        }

        const abilityName = data.abilities[abilityIndex].ability.name
        const abilityInfo = await fetch(
            `https://pokeapi.co/api/v2/ability/${abilityName}`
        )
        const abilityData = await abilityInfo.json()
        return {
            name: abilityName.toUpperCase().replace('-', ' '),
            description:
                abilityData.flavor_text_entries[
                    abilityData.flavor_text_entries.length - 1
                ].flavor_text,
            isHidden: data.abilities[abilityIndex].is_hidden,
        }
    } catch (error) {
        console.error('Error fetching Pokémons ability:', error)
        return null
    }
}
// Function to calculate weaknesses, resistances, and immunities
async function calculateTypeEffectiveness(types) {
    const typeEffectiveness = await Promise.all(types.map(getTypeEffectiveness))
    if (typeEffectiveness.some(data => data === null)) {
        return null
    }

    const weaknesses = new Set()
    const resistances = new Set()
    const immunities = new Set()

    if (types.length === 1) {
        const data = typeEffectiveness[0]
        data.double_damage_from.forEach(t => weaknesses.add(t.name))
        data.half_damage_from.forEach(t => resistances.add(t.name))
        data.no_damage_from.forEach(t => immunities.add(t.name))
    } else if (types.length === 2) {
        const [type1, type2] = types
        const type1Effectiveness = typeEffectiveness[0]
        const type2Effectiveness = typeEffectiveness[1]

        // Calculate weaknesses
        type1Effectiveness.double_damage_from.forEach(t => {
            if (
                !type2Effectiveness.half_damage_from.some(
                    r => r.name === t.name
                )
            ) {
                weaknesses.add(t.name)
            }
        })
        type2Effectiveness.double_damage_from.forEach(t => {
            if (
                !type1Effectiveness.half_damage_from.some(
                    r => r.name === t.name
                )
            ) {
                weaknesses.add(t.name)
            }
        })

        // Calculate resistances
        type1Effectiveness.half_damage_from.forEach(t => {
            if (
                !type2Effectiveness.double_damage_from.some(
                    r => r.name === t.name
                )
            ) {
                resistances.add(t.name)
            }
        })

        type2Effectiveness.half_damage_from.forEach(t => {
            if (
                !type1Effectiveness.double_damage_from.some(
                    r => r.name === t.name
                )
            ) {
                resistances.add(t.name)
            }
        })

        // Calculate immunities
        type1Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))
        type2Effectiveness.no_damage_from.forEach(t => immunities.add(t.name))

        immunities.forEach(immunity => {
            weaknesses.delete(immunity)
            resistances.delete(immunity)
        })
    }

    return { weaknesses, resistances, immunities }
}

// Example usage
async function getPokemonTypeEffectiveness(id) {
    const types = await getPokeType(id)
    if (types) {
        const { weaknesses, resistances, immunities } =
            await calculateTypeEffectiveness(types)
        return {
            weaknesses,
            resistances,
            immunities,
        }
    }
    return {}
}

function updateDiv(pokemon, weather, message) {
    browserApi.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {
            browserApi.tabs.sendMessage(
                tabs[0].id,
                { type: message, pokemon, weather, slotId },
                response => {
                    if (response && response.success) {
                        console.log('Div updated successfully')
                    } else {
                        console.error('Failed to update div')
                    }
                }
            )
        }
    )
}

function convertPokemonId(pokemonId) {
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
        8901: 10272,
    }
    if (pokemonId in conversionList) {
        return conversionList[pokemonId]
    } else {
        return pokemonId
    }
}

function mapPartyToPokemonArray(party) {
    return party.map(({ species, abilityIndex, nature, ivs }) => ({
        species,
        abilityIndex,
        nature,
        ivs,
    }))
}

// message can be either "UPDATE_ALLIES_DIV" or "UPDATE_ENEMIES_DIV"
function appendPokemonArrayToDiv(pokemonArray, arena, message) {
    const frontendPokemonArray = []
    pokemonArray.forEach(pokemon => {
        const pokemonId = convertPokemonId(pokemon.species)
        let weather = {}
        if (arena.weather && arena.weather.weatherType) {
            weather = {
                type: WeatherType[arena.weather.weatherType],
                turnsLeft: arena.weather.turnsLeft || 0,
            }
        }
        getAbility(pokemonId, pokemon.abilityIndex).then(ability => {
            getPokemonTypeEffectiveness(pokemonId).then(typeEffectiveness => {
                console.log(
                    'Got pokemon',
                    pokemonId,
                    'ability',
                    ability,
                    'type effectiveness',
                    typeEffectiveness
                )
                frontendPokemonArray.push({
                    id: pokemon.species,
                    typeEffectiveness: {
                        weaknesses: Array.from(typeEffectiveness.weaknesses),
                        resistances: Array.from(typeEffectiveness.resistances),
                        immunities: Array.from(typeEffectiveness.immunities),
                    },
                    ivs: pokemon.ivs,
                    ability,
                    nature: Nature[pokemon.nature],
                })
                updateDiv(frontendPokemonArray, weather, message)
            })
        })
    })
}

browserApi.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // Happens when loading a savegame or continuing an old run
        if (request.type == 'BG_GET_SAVEDATA') {
            const savedata = request.data
            slotId = request.slotId
            console.log('Received save data', savedata)
            appendPokemonArrayToDiv(
                mapPartyToPokemonArray(savedata.enemyParty),
                savedata.arena,
                'UPDATE_ENEMIES_DIV'
            )
            appendPokemonArrayToDiv(
                mapPartyToPokemonArray(savedata.party),
                savedata.arena,
                'UPDATE_ALLIES_DIV'
            )
        }
    }
)

browserApi.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.method === 'POST') {
            try {
                let sessionData = JSON.parse(
                    new TextDecoder().decode(details.requestBody.raw[0].bytes)
                )
                console.log('POST Session data:', sessionData)
                if (details.url.includes('updateall')) {
                    sessionData = sessionData.session
                }
                appendPokemonArrayToDiv(
                    mapPartyToPokemonArray(sessionData.enemyParty),
                    sessionData.arena,
                    'UPDATE_ENEMIES_DIV'
                )
                appendPokemonArrayToDiv(
                    mapPartyToPokemonArray(sessionData.party),
                    sessionData.arena,
                    'UPDATE_ALLIES_DIV'
                )
            } catch (e) {
                console.error('Error while intercepting web request: ', e)
            }
        }
    },
    {
        urls: [
            'https://api.pokerogue.net/savedata/update?datatype=1*',
            'https://api.pokerogue.net/savedata/updateall',
        ],
    },
    ['requestBody']
)
