const browserAPI = (typeof chrome !== "undefined") ? chrome : browser;

const saveDataRegex = /.*api.*\/savedata\/get.*slot=(\d).*$/
const pokemonSpriteRegex = /.*\/images\/pokemon\/(.*\/)*?(\d+).*\.json.*$/
const pokemonBackSpriteRegex = /.*\/images\/pokemon\/back\/(\d+)\.png.*$/
const updateDivTimeout = 1000
var myPokemon = []
var currentEnemies = []
var lastUpdated = null
var timeoutId = null;
let ignoreIds = []

var saveSlotCount = [false, false, false, false, false]
var gameStarted = false
function checkGameStarted() {
  for (let i = 0; i < saveSlotCount.length; i++) {
    if (!saveSlotCount[i]) return
  }
  gameStarted = true
}

function getPokemonSpriteURL(id) {
  const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return spriteURL;
}

async function getPokeType(id) {
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

async function getTypeEffectiveness(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    return data.damage_relations;
  } catch (error) {
    console.error(`Error fetching type effectiveness for ${type}:`, error);
    return null;
  }
}

async function calculateTypeEffectiveness(types) {
  const typeEffectiveness = await Promise.all(types.map(getTypeEffectiveness));
  if (typeEffectiveness.some(data => data === null)) {
    return null;
  }

  const weaknesses = new Set();
  const resistances = new Set();
  const immunities = new Set();

  // Combining the type effectiveness calculations
  // This part of the code was simplified for brevity
  return { weaknesses, resistances, immunities };
}

async function getPokeInfo(id) {
  const types = await getPokeType(id);
  if (types) {
    const { weaknesses, resistances, immunities } = await calculateTypeEffectiveness(types);
    return { 
      'weaknesses': weaknesses, 
      'resistances': resistances, 
      'immunities': immunities 
    }
  }
  return {}
}

function updateAlliesDiv(myPokemon) {
  browserAPI.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browserAPI.tabs.sendMessage(tabs[0].id, { type: 'UPDATE_ALLIES_DIV', myPokemon: myPokemon }, (response) => {
      if (response && response.success) {
          console.log('Div updated successfully');
      } else {
        console.error('Failed to update div');
      }
    });
  });
}

async function updateEnemiesDiv(pokemon) {
  await browserAPI.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    browserAPI.tabs.sendMessage(tabs[0].id, { type: 'UPDATE_ENEMIES_DIV', pokemon: pokemon }, (response) => {
      if (response && response.success) {
          console.log('Div updated successfully');
      } else {
        console.error('Failed to update div');
      }
    });
  });
}

browserAPI.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'RESET_VARIABLES') {
    console.log("Received RESET_VARIABLES message")
    // Resetting game state variables
    myPokemon = [];
    currentEnemies = [];
    lastUpdated = null;
    timeoutId = null;
    ignoreIds = [];
    saveSlotCount = [false, false, false, false, false]
    gameStarted = false
    sendResponse({ success: true });
  }
});

browserAPI.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.method === 'GET') {
      console.log('GET request detected:', details.url);
      const url = details.url
      if (!gameStarted) {
        if (saveDataRegex.test(url)) {
          let slotId = saveDataRegex.exec(url)[1]
          saveSlotCount[slotId] = true
        }
        return checkGameStarted()
      }
      if (pokemonBackSpriteRegex.test(url)) {
        let pokemonIdFromUrl = pokemonBackSpriteRegex.exec(url)[1]
        let pokemonId = convertPokemonId(pokemonIdFromUrl)
        getPokeInfo(pokemonId).then((info) => {
          let found = myPokemon.find(obj => { return obj.id === pokemonId})
          if (!found) {
            myPokemon.push({
              'id': pokemonId,
              'info': info
            })
            updateAlliesDiv(myPokemon)
          }
        })
      } else if (pokemonSpriteRegex.test(url)) {
        let uniqueId = Math.random()
        let pokemonIdFromUrl = pokemonSpriteRegex.exec(url)[2]
        let pokemonId = convertPokemonId(pokemonIdFromUrl)
        getPokeInfo(pokemonId).then((info) => {
          console.log(uniqueId, "Got pokemon", pokemonId, "info", info)
          if (lastUpdated === null) {
            console.log(uniqueId, "Last updated is null, currentEnemies", currentEnemies)
            currentEnemies.push({
              'id': pokemonId,
              'info': info
            })
            lastUpdated = Date.now();
            timeoutId = setTimeout(function() {
              console.log(uniqueId, "Enough time has passed, will update enemies div. CurrentEnemies:", currentEnemies)
              updateEnemiesDiv(currentEnemies);
              lastUpdated = null;
              currentEnemies = [];
              console.log(uniqueId, "setTimeout function completed")
            }, updateDivTimeout);
          } else if (Date.now() - lastUpdated <= updateDivTimeout) {
            clearTimeout(timeoutId);
            lastUpdated = Date.now()
            currentEnemies.push({
              'id': pokemonId,
              'info': info
            })
            console.log(uniqueId, "A second has not passed, timeout cleared. CurrentEnemies:", currentEnemies)
            timeoutId = setTimeout(function() {
              console.log(uniqueId, "Enough time has passed, will update enemies div. CurrentEnemies:", currentEnemies)
              updateEnemiesDiv(currentEnemies);
              lastUpdated = null;
              currentEnemies = [];
              console.log(uniqueId, "setTimeout function completed")
            })
          } else {
            console.log("lastUpdated is not null", lastUpdated, "I shouldn't be called")
          }
        })
      }
    }
  },
  {
    urls: ['https://pokerogue.net/images/pokemon/*', 'https://api.pokerogue.net/savedata/get*']
  },
  ['blocking']
);
