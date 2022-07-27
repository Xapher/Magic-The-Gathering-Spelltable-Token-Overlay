var protectedDragged = new Array();
var dragged = new Array();
function addToDrag(id) {
	protectedDragged.push(id);
	setTimeout(moveFromProtected, 200);
}

function clearDragged() {
	while(dragged.length > 0) {
		dragged.pop();
	}
}

function changeCoords(event) {
  var x = event.clientX;
  var y = event.clientY;
  var coords = "X coords: " + x + ", Y coords: " + y;
  if(x != 0 && y != 0) {
  	for (var i = 0; i < dragged.length; i++) {
  		document.getElementById(dragged[i]).style = "margin-left:" + x + "px;margin-top:" + y + "px;";
  	}
  	for (var i = 0; i < protectedDragged.length; i++) {
  		document.getElementById(protectedDragged[i]).style = "margin-left:" + x + "px;margin-top:" + y + "px;";
  	}
  }
}





function moveFromProtected() {
	dragged.push(protectedDragged.pop());
}


var tempSelector;
var tempCount = 0;
var toDisplay = new Array();
function searchTokens(tokenName, selectionContainer, cardId) {
  if(tokenName.value.toLowerCase().includes("delete")) {
    document.getElementById(selectionContainer).parentElement.innerHTML = "";
  }
  else {
    displaySelection(selectionContainer);
    tempCount = 0;
    toDisplay = new Array();
    for (var i = 0; i < tokens.length; i++) {
      if(tokens[i].toLowerCase().includes(tokenName.value.toLowerCase())) {
        toDisplay.push(tokens[i]);
      }
      if(toDisplay.length == 8) {
        break;
      }
    }

    tempSelector = document.getElementById(selectionContainer);
    for (var i = 1; i < tempSelector.childNodes.length; i=i+2) {
      if(i < tempSelector.childNodes.length) {
        if(tempCount + 1 > toDisplay.length) {
            tempSelector.childNodes[i].style.display = "none";
        }
        else {
          //selectionContainer.childNodes[i]
          tempSelector.childNodes[i].style.display = "inline-block";
          tempSelector.childNodes[i].childNodes[1].src = "Assets/Tokens/" + String.raw`${toDisplay[tempCount]}`;
          tempSelector.childNodes[i].setAttribute('onclick','changeToken(\"' + cardId + '\",\"' + toDisplay[tempCount] + '\")');
        }
        tempCount++;
      }
    }
  }
}


function displaySelection(id) {
  document.getElementById(id).style.display = "inline-block";
}

var allSelections;
function hideSelection() {
  allSelections = document.getElementsByClassName("tokenSelection");
  for (var i = 0; i < allSelections.length; i++) {
    allSelections[i].style.display = "none";
  }
}

function changeToken(id, newToken) {
  console.log(document.getElementById(id));
  document.getElementById(id).src = 'Assets/Tokens/' + newToken;
  hideSelection();
}

function changeCount(caller, selectionContainer, id) { 
  if(caller.value ==  "0") {
  	document.getElementById(selectionContainer).parentElement.innerHTML = "";
  }
  document.getElementById(id).innerHTML = caller.value;
}


var tokenCount = 1;

var cardHtml;

window.onload = onStart;

function onStart() {
  //setup cardHtml
  cardHtml = document.getElementById('cardCBase').cloneNode(true);
}

var newHtml;

function setupNewToken() {
  //get cardContainer id and make it unique
  //get token image id and make it unique
  //get token selector id and make it unique
  //make all onclicks
  newHtml = cardHtml.cloneNode(true);
  newHtml.id = "cardContainer" + tokenCount;
  newHtml.style.display = "inline-block";
  newHtml.getElementsByClassName('cardButton')[0].setAttribute('onclick',"addToDrag('cardContainer" + tokenCount + "')");

  newHtml.getElementsByClassName('tokenSelection')[0].id="token" + tokenCount + "selector";
  //onchange
  newHtml.childNodes[3].setAttribute('onkeyup',"searchTokens(this,'token" + tokenCount + "selector', 'cardView" + tokenCount + "')");
  newHtml.childNodes[7].childNodes[1].id = "cardView" + tokenCount;
  newHtml.childNodes[7].childNodes[3].id = "tokenCount" + tokenCount;
  newHtml.childNodes[5].setAttribute('onkeyup',"changeCount(this, 'token" + tokenCount + "selector', 'tokenCount" + tokenCount + "')");
}

function addToken() {
  setupNewToken();
  document.body.innerHTML = document.body.innerHTML + newHtml.outerHTML;
  tokenCount++;
}


var cards;
function changeCardSize(slider) {
  cards = document.getElementsByClassName('cardContainer');
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.maxWidth = slider.value + "px";
    cards[i].style.minWidth = slider.value + "px";
  }
}

function tap(element) {
  if(element.parentElement.childNodes[1].getAttribute('class').includes("tapped")) {
    element.parentElement.childNodes[1].setAttribute('class',"card");
  }
  else {
    element.parentElement.childNodes[1].setAttribute('class',"card tapped");
  }
}



var cardContainers;
var i = 0;
function hideTokens() {
  cardContainers = document.getElementsByClassName("cardContainer");
  console.log(cardContainers.length);

  while(i < cardContainers.length) {
    console.log(i);
    cardContainers[i].setAttribute('class',"card tapped");
    i++;
  }
}

function unhideTokens() {
  cardContainers = document.getElementsByClassName("cardContainer");
  for (var i = 0; i < cardContainers.length; i++) {
    cardContainers[i].className = 'cardContainer';
  }}