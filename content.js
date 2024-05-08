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

function createEnemyDiv() {
	const enemies = document.createElement("div");
	enemies.className = 'enemy-team'
  enemies.id = "enemies";
  const pokemonCards = document.createElement("div");
  pokemonCards.className = "pokemon-cards"
  enemies.appendChild(pokemonCards)
  return enemies;
}

function createAlliesDiv() {
	const allies = document.createElement("div");
	allies.className = 'allies-team'
  allies.id = "allies";
  const pokemonCards = document.createElement("div");
  pokemonCards.className = "pokemon-cards"
  allies.appendChild(pokemonCards)
  return allies;
}

// Enables drag-and-drop functionality on an element
function enableDragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragStartElement = elmnt;

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

const enemiesDiv = createEnemyDiv()
const alliesDiv = createAlliesDiv()

enableDragElement(enemiesDiv);
enableDragElement(alliesDiv);

document.body.appendChild(enemiesDiv);
document.body.appendChild(alliesDiv);

let Types
(function (Types) {
	Types[Types["normal"] = 1] = 1;
	Types[Types["fighting"] = 2] = 2;
	Types[Types["flying"] = 3] = 3;
	Types[Types["poison"] = 4] = 4;
	Types[Types["ground"] = 5] = 5;
	Types[Types["rock"] = 6] = 6;
	Types[Types["bug"] = 7] = 7;
	Types[Types["ghost"] = 8] = 8;
	Types[Types["steel"] = 9] = 9;
	Types[Types["fire"] = 10] = 10;
	Types[Types["water"] = 11] = 11;
	Types[Types["grass"] = 12] = 12;
	Types[Types["electric"] = 13] = 13;
	Types[Types["psychic"] = 14] = 14;
	Types[Types["ice"] = 15] = 15;
	Types[Types["dragon"] = 16] = 16;
	Types[Types["dark"] = 17] = 17;
	Types[Types["fairy"] = 18] = 18;
})(Types || (Types = {}));

let Stat;
(function (Stat) {
    Stat[Stat["HP"] = 0] = "HP";
    Stat[Stat["ATK"] = 1] = "ATK";
    Stat[Stat["DEF"] = 2] = "DEF";
    Stat[Stat["SPATK"] = 3] = "SPATK";
    Stat[Stat["SPDEF"] = 4] = "SPDEF";
    Stat[Stat["SPD"] = 5] = "SPD";
})(Stat || (Stat = {}));
;

function createTooltipDiv(tip) {
	const tooltip = document.createElement('div')
	tooltip.classList.add('tooltiptext')
	tooltip.textContent = tip
	return tooltip
}

// Current values: weaknesses, resistances, immunities
function createTypeEffectivenessWrapper(effectiveness, types) {
	const typeEffectivenessWrapper = document.createElement('div')
	typeEffectivenessWrapper.classList.add(`pokemon-${effectiveness}`);
	typeEffectivenessWrapper.classList.add('tooltip');
	let counter = 0;
	let block = document.createElement('div');
	typeEffectivenessWrapper.appendChild(block)
	types.forEach(type => {
		if (counter % 3 === 0) {
			block = document.createElement('div');
			typeEffectivenessWrapper.appendChild(block)
		}
    const typeIcon = document.createElement('div');
    typeIcon.style.backgroundImage = `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${Types[type]}.png')`;
    typeIcon.className = 'type-icon';
    block.appendChild(typeIcon)
    counter += 1;
  });
  return typeEffectivenessWrapper
}

function createPokemonCardDiv(pokemon) {
	const card = document.createElement('div');
	card.classList.add('pokemon-card');

	const infoRow = document.createElement('div');
	infoRow.style.display = 'flex';

	const iconWrapper = document.createElement('div');
  iconWrapper.className = 'pokemon-icon';
  const icon = document.createElement('img');
  icon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  iconWrapper.appendChild(icon);
  infoRow.appendChild(iconWrapper);

  const weaknessesWrapper = createTypeEffectivenessWrapper('weaknesses', pokemon.typeEffectiveness.weaknesses)
	weaknessesWrapper.appendChild(createTooltipDiv('Weak to'))

	const resistancesWrapper = createTypeEffectivenessWrapper('resistances', pokemon.typeEffectiveness.resistances)
	resistancesWrapper.appendChild(createTooltipDiv('Resists'))

	const immunitiesWrapper = createTypeEffectivenessWrapper('immunities', pokemon.typeEffectiveness.immunities)
	immunitiesWrapper.appendChild(createTooltipDiv('Immune to'))

	infoRow.appendChild(weaknessesWrapper)
	infoRow.appendChild(resistancesWrapper)
	infoRow.appendChild(immunitiesWrapper)

	const extraInfoRow = document.createElement('div');
	extraInfoRow.classList.add('text-base')
	extraInfoRow.textContent = `Ability: ${pokemon.ability} - Nature: ${pokemon.nature}`;
	const ivsRow = document.createElement('div');
	ivsRow.classList.add('text-base');
	ivsRow.textContent = `HP: ${pokemon.ivs[Stat["HP"]]}, ATK: ${pokemon.ivs[Stat["ATK"]]}, DEF: ${pokemon.ivs[Stat["DEF"]]}, SPE: ${pokemon.ivs[Stat["SPD"]]}, SPD: ${pokemon.ivs[Stat["SPDEF"]]}, SPA: ${pokemon.ivs[Stat["SPATK"]]}`;
	
	card.appendChild(infoRow)
	card.appendChild(extraInfoRow)
	card.appendChild(ivsRow)
	return card
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Got message:", message, "from", sender)
	if (message.type === 'UPDATE_ENEMIES_DIV' || message.type === 'UPDATE_ALLIES_DIV') {
		let divId = message.type === 'UPDATE_ENEMIES_DIV' ? 'enemies' : 'allies'
		let oldDiv = document.getElementById(divId)
		let oldTop = ''
		let oldLeft = ''
		if (oldDiv) {
			console.log("Removing DIV with id", divId)
			oldTop = oldDiv.style.top;
			oldLeft = oldDiv.style.left;
			oldDiv.remove();
		}
		const newDiv = divId === 'enemies' ? createEnemyDiv() : createAlliesDiv()
		enableDragElement(newDiv)
		newDiv.style.top = oldTop
		newDiv.style.left = oldLeft
		document.body.appendChild(newDiv)
		console.log("Appended", newDiv)
		message.pokemon.forEach((pokemon) => {
    	const card = createPokemonCardDiv(pokemon)
		  document.getElementById(divId).querySelector('.pokemon-cards').appendChild(card);
    })
    sendResponse({ success: true });
	}
});