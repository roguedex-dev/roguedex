function _createPokemonCardDiv(cardclass, cardId, pokemon) {
  let opacityRangeMin = 10;
  let opacityRangeMax = 100;
  let pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  
	const opacitySlider = _createOpacitySliderDiv(cardId, _wrapperDivPositions[cardId].opacity, opacityRangeMin, opacityRangeMax)
	const typeEffectivenessHTML = _createTypeEffectivenessWrapper(pokemon.typeEffectiveness)

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
	      	<div class="tooltip ${pokemon.ability.isHidden ? 'hidden-ability' : ''}">
	        	Ability: ${pokemon.ability.name} 
	        	${_createTooltipDiv(pokemon.ability.description)}
	        </div>
	        &nbsp-&nbsp 
	        <div class = "tooltip">
	        	Nature: ${pokemon.nature.name}
	        	${_createTooltipDiv(pokemon.nature.description)}
	        </div>
	      </div>
	      <div class="text-base">
	        HP: ${pokemon.ivs[Stat["HP"]]}, ATK: ${pokemon.ivs[Stat["ATK"]]}, DEF: ${pokemon.ivs[Stat["DEF"]]}
	      </div>
	      <div class="text-base">
	        SPE: ${pokemon.ivs[Stat["SPD"]]}, SPD: ${pokemon.ivs[Stat["SPDEF"]]}, SPA: ${pokemon.ivs[Stat["SPATK"]]}
	      </div>
	        
	      ${(_weather.type && _weather.turnsLeft) ? 
	        `<div class="text-base">_weather: ${_weather.type}, Turns Left: ${_weather.turnsLeft}</div>` 
	      : ''}
	    </div>
    </div>
  `

  const cardObj = {}
  cardObj.html = cardHTML;
  cardObj.slider = opacitySlider.id;

  return cardObj
}

// Current values: weaknesses, resistances, immunities
function _createTypeEffectivenessWrapper(typeEffectivenesses) {
	let typesHTML = `
		${Object.keys(typeEffectivenesses).map((effectiveness) => {
			if (typeEffectivenesses[effectiveness].length === 0) return ''
			const tooltipMap = {
			  weaknesses: "Weak to",
			  resistances: "Resists",
			  immunities: "Immune to"
			};
			return `
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
	          ${_createTooltipDiv(tooltipMap[effectiveness] || "")}
	      </div>
	  `}).join('')}
  `

  return typesHTML
}

function _createOpacitySliderDiv(divId, initialValue = "100", min = "10", max = "100") {
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

function _updateWrapperDivPositions(oldDiv, divId) {
	_wrapperDivPositions[divId].top = oldDiv.style.top;
	_wrapperDivPositions[divId].left = oldDiv.style.left;
}

function _createWrapperDiv(divId) {
	const oldDiv = document.getElementById(divId)
	if (oldDiv) {
		_updateWrapperDivPositions(oldDiv, divId)
		oldDiv.remove();
	}
	const newDiv = divId === 'enemies' ? _createEnemyDiv() : _createAlliesDiv()
	_enableDragElement(newDiv)
	newDiv.style.top = _wrapperDivPositions[divId].top
	newDiv.style.left = _wrapperDivPositions[divId].left
	newDiv.style.opacity = "" + (Number(_wrapperDivPositions[divId].opacity) / 100)
	return newDiv;
}

function _createArrowButtonsDiv(divId, upString, downString) {
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

function _createTooltipDiv(tip) {
	const tooltipHtml = `
		<div class="text-base tooltiptext">${tip}</div>
	`
	return tooltipHtml
}

function _createEnemyDiv() {
	const divId = "enemies"
	const div = document.createElement("div")
	div.className = `${divId}-team`
	div.id = divId
	_enableDragElement(div)
	document.body.appendChild(div)
	return div
}

function _createAlliesDiv() {
	const divId = "allies"
	const div = document.createElement("div")
	div.className = `${divId}-team`
	div.id = divId
	_enableDragElement(div)
	document.body.appendChild(div)
	return div
}

function _updatePokemonArray(oldParty, newParty) {
	if (!_.isEqual(oldParty, newParty)) {
		oldParty = newParty
	}
}

let _wrapperDivPositions = {
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

let _currentEnemyPage = 0;
let _currentAllyPage = 0;
let _enemiesPokemon = [];
let _alliesPokemon = [];
let _weather = {};

class HttpUtils {

	static updateFromMessage(message) {
		if (message.type === 'UPDATE_ENEMIES_DIV') {
			if (!_.isEqual(_enemiesPokemon, message.pokemon)) {
				_enemiesPokemon = message.pokemon
			}
		}
		else {
			if (!_.isEqual(_alliesPokemon, message.pokemon)) {
				_alliesPokemon = message.pokemon
			}
		}
		_weather = message.weather;
		if (_weather.turnsLeft === 0) _weather.turnsLeft = 'N/A'
	}

	static createTopBannerDiv() {
		const div = document.createElement('div')
		div.textContent = 'RogueDex is running!'
		div.classList.add('text-base')
		div.classList.add('running-status')
		document.body.insertBefore(div, document.body.firstChild)
	}

	static createCardsDiv(divId) {
	  let newDiv = _createWrapperDiv(divId)
	  let pokemon = {}
	  if (divId === 'enemies') {
	  	if (_currentEnemyPage >= _enemiesPokemon.length) _currentEnemyPage = 0
	  	pokemon = _enemiesPokemon[_currentEnemyPage]
	  }
	  else {
	  	if (_currentAllyPage >= _alliesPokemon.length) _currentAllyPage = 0
	  	pokemon = _alliesPokemon[_currentAllyPage]
	  }	

	  let divClass = `${divId}-team`

		const cardObj = _createPokemonCardDiv(divClass, divId, pokemon)
		const buttonsObj = _createArrowButtonsDiv(divId, "↑", "↓")

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
		document.getElementById(cardObj.slider).addEventListener('input', _changeOpacity)
		document.getElementById(buttonsObj.idUp).addEventListener('click', _changePage)
		document.getElementById(buttonsObj.idDown).addEventListener('click', _changePage)

		return newDiv
	}

	static createWrapperDivs() {
		try {
			['allies', 'enemies'].forEach((divId) => {
				const div = document.createElement("div")
				div.className = `${divId}-team`
				div.id = divId
				_enableDragElement(div)
				document.body.appendChild(div)
			})
		} catch (e) {
			console.error("Error while creating wrapper divs: ", e)
		}
	}

	static deleteWrapperDivs() {
		try {
			['allies', 'enemies'].forEach((divId) => {
				const div = document.getElementById(divId)
				if (div === null) return
				_updateWrapperDivPositions(div, divId)
				document.body.removeChild(div)
			})
		} catch (e) {
			console.error("Error while deleting wrapper divs: ", e)
		}
	}
}