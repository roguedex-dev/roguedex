const browserApi = typeof browser !== "undefined" ? browser : chrome;
let slotId = -1

function updateDiv(pokemon, weather, message) {
  browserApi.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browserApi.tabs.sendMessage(tabs[0].id, { type: message, pokemon: pokemon, weather: weather, slotId: slotId }, (response) => {
      if (response && response.success) {
          console.log('Div updated successfully');
      } else {
        console.error('Failed to update div');
      }
    });
  });
}

// message can be either "UPDATE_ALLIES_DIV" or "UPDATE_ENEMIES_DIV"
function appendPokemonArrayToDiv(pokemonArray, arena, message) {
  let frontendPokemonArray = []
  pokemonArray.forEach((pokemon) => {
    const pokemonId = Utils.convertPokemonId(pokemon.species)
    let weather = {}
    if (arena.weather && arena.weather.weatherType) {
        weather = {
            'type': WeatherType[arena.weather.weatherType],
            'turnsLeft': arena.weather.turnsLeft || 0
        }
    }
    PokeApi.getAbility(pokemonId, pokemon.abilityIndex).then((ability) => {
        Utils.getPokemonTypeEffectiveness(pokemonId).then((typeEffectiveness) => { 
          console.log("Got pokemon", pokemonId, "ability", ability, "type effectiveness", typeEffectiveness)
          frontendPokemonArray.push({
            'id': pokemonId,
            'typeEffectiveness': {
              'weaknesses': Array.from(typeEffectiveness.weaknesses), 
              'resistances': Array.from(typeEffectiveness.resistances), 
              'immunities': Array.from(typeEffectiveness.immunities)
            },
            'ivs': pokemon.ivs,
            'ability': ability,
            'nature': {
              name: Nature[pokemon.nature],
              description: PokeRogueUtils.getNatureDescription(pokemon.nature)
            }
          })
          updateDiv(frontendPokemonArray, weather, message)
        })
    })
  })
}

browserApi.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Happens when loading a savegame or continuing an old run
  if (request.type == 'BG_GET_SAVEDATA') {
    const savedata = request.data
    slotId = request.slotId
    console.log("Received save data", savedata)
    appendPokemonArrayToDiv(Utils.mapPartyToPokemonArray(savedata.enemyParty), savedata.arena, "UPDATE_ENEMIES_DIV")
    appendPokemonArrayToDiv(Utils.mapPartyToPokemonArray(savedata.party), savedata.arena, "UPDATE_ALLIES_DIV")
  }
});

browserApi.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.method === 'POST') {
        try {
          let sessionData = JSON.parse(new TextDecoder().decode(details.requestBody.raw[0].bytes))
          console.log("POST Session data:", sessionData)
          if (details.url.includes("updateall")) sessionData = sessionData.session
          appendPokemonArrayToDiv(Utils.mapPartyToPokemonArray(sessionData.enemyParty), sessionData.arena, "UPDATE_ENEMIES_DIV")
          appendPokemonArrayToDiv(Utils.mapPartyToPokemonArray(sessionData.party), sessionData.arena, "UPDATE_ALLIES_DIV")
        } catch (e) {
            console.error("Error while intercepting web request: ", e)
        }
    }
  },
  {
    urls: ['https://api.pokerogue.net/savedata/update?datatype=1*', 'https://api.pokerogue.net/savedata/updateall']
  },
  ["requestBody"]
)
