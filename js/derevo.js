images = document.getElementById("image_container")
images.style.display = "none"

flowers = ["zhasmin", "klen", "leshina", "lipa", "malina", "rabina", "siren"]
shuffle(flowers)

combinations = {
    zhasmin: new Audio("./sound/zhasmin.ogg"),
    klen: new Audio("./sound/klen.ogg"),
    leshina: new Audio("./sound/leshina.ogg"),
    lipa: new Audio("./sound/lipa.ogg"),
    malina: new Audio("./sound/malina.ogg"),
    rabina: new Audio("./sound/rabina.ogg"),
    siren: new Audio("./sound/siren.ogg"),
    rightChoose: new Audio("./sound/right.ogg"),
    wrongChoose: new Audio("./sound/wrong.ogg"),
    youWinFlower: new Audio("./sound/you_win_flower.ogg"),
    youWinTree: new Audio("./sound/you_win_tree.ogg"),
}
const introSound = document.getElementById("intro-sound");

i = 0
currentFlower = flowers[i++]
score = 0


function startGame() {
    introSound.play();
    document.getElementById("start-btn").remove();
    images.style.display = "grid";
    setTimeout(() => {
        combinations[currentFlower].play()
    }, 25000)
}

function chooseFlower(element, flowerName) {
    if (!checkAllPaused())
        return ;

    if (flowerName === currentFlower) {
        score++;
        combinations.rightChoose.play();
        element.className = "right_choose"
        currentFlower = flowers[i++]
        if (i < 8)
            setTimeout(() => {
                combinations[currentFlower].play()
            }, 2000)
        else
            setTimeout(() => {
                combinations.youWinTree.play()
                setTimeout(() => {
                    window.location.href = './win.html';
                }, 14000)
            }, 2000)
    }
    else {
        combinations.wrongChoose.play();
        setTimeout(() => {
            combinations[currentFlower].play()
        }, 3000)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


function checkAllPaused(){
    Object.keys(combinations).forEach((key) => {
        if (!combinations[key].paused)
            return false;
    })
    if (!introSound.paused)
        return false;
    return true;
}

function areSoundsLoaded() {
  for (let key in combinations) {
    if (!combinations[key].readyState || combinations[key].readyState < 3) {
      return false;
    }
  }
  return true;
}

const contentDiv = document.getElementById("content");
// Проверяем, загружены ли звуки
function checkSoundsLoaded() {
  if (areSoundsLoaded()) {
    // Если все звуки загружены, отображаем содержимое страницы
    contentDiv.style.display = "block";
  } else {
    // Если не все звуки загружены, проверяем снова через небольшой интервал
    setTimeout(checkSoundsLoaded, 100);
  }
}

// Проверяем загрузку звуков при загрузке страницы
window.addEventListener("load", checkSoundsLoaded);
