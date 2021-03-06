const body = document.querySelector("body");

const IMG_NUM = 3;

function paintImg(imgNum) {
  const image = new Image();
  image.src = `img/${imgNum + 1}.jpg`;
  image.classList.add("bgImg");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImg(randomNumber);
}

init();
