function createDiv() {
	const mainDiv = document.createElement('div');
	mainDiv.style.position = 'fixed';
	mainDiv.style.backgroundColor = 'white';
	mainDiv.style.padding = '20px';
	mainDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
	mainDiv.style.zIndex = '9999';
	mainDiv.style.width = '500px';
	mainDiv.style.fontFamily = 'Arial, sans-serif';
	mainDiv.style.height = 'fit-content';

	// Create the table header row
	const headerRow = document.createElement('div');
	headerRow.style.display = 'grid';
	headerRow.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
	headerRow.style.fontWeight = 'bold';
	headerRow.style.marginBottom = '10px';
	headerRow.id = 'headerDiv';

	const pokemonHeader = document.createElement('div');
	pokemonHeader.textContent = 'Pokemon';
	headerRow.appendChild(pokemonHeader);

	const weaknessHeader = document.createElement('div');
	weaknessHeader.textContent = 'Weakness';
	headerRow.appendChild(weaknessHeader);

	const resistanceHeader = document.createElement('div');
	resistanceHeader.textContent = 'Resistance';
	headerRow.appendChild(resistanceHeader);

	const immunityHeader = document.createElement('div');
	immunityHeader.textContent = 'Immunity';
	headerRow.appendChild(immunityHeader);

	mainDiv.appendChild(headerRow);
	return mainDiv
}

function createEnemyDiv() {
	const enemiesDiv = createDiv();
	enemiesDiv.id = 'enemiesDiv';
	enemiesDiv.style.top = '10px';
	enemiesDiv.style.left = '10px';
	return enemiesDiv
}

function createAlliesDiv() {
	const alliesDiv = createDiv();
	alliesDiv.id = 'alliesDiv';
	alliesDiv.style.bottom = '10px';
	alliesDiv.style.right = '10px';
	return alliesDiv
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("headerDiv")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("headerDiv").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

const enemiesDiv = createEnemyDiv()
const alliesDiv = createAlliesDiv()
dragElement(enemiesDiv);
dragElement(alliesDiv);

document.body.appendChild(enemiesDiv);
document.body.appendChild(alliesDiv);

browser.runtime.sendMessage({ type: 'RESET_VARIABLES' }, function(response) {
  if (response && response.success) {
    console.log('Variables reset successfully');
  } else {
    console.error('Failed to reset variables');
  }
});

function createPokemonRow(pokemon) {
	const row = document.createElement('div');
	row.style.display = 'grid';
	row.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr';
	row.style.marginBottom = '10px';
	row.style.textAlign = 'center';
	row.id = pokemon.id;

	const iconDiv = document.createElement('div');
	const icon = document.createElement('img');
	icon.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"
	iconDiv.appendChild(icon);
	row.appendChild(iconDiv);

	const weaknessesDiv = document.createElement('div');
	weaknessesDiv.textContent = Array.from(pokemon.info.weaknesses).join(' ');
	weaknessesDiv.style.paddingLeft = "40px";
	row.appendChild(weaknessesDiv);

	const resistancesDiv = document.createElement('div');
	resistancesDiv.textContent = Array.from(pokemon.info.resistances).join(' ');
	resistancesDiv.style.paddingLeft = "80px";
	row.appendChild(resistancesDiv);

	const immunitiesDiv = document.createElement('div');
	immunitiesDiv.textContent = Array.from(pokemon.info.immunities).join(' ');
	immunitiesDiv.style.paddingLeft = "120px";
	row.appendChild(immunitiesDiv);

	return row
}

function appendPokemonToDiv(pokemon, div) {
	let pokemonRow = div.querySelector('[id="' + pokemon.id + '"]')
	if (pokemonRow) return
	console.log("Appending pokemon to div")
	pokemonRow = createPokemonRow(pokemon)
	div.appendChild(pokemonRow)
	dragElement(div)
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Got message:", message, "from", sender)
  if (message.type === 'UPDATE_ENEMIES_DIV') {
  	console.log("Removing DIV")
  	document.getElementById('enemiesDiv').remove()
  	let newEnemiesDiv = createEnemyDiv()
  	dragElement(newEnemiesDiv)
  	document.body.appendChild(newEnemiesDiv)
  	console.log("Appended", newEnemiesDiv)
    message.pokemon.forEach((pokemon) => {
    	console.log("Received: ", pokemon)
  		appendPokemonToDiv(pokemon, newEnemiesDiv)
    })
    sendResponse({ success: true });
  } else if (message.type === 'UPDATE_ALLIES_DIV') {
  	message.myPokemon.forEach((pokemon) => {
  		console.log("Received: ", pokemon)
  		appendPokemonToDiv(pokemon, alliesDiv)
  	})
  	sendResponse({ success: true });
  }
});