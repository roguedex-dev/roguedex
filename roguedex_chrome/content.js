const runningStatusDiv = document.createElement('div')
runningStatusDiv.textContent = 'RogueDex is running!'
runningStatusDiv.classList.add('text-base')
runningStatusDiv.classList.add('running-status')
document.body.insertBefore(runningStatusDiv, document.body.firstChild)

let wrapperDivPositions = {
	'enemies': {
		'top' : '0',
		'left': '0',
		'opacity': '100'
	},
	'allies': {
		'top': '0',
		'left': '0',
		'opacity': '100'
	}
}

let slotId = -1
const saveKey = 'x0i2O7WRiANTqPmZ'
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
  return enemies;
}

function createAlliesDiv() {
	const allies = document.createElement("div");
	allies.className = 'allies-team'
  allies.id = "allies";
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
    if (e.target.type === 'submit' || e.target.type === 'range') return
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Handles dragging movement
  function dragElement(e) {
    e = e || window.event;
    if (e.target.type === 'submit' || e.target.type === 'range') return
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
	tooltip.classList.add('text-base')
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

let currentEnemyPage = 0;
let currentAllyPage = 0;
let enemiesPokemon = [];
let alliesPokemon = [];
let weather = {};

function createArrowButtonsDiv(divId) {
	const buttonsDiv = document.createElement('div')
	buttonsDiv.classList.add('arrow-button-wrapper')
	const arrowUpButton = document.createElement('button')
	const arrowDownButton = document.createElement('button')
	arrowUpButton.classList.add('text-base')
	arrowDownButton.classList.add('text-base')
	arrowUpButton.classList.add('arrow-button')
	arrowDownButton.classList.add('arrow-button')
	arrowUpButton.textContent = "↑"
	arrowDownButton.textContent = "↓"
	arrowUpButton.id = `${divId}-up`
	arrowDownButton.id = `${divId}-down`
	arrowUpButton.addEventListener('click', changePage)
	arrowDownButton.addEventListener('click', changePage)
	buttonsDiv.appendChild(arrowUpButton)
	buttonsDiv.appendChild(arrowDownButton)
	return buttonsDiv
}

function createOpacitySliderDiv(divId, initialValue = "100") {
	const sliderDiv = document.createElement('div')
	sliderDiv.classList.add('slider-wrapper')
	const opacityTextDiv = document.createElement('div')
	opacityTextDiv.classList.add('text-base')
	opacityTextDiv.textContent = "Opacity:"
	const slider = document.createElement('input')
	slider.type = "range"
	slider.min = "10"
	slider.max = "100"
	slider.value = initialValue
	slider.id = `${divId}-slider`
	sliderDiv.appendChild(opacityTextDiv)
	sliderDiv.appendChild(slider)
	sliderDiv.addEventListener('input', changeOpacity)
	return sliderDiv
}

function changeOpacity(e) {
	const divId = e.target.id.split("-")[0]
	const div = document.getElementById(divId)
	wrapperDivPositions[divId].opacity = e.target.value
	div.style.opacity = `${e.target.value / 100}`
}

function changePage(click) {
	const buttonId = click.target.id
	const divId = buttonId.split("-")[0]
	const direction = buttonId.split("-")[1]
	if (direction === 'up') {
		if (divId === 'enemies') {
			if (currentEnemyPage > 0) {
				currentEnemyPage -= 1
			} else {
				currentEnemyPage = enemiesPokemon.length - 1
			}
		} else if (divId === 'allies') {
			if (currentAllyPage > 0) {
				currentAllyPage -= 1
			} else {
				currentAllyPage = alliesPokemon.length - 1
			}
		}		
	} else if (direction === 'down') {
		if (divId === 'enemies') {
			if ((currentEnemyPage + 1) < enemiesPokemon.length) {
				currentEnemyPage += 1
			} else {
				currentEnemyPage = 0
			}
		} else if (divId === 'allies') {
			if ((currentAllyPage + 1) < alliesPokemon.length) {
				currentAllyPage += 1
			} else {
				currentAllyPage = 0
			}
		}
	}
	createCardsDiv(divId)
}

function createPokemonCardDiv(divId, pokemon) {
	const card = document.createElement('div');
	card.classList.add('pokemon-card');

	const opacitySliderDiv = createOpacitySliderDiv(divId, wrapperDivPositions[divId].opacity)

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
	
	let weatherRow = undefined
	if (weather.type && weather.turnsLeft) {
		weatherRow = document.createElement('div');
		weatherRow.classList.add('text-base');
		weatherRow.textContent = `Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}`
	}

	card.appendChild(opacitySliderDiv)
	card.appendChild(infoRow)
	card.appendChild(extraInfoRow)
	card.appendChild(ivsRow)
	if (weatherRow) {
		card.appendChild(weatherRow)
	}
	return card
}

function createWrapperDiv(divId) {
	const oldDiv = document.getElementById(divId)
	if (oldDiv) {
		wrapperDivPositions[divId].top = oldDiv.style.top;
		wrapperDivPositions[divId].left = oldDiv.style.left;
		oldDiv.remove();
	}
	const newDiv = divId === 'enemies' ? createEnemyDiv() : createAlliesDiv()
	enableDragElement(newDiv)
	newDiv.style.top = wrapperDivPositions[divId].top
	newDiv.style.left = wrapperDivPositions[divId].left
	newDiv.style.opacity = "" + (Number(wrapperDivPositions[divId].opacity) / 100)
	return newDiv;
}

function createCardsDiv(divId) {
	let newDiv = createWrapperDiv(divId)
	let buttonsDiv = createArrowButtonsDiv(divId)
  newDiv.appendChild(buttonsDiv)
  let pokemon = {}
  if (divId === 'enemies') {
  	if (currentEnemyPage >= enemiesPokemon.length) currentEnemyPage = enemiesPokemon.length - 1
  	pokemon = enemiesPokemon[currentEnemyPage]
  }
  else {
  	if (currentAllyPage >= alliesPokemon.length) currentAllyPage = alliesPokemon.length - 1
  	pokemon = alliesPokemon[currentAllyPage]
  }
  const pokemonCards = document.createElement("div");
  pokemonCards.className = "pokemon-cards"
	const card = createPokemonCardDiv(divId, pokemon)
	pokemonCards.appendChild(card);
	newDiv.appendChild(pokemonCards)
	document.body.appendChild(newDiv)
	return newDiv
}

function deleteWrapperDivs() {
	try {
		['allies', 'enemies'].forEach((divId) => {
			const div = document.getElementById(divId)
			wrapperDivPositions[divId].top = div.style.top
			wrapperDivPositions[divId].left = div.style.left
			document.body.removeChild(div)
		})
	} catch (e) {
		console.error(e)
	}
	
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Got message:", message, "from", sender, "current message:", document.getElementById('touchControls').getAttribute('data-ui-mode'))
	const uiMode = touchControlsElement.getAttribute('data-ui-mode')
	console.log("Current ui mode: ", uiMode)
	if (message.type === 'UPDATE_ENEMIES_DIV' || message.type === 'UPDATE_ALLIES_DIV') {
		slotId = message.slotId
		if ( uiMode === 'TITLE' || uiMode === 'SAVE_SLOT') return sendResponde({ success: true })
		let divId = message.type === 'UPDATE_ENEMIES_DIV' ? 'enemies' : 'allies'
		if (message.type === 'UPDATE_ENEMIES_DIV') {
			enemiesPokemon = message.pokemon
		}
		else {
			alliesPokemon = message.pokemon
		}
		weather = message.weather;
		if (weather.turnsLeft === 0) weather.turnsLeft = 'N/A'
		createCardsDiv(divId)
    sendResponse({ success: true });
	}
});

const touchControlsElement = document.getElementById('touchControls')
if (touchControlsElement) {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach(async (mutation) => {
			if (mutation.type === 'attributes' && mutation.attributeName === 'data-ui-mode') {
				const newValue = touchControlsElement.getAttribute('data-ui-mode');
				console.log('New data-ui-mode:', newValue);
				if(newValue === "MESSAGE" || newValue === "COMMAND" || newValue === "CONFIRM") {
					let currentSessionData = {}
					for (key in localStorage) {
						if ((slotId > 0 && key.includes(`sessionData${slotId}`)) || key.includes('sessionData')) {
							currentSessionData = localStorage.getItem(key)
							break
						}
					}
					currentSessionData = JSON.parse(CryptoJS.AES.decrypt(currentSessionData, saveKey).toString(CryptoJS.enc.Utf8))
					console.log("Got session data", currentSessionData, "for slot id", slotId)
					browserApi.runtime.sendMessage({ type: 'BG_GET_SAVEDATA', data: currentSessionData, slotId: slotId })
				}
				if(newValue === "SAVE_SLOT") {
					setTimeout(function() {
            for (key in localStorage) {
              if (key.includes('sessionData')) localStorage.removeItem(key)
            }
          }, 1000)
				}
				if(newValue === "SAVE_SLOT" || newValue === "TITLE" || newValue === "MODIFIER_SELECT" || newValue === "STARTER_SELECT") {
					deleteWrapperDivs()
				}
			}
		});
	});

	observer.observe(touchControlsElement, { attributes: true });
}