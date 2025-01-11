function _changeOpacity(e) {
	const divId = e.target.id.split("-")[0]
	const div = document.getElementById(divId)
	_wrapperDivPositions[divId].opacity = e.target.value
	div.style.opacity = `${e.target.value / 100}`
}

function _changePage(click) {
	const buttonId = click.target.id
	const divId = buttonId.split("-")[0]
	const direction = buttonId.split("-")[1]
	if (direction === 'up') {
		if (divId === 'enemies') {
			if (_currentEnemyPage > 0) {
				_currentEnemyPage -= 1
			} else {
				_currentEnemyPage = _enemiesPokemon.length - 1
			}
		} else if (divId === 'allies') {
			if (_currentAllyPage > 0) {
				_currentAllyPage -= 1
			} else {
				_currentAllyPage = _alliesPokemon.length - 1
			}
		}		
	} else if (direction === 'down') {
		if (divId === 'enemies') {
			if ((_currentEnemyPage + 1) < _enemiesPokemon.length) {
				_currentEnemyPage += 1
			} else {
				_currentEnemyPage = 0
			}
		} else if (divId === 'allies') {
			if ((_currentAllyPage + 1) < _alliesPokemon.length) {
				_currentAllyPage += 1
			} else {
				_currentAllyPage = 0
			}
		}
	}
	HttpUtils.createCardsDiv(divId)

}
/**
 * Function to save the positions of the enemy and ally teams to localStorage
 */
function _savePositions() {  
  console.log("Saving positions to localStorage");
  // Get the enemy and ally divs
  const enemiesDiv = document.getElementById('enemies');
  const alliesDiv = document.getElementById('allies');
  
  // Get the position coordinates of enemy and ally teams
  const enemiesPosition = {
    top: enemiesDiv.style.top,
    left: enemiesDiv.style.left
  };
  const alliesPosition = {
    top: alliesDiv.style.top,
    left: alliesDiv.style.left
  };
  
  // Save the coordinates to localStorage
  localStorage.setItem('enemiesPosition', JSON.stringify(enemiesPosition));
  localStorage.setItem('alliesPosition', JSON.stringify(alliesPosition));
}
  
  
/**
 * Function to load the positions of the enemy and ally teams from localStorage
 */
function _loadPositions() {
  console.log("Loading positions from localStorage");
  // Get the saved coordinates from localStorage
  const enemiesPosition = JSON.parse(localStorage.getItem('enemiesPosition'));
  const alliesPosition = JSON.parse(localStorage.getItem('alliesPosition'));

  // Get the enemy and ally divs
  const enemiesDiv = document.getElementById('enemies');
  const alliesDiv = document.getElementById('allies');

  // Check if positions are available in localStorage
  if (enemiesPosition) {
    
    // ensure that the elements are actually visible (i.e. in the viewport)
    const allyTop = parseInt(alliesPosition.top.replace("px", ""))
    const allyLeft = parseInt(alliesPosition.left.replace("px", ""))
    const enemyTop = parseInt(enemiesPosition.top.replace("px", ""))
    const enemyLeft = parseInt(enemiesPosition.left.replace("px", ""))
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    // if there are invalid positions, reset them by unsetting the localStorage and re-calling this function
    if (
      allyTop > windowHeight || 
      allyLeft > windowWidth ||
      enemyTop > windowHeight || 
      enemyLeft > windowWidth
    ){ 
      localStorage.removeItem('alliesPosition');
      localStorage.removeItem('enemiesPosition');
      _loadPositions();
      return;
    }    

    // Set the enemy team position based on the last saved position
    enemiesDiv.style.top = enemiesPosition.top || "0px";
    enemiesDiv.style.left = enemiesPosition.left || "0px";
  } else {
    // If there is no saved position for enemies, set them to "0px"
    enemiesDiv.style.top = "0px";
    enemiesDiv.style.left = "0px";
  }
  
  if (alliesPosition) {
    // Set ally team position based on the last saved position
    alliesDiv.style.top = alliesPosition.top || "0px";
    alliesDiv.style.left = alliesPosition.left || "0px";
  } else {
    // If there is no saved position for allies, position them below enemies
    const enemyHeight = enemiesDiv.offsetHeight || 0;
    alliesDiv.style.top = `${enemyHeight}px`;
    alliesDiv.style.left = "0px";
  }
}

let isDragging = false;

// Enables drag-and-drop functionality on an element
function _enableDragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const dragStartElement = elmnt;

  // Attach the mousedown event handler
  dragStartElement.onpointerdown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    if (e.target.type === 'submit' || e.target.type === 'range') return
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = stopDragging;
    document.onpointermove = dragElement;
    isDragging = true;
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
    document.onpointerup = null;
    document.onpointermove = null;
    isDragging = false;
    _savePositions();
  }
}