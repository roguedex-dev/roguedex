// Determine browser
const browserApi = typeof browser !== "undefined" ? browser : chrome;

// Creates the main wrapper div
function createDiv() {
  const mainWrapper = document.createElement("div");
  mainWrapper.className = "main-fixed";

  // Create the table header row
  const headerRow = document.createElement("div");
  headerRow.className = "header-row";
  headerRow.id = "headerRow";

  const pokemonHeader = document.createElement("div");
  pokemonHeader.textContent = "Pokemon";
  headerRow.appendChild(pokemonHeader);

  const weaknessHeader = document.createElement("div");
  weaknessHeader.textContent = "Weakness";
  headerRow.appendChild(weaknessHeader);

  const resistanceHeader = document.createElement("div");
  resistanceHeader.textContent = "Resistance";
  headerRow.appendChild(resistanceHeader);

  const immunityHeader = document.createElement("div");
  immunityHeader.textContent = "Immunity";
  headerRow.appendChild(immunityHeader);

  mainWrapper.appendChild(headerRow);
  return mainWrapper;
}

// Creates a new enemies div
function createEnemyDiv() {
  const enemies = createDiv();
  enemies.id = "enemies";
  return enemies;
}

// Creates a new allies div
function createAlliesDiv() {
  const allies = createDiv();
  allies.id = "allies";
  return allies;
}

// Enables drag-and-drop functionality on an element
function enableDragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const header = elmnt.querySelector("#headerRow");
  const dragStartElement = header ? header : elmnt;

  // Attach the mousedown event handler
  dragStartElement.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Handles dragging movement
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  // Stops dragging on mouse release
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const enemies = createEnemyDiv();
const allies = createAlliesDiv();
enableDragElement(enemies);
enableDragElement(allies);
document.body.appendChild(enemies);
document.body.appendChild(allies);

// Reset browser variables with error handling
browserApi.runtime.sendMessage(
  { type: "RESET_VARIABLES" },
  function (response) {
    if (response && response.success) {
      console.log("Variables reset successfully");
    } else {
      console.error("Failed to reset variables");
    }
  },
);

// Creates a new row for a Pokémon
function createPokemonRow(pokemon) {
  const row = document.createElement("div");
  row.className = "pokemon-row";
  row.id = pokemon.id;

  const iconWrapper = document.createElement("div");
  iconWrapper.className = "pokemon-icon";
  const icon = document.createElement("img");
  icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  iconWrapper.appendChild(icon);
  row.appendChild(iconWrapper);

  const weaknesses = document.createElement("div");
  weaknesses.textContent = Array.from(pokemon.info.weaknesses || []).join(" ");
  weaknesses.className = "pokemon-weaknesses";
  weaknesses.style.paddingLeft = "40px";
  row.appendChild(weaknesses);

  const resistances = document.createElement("div");
  resistances.textContent = Array.from(pokemon.info.resistances || []).join(
    " ",
  );
  resistances.className = "pokemon-resistances";
  resistances.style.paddingLeft = "80px";
  row.appendChild(resistances);

  const immunities = document.createElement("div");
  immunities.textContent = Array.from(pokemon.info.immunities || []).join(" ");
  immunities.className = "pokemon-immunities";
  immunities.style.paddingLeft = "120px";
  row.appendChild(immunities);

  return row;
}

// Appends a Pokémon row to a given div
function appendPokemonToDiv(pokemon, div) {
  let pokemonRow = div.querySelector(`[id="${pokemon.id}"]`);
  if (pokemonRow) return;
  console.log("Appending Pokémon to div");
  pokemonRow = createPokemonRow(pokemon);
  div.appendChild(pokemonRow);
}

// Handles incoming messages to update the enemy and ally divs
browserApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Got message:", message, "from", sender);
  if (message.type === "UPDATE_ENEMIES_DIV") {
    console.log("Removing DIV");
    document.getElementById("enemies").remove();
    const newEnemies = createEnemyDiv();
    enableDragElement(newEnemies);
    document.body.appendChild(newEnemies);
    console.log("Appended", newEnemies);
    message.pokemon.forEach((pokemon) => {
      console.log("Received:", pokemon);
      appendPokemonToDiv(pokemon, newEnemies);
    });
    sendResponse({ success: true });
  } else if (message.type === "UPDATE_ALLIES_DIV") {
    message.myPokemon.forEach((pokemon) => {
      console.log("Received:", pokemon);
      appendPokemonToDiv(pokemon, allies);
    });
    sendResponse({ success: true });
  }
});
