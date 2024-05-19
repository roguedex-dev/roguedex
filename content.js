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

let currentEnemyPage = 0;
let currentAllyPage = 0;
let enemiesPokemon = [];
let alliesPokemon = [];
let weather = {};

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

function createArrowButtonsDiv(divId, upString, downString) {
	let result = {};
	result.idUp = `${divId}-up`
	result.idDown = `${divId}-down`

	result.html = `
		<div class="arrow-button-wrapper">
			<button class="text-base arrow-button" id="${result.idUp}">${upString}</button>
			<button class="text-base arrow-button" id="${result.idDown}">${downString}</button>
		</div>
	`

	return result
}

function createOpacitySliderDiv(divId, initialValue = "100", min = "10", max = "100") {
	let result = {};
	result.id = `${divId}-slider`

	result.html = `
  		<div class="slider-wrapper">
  			<div class="text-base">Opacity:</div>
  			<input type="range" min="${min}" max="${max}" value="${initialValue}" id="${result.id}">
  		</div>
  	`
	return result
}

// Current values: weaknesses, resistances, immunities
function createTypeEffectivenessWrapper(typeEffectivenesses) {
	let typesHTML = `
		${Object.keys(typeEffectivenesses).map((effectiveness) => `
	      <div class="pokemon-${effectiveness} tooltip">

	          ${typeEffectivenesses[effectiveness].map((type, counter) => `
	              ${/* The current html structure requires to wrap every third element in a div, the implementation here gets a bit ugly. */''}
	              ${ ((counter + 1) % 3 === 1)  ? 
	                `<div>` 
	              : ''}

	              <div class="type-icon" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${Types[type]}.png')"></div>
	              
	              ${/* Closing div, after every third element or when the arrays max length is reached. */''}
	              ${ ((counter + 1) % 3 === 0) || ((counter + 1) === typeEffectivenesses[effectiveness].length) ? 
	                `</div>` 
	              : ''}
	          `).join('')}

	      </div>
	  `).join('')}
  `

  return typesHTML
}

function createPokemonCardDiv(cardclass, cardId, pokemon) {
  let opacityRangeMin = 10;
  let opacityRangeMax = 100;
  let pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  
	const opacitySlider = createOpacitySliderDiv(cardId, wrapperDivPositions[cardId].opacity, opacityRangeMin, opacityRangeMax)
	const typeEffectivenessHTML = createTypeEffectivenessWrapper(pokemon.typeEffectiveness)

  let cardHTML = `
  	<div class="pokemon-cards">
	    <div class="pokemon-card">
	      ${opacitySlider.html}
	      <div style="display: flex;">
	        <div class="pokemon-icon">
	            <img src="${pokemonImageUrl}">
	        </div>

					${/* Displays the 3 type effectiveness segemtns (weaknesses, resistances, immunities). */''}
	        ${typeEffectivenessHTML}
	        
	      </div>

	      <div class="text-base">
	        Ability: ${pokemon.ability} - Nature: ${pokemon.nature}
	      </div>
	      <div class="text-base">
	        HP: ${pokemon.ivs[Stat["HP"]]}, ATK: ${pokemon.ivs[Stat["ATK"]]}, DEF: ${pokemon.ivs[Stat["DEF"]]}
	      </div>
	      <div class="text-base">
	        SPE: ${pokemon.ivs[Stat["SPD"]]}, SPD: ${pokemon.ivs[Stat["SPDEF"]]}, SPA: ${pokemon.ivs[Stat["SPATK"]]}
	      </div>
	        
	      ${(weather.type && weather.turnsLeft) ? 
	        `<div class="text-base">Weather: ${weather.type}, Turns Left: ${weather.turnsLeft}</div>` 
	      : ''}
	    </div>
    </div>
  `

  const cardObj = {}
  cardObj.html = cardHTML;
  cardObj.slider = opacitySlider.id;

  return cardObj
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

  let pokemon = {}
  if (divId === 'enemies') {
  	if (currentEnemyPage >= enemiesPokemon.length) currentEnemyPage = enemiesPokemon.length - 1
  	pokemon = enemiesPokemon[currentEnemyPage]
  }
  else {
  	if (currentAllyPage >= alliesPokemon.length) currentAllyPage = alliesPokemon.length - 1
  	pokemon = alliesPokemon[currentAllyPage]
  }	

  let divClass = divId === 'enemies' ? 'enemy-team' : 'allies-team'

	const cardObj = createPokemonCardDiv(divClass, divId, pokemon)
	const buttonsObj = createArrowButtonsDiv(divId, "↑", "↓")

	/*
		Assemble the wrapper DIVs inner html.
	*/
	const cardsHTML = `
  	${buttonsObj.html}
  	${cardObj.html}
  `

  /*
		Insert the parsed nodes into the DOM tree just inside the element, before its first child.
		"newDiv.innerHTML = cardsHTML" also works instead of using ".insertAdjacentHTML()"
  */
	newDiv.insertAdjacentHTML("afterbegin", cardsHTML)
	document.body.appendChild(newDiv)

	/*
		Add event listeners after all elements are properly added to the DOM and initialized.
	*/
	document.getElementById(cardObj.slider).addEventListener('input', changeOpacity)
	document.getElementById(buttonsObj.idUp).addEventListener('click', changePage)
	document.getElementById(buttonsObj.idDown).addEventListener('click', changePage)

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
		if ( uiMode === 'TITLE' || uiMode === 'SAVE_SLOT') return sendResponse({ success: true })
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