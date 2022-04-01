const body = document.getElementsByTagName("body")[0];

const externalCircle = document.createElement("div");
externalCircle.setAttribute("id", "external-circle");
body.appendChild(externalCircle);
externalCircle.innerHTML = `
<button id="top-left"></button>
<button id="top-right"></button>
<button id="bottom-left"></button>
<button id="bottom-right"></button>
<div id="internal-circle"></div>
`;

const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomLeft = document.getElementById("bottom-left");
const bottomRight = document.getElementById("bottom-right");
const internalCircle = document.getElementById("internal-circle");
let compOrder = [];
let playerOrder = [];
let flash = 0;
let turn = 1;
let interval;

function initialScreen() {
  internalCircle.innerHTML = `
    <div id="genius">GENIUS</div>
    <button id="button-play">Jogar</button>`;
  const buttonPlay = document.getElementById("button-play");
  buttonPlay.addEventListener("click", play);
}

initialScreen();

function play() {
  externalCircle.removeAttribute("class", "scale-up-center");
  compOrder = [];
  playerOrder = [];
  flash = 0;
  turn = 1;
  internalCircle.innerHTML = `<div id="prepare">Prepare-se e boa sorte!</div>`;
  for (let counter = 1; counter <= 10; counter++) {
    compOrder.push(Math.floor(Math.random() * 4) + 1);
  }
  interval = setInterval(compTurn, 850);
  setTimeout(() => {
    clearColor();
  }, 400);
}

function compTurn() {
  if (flash == turn) {
    internalCircle.innerHTML = `<div class="yourTurn">Sua vez!</div>
    <div class="yourTurn"> Repita a sequência na ordem correta!</div>`;
    clearInterval(interval);
    clearColor();
  } else {
    internalCircle.innerHTML = `<div id="attention">Preste atenção na sequência!</div>`;
    clearColor();
    setTimeout(() => {
      if (compOrder[flash] == 1) {
        one();
      }
      if (compOrder[flash] == 2) {
        two();
      }
      if (compOrder[flash] == 3) {
        three();
      }
      if (compOrder[flash] == 4) {
        four();
      }
      flash++;
    }, 200);
  }
}

topLeft.addEventListener("click", (event) => {
  one();
  playerOrder.push(1);
  check();
  setTimeout(() => {
    clearColor();
  }, 300);
});

topRight.addEventListener("click", (event) => {
  two();
  playerOrder.push(2);
  check();
  setTimeout(() => {
    clearColor();
  }, 300);
});

bottomRight.addEventListener("click", (event) => {
  three();
  playerOrder.push(3);
  check();
  setTimeout(() => {
    clearColor();
  }, 300);
});

bottomLeft.addEventListener("click", (event) => {
  four();
  playerOrder.push(4);
  check();
  setTimeout(() => {
    clearColor();
  }, 300);
});

function check() {
  if (
    playerOrder[playerOrder.length - 1] == compOrder[playerOrder.length - 1] &&
    turn == playerOrder.length &&
    playerOrder.length !== 10
  ) {
    right();
  } else if (
    playerOrder[playerOrder.length - 1] == compOrder[playerOrder.length - 1] &&
    playerOrder.length == 10
  ) {
    win();
  } else if (
    playerOrder[playerOrder.length - 1] !== compOrder[playerOrder.length - 1]
  ) {
    wrong();
  }
}

function one() {
  topLeft.style.backgroundColor = "#00FF00";
}

function two() {
  topRight.style.backgroundColor = "#FF0000";
}

function three() {
  bottomRight.style.backgroundColor = "#87CEFA";
}

function four() {
  bottomLeft.style.backgroundColor = "#FFFF00";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomRight.style.backgroundColor = "darkblue";
  bottomLeft.style.backgroundColor = "goldenrod";
}

function allColors() {
  topLeft.style.backgroundColor = "#00FF00";
  topRight.style.backgroundColor = "#FF0000";
  bottomRight.style.backgroundColor = "#87CEFA";
  bottomLeft.style.backgroundColor = "#FFFF00";
}

function win() {
  allColors();
  internalCircle.innerHTML = `<div id="win">Parabéns, você ganhou!</div>
    <button id="button-playAgain">Jogar novamente</button>`;
  const buttonPlayAgain = document.getElementById("button-playAgain");
  buttonPlayAgain.addEventListener("click", initialScreen);
}

function wrong() {
  allColors();
  internalCircle.innerHTML = `<div id="wrong-seq">Sequência incorreta!</div>
      <div id="current-score">Sua pontuação: ${turn - 1}</div>
      <div id="highest-score">Maior pontuação: ${turn - 1}</div>
      <button id="button-playAgain">Jogar novamente</button>`;
  const buttonPlayAgain = document.getElementById("button-playAgain");
  setTimeout(() => {
    clearColor();
  }, 1000);
  buttonPlayAgain.addEventListener("click", initialScreen);
}

function right() {
  internalCircle.innerHTML = `<div class="right-seq">Isso aí, você acertou!</div>
        <div class="right-seq">Aguarde a próxima sequência.</div>`;
  turn++;
  playerOrder = [];
  flash = 0;
  interval = setInterval(compTurn, 850);
}
