import DotaHeroes from "./DotaHeroes.js"
let mainBackground = document.querySelector(".background")
let changeBackground = document.querySelector(".change")
let prevCount = 0

// Generate Random Background Image 

let backgroundImages = ["kunkka.jpg", "es.jpg", "dr.jpg", "lina.jpg", "nyx.jpg", "pudge.jpg", 
"rubick.jpg", "ss.jpg", "wr.jpg"]

function animateButton(){
    changeBackground.classList.toggle("translate")
}

function generateRandomNumber(){
    let randomGenerator = Math.floor(Math.random() * backgroundImages.length)
    return randomGenerator
}

changeBackground.addEventListener("click", function(){
    let randomNumber = generateRandomNumber()
    if (randomNumber === prevCount){
        if (randomNumber === 0){
            randomNumber += 1
        }
        else{
            randomNumber -= 1
        }
    }
    mainBackground.style.background = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('background-images/${backgroundImages[randomNumber]}')`
    mainBackground.style.backgroundSize = "cover";
    mainBackground.style.backgroundPosition = "center";
    prevCount = randomNumber
    animateButton()
})

// Generate Random Blank Letters 

let wordGuess = document.querySelector(".word-guess")

function randomHero(data){
    return Math.floor(Math.random() * data.length)
}

let level = document.querySelector(".level")
let gamelevel = 1;

let localHero = ""
let hero = ""
let allDotaHeroes

function getDotaHero(DotaHeroes){
    localHero = DotaHeroes[randomHero(DotaHeroes)]
    hero = localHero.alt_name.replaceAll("-", " ")
}

getDotaHero(DotaHeroes)

function resetAllHeroes(){
    allDotaHeroes = DotaHeroes.map(item => {
    return item
})}

resetAllHeroes()

function removeDefeatedHero(){
    allDotaHeroes.splice(allDotaHeroes.indexOf(localHero), 1)
}

let heroArray = []

function getHero(){
    for(let i = 0; i < hero.length; i++){
        if(hero[i] === " "){
            heroArray.push("!")
        }
        else{
            heroArray.push("_")
        }
    } 
}

getHero()

let heroGuess = heroArray.map(item => {
    if(item === "!"){
        return `<h1 class = "nextLine"></h1>`
    } else{
        return `<h1>${item}</h1>`
    }
})

// Display Hero

let hints = document.querySelector(".hints")
let audio = new Audio("")
let heroIcon = document.querySelector(".hero-icon")
let iconSound = document.querySelector(".hero-sound")
let hitPoints = document.querySelector(".hitpoints")


function addPicandSound(){
    hints.innerHTML = `
    <img src="hero-pic/${localHero.localized_name}.png" alt="Hero-Picture" class = "hero-icon">
    <img src="icon-sound.png" alt="sound-icon" class = "hero-sound">
    `
    audio = new Audio(`hero-sounds/${localHero.localized_name}.mp3.mpeg`)
    heroIcon = document.querySelector(".hero-icon")
    iconSound = document.querySelector(".hero-sound")
    iconSound.addEventListener("click", function(){
        audio.play()
    })

    heroIcon.addEventListener("click", function(){
        audio.play()
    })
}

function displayHero(){
    wordGuess.innerHTML = `${heroGuess.join("")}`
    addPicandSound()
}
    
displayHero()

let guessHero = hero.toUpperCase()

// Keyboard Function

let keysList = []

let keys = document.querySelectorAll(".key")

let title = document.querySelector(".title")
let lifePercentage = 100
let currentLife = 8
let lifeTotal = document.querySelector(".lifetotal")
let healthBar = document.querySelector(".healthbar")
let trivia = document.querySelector(".trivia")

let header = document.querySelector(".header")
let defeat = document.createElement("img")
defeat.classList.add("defeat")
defeat.src = "Defeat.gif"

let playAgain = document.createElement("button")
playAgain.classList.add("playAgain")
playAgain.textContent = "Play Again"

function addKeys(){
    for(let i = 0; i < keys.length; i++){
        keys[i].addEventListener("click", testing.bind(null, i))
    }
}

function testing(i, e){
    let test = [...guessHero.matchAll(keys[i].textContent)]
    let indexes = test.map(match => match.index)
    if(guessHero.includes(keys[i].textContent)){
        guessedLetter(indexes)
        keys[i].classList.add("correctLetter")
        if(!heroArray.includes("_")){
            getMeme(generateMemeNumber())
            displayWinningScreen()
            wordGuess.innerHTML = `
            ${hero}
            `
            removeDefeatedHero()
            if(allDotaHeroes.length === 0){
                mainBackground.innerHTML = `<h1 class = "finishGame">You Win the Game!</h1>`
                enableAllKeys()
                disableallKeys()
            }
         }
    } else if(!guessHero.includes(keys[i].textContent)){
        disableButton(e)
        keys[i].classList.add("incorrectLetter")
        decreaseLife()
    }
}

addKeys()

function guessedLetter(indexes){
    for(let i = 0; i < indexes.length; i++){
        heroArray[indexes[i]] = guessHero[indexes[i]]
    }
    let guessingLetter = heroArray.map(item => {
        if(item === "!"){
            return `<h1 class = "nextLine"></h1>`
        } else if (item === "_"){
            return "<h1>_</h1>"
        } else{
            return `<h1>${item}</h1>`
        }
    })
    wordGuess.innerHTML = `${guessingLetter.join("")}`
}

function decreaseLife(){
    healthBar.classList.add("healthTransition")
    currentLife--
    lifePercentage-=12.5
    healthBar.style.width = (lifePercentage - 12.5) + "%"
    lifeTotal.textContent = currentLife + "/8"
    if(currentLife > 3 && currentLife < 6){
        healthBar.style.backgroundColor = "#FEC260"
    } else if (currentLife > 1 && currentLife < 4){
        healthBar.style.backgroundColor = "#F32424"
    }
    if(currentLife === 0){
        lifeTotal.textContent = "8/8"
        healthBar.style.backgroundColor = "#1E2022"
        displayLosingScreen()
        wordGuess.innerHTML = `
        ${hero}
        `
    }
}

function displayLosingScreen(){
    let losingSound = new Audio("LosingSound.mpeg");
    losingSound.play();
    title.textContent = "You have fed to " + localHero.localized_name
    hitPoints.remove()
    newHitPoints.remove() 
    mainBackground.insertBefore(defeat, trivia)
    mainBackground.insertBefore(playAgain, trivia)
    wordGuess.style.marginTop = "1.5em";
    disableallKeys()
    resetGame()
}


function disableButton(e){
    e.composedPath()[0].disabled = true
}

function disableallKeys(){
    for(let i = 0; i < keys.length; i++){
        keys[i].disabled = true
    }
}

function enableAllKeys(){
    for(let i = 0; i < keys.length; i++){
        keys[i].disabled = false
        keys[i].style.backgroundColor = ""
        keys[i].classList.remove("correctLetter")
        keys[i].classList.remove("incorrectLetter")
    }
}


function resetGame(){
    playAgain.addEventListener("click", loseReset)
}

// Generate New Hero from Defeat

let victory = document.createElement("img")
victory.classList.add("defeat")

let newHitPoints = document.createElement("section")
newHitPoints.classList.add("hitpoints")
newHitPoints.innerHTML = `<div class = "healthbar">
<h1 class = "lifetotal">8/8</h1>
</div>`

function loseReset(){   
    gamelevel = 1
    level.textContent = "Level 1"
    resetAllHeroes()
    defeat.remove()
    playAgain.remove()
    title.textContent = "Dota Alias Trivia"
    mainBackground.insertBefore(newHitPoints, trivia)
    enableAllKeys()
    resetKeys()
    lifeTotal = document.querySelector(".lifetotal")
    healthBar = document.querySelector(".healthbar")
    trivia = document.querySelector(".trivia")
    killCount = 0
    healthBar.style = ""
    lifePercentage = 100
    currentLife = 8
    localHero = ""
    hero = ""
    getDotaHero(DotaHeroes)
    heroArray = []
    getHero()
    heroGuess = heroArray.map(item => {
        if(item === "!"){
            return `<h1 class = "nextLine"></h1>`
        } else{
            return `<h1>${item}</h1>`
        }
    })
    displayHero()
    guessHero = hero.toUpperCase()
    keysList = []
    keys = document.querySelectorAll(".key")
    addKeys()
    wordGuess.style.marginTop = "";
    console.log(DotaHeroes)
}

function resetKeys(){
    for(let i = 0; i < keys.length; i++){
        keys[i].outerHTML = keys[i].outerHTML
}}

// Generate New Hero from Victory

let nextLevel = document.createElement("button")
nextLevel.classList.add("nextLevel")
nextLevel.textContent = "Next Opponent"

let killCount = 0

let killStreak = ["1stkill.mp3.mpeg", "2ndkill.mp3.mpeg","3rdkill.mp3.mpeg","4thkill.mp3.mpeg",
"5thkill.mp3.mpeg","6thkill.mp3.mpeg","7thkill.mp3.mpeg","8thkill.mp3.mpeg","9thkill.mp3.mpeg",
"10thkill.mp3.mpeg","11thkill.mp3.mpeg"]

function killSound(){
    if(killCount > 9){
        let winningSound = new Audio(`killing-sound/${killStreak[10]}`);
        winningSound.play();
    }
    else if (killCount <= 9){
        let winningSound = new Audio(`killing-sound/${killStreak[killCount]}`);
        winningSound.play();
    }
}

function displayWinningScreen(){
    lifeTotal.textContent = "8/8"
    killSound()
    killCount++
    title.textContent = "You have defeated " + localHero.localized_name
    hitPoints.remove() 
    newHitPoints.remove() 
    mainBackground.insertBefore(victory, trivia)
    mainBackground.insertBefore(nextLevel, trivia)
    wordGuess.style.marginTop = "1.5em";
    disableallKeys()
    winResetGame()
}

function winResetGame(){
    nextLevel.addEventListener("click", winReset)
}

function winReset(){
    gamelevel++
    level.textContent = "Level" + " " + gamelevel
    victory.remove()
    nextLevel.remove()
    title.textContent = "Next Challenger"
    mainBackground.insertBefore(newHitPoints, trivia)
    enableAllKeys()
    resetKeys()
    lifeTotal = document.querySelector(".lifetotal")
    healthBar = document.querySelector(".healthbar")
    trivia = document.querySelector(".trivia")
    healthBar.style = ""
    lifePercentage = 100
    currentLife = 8
    localHero = ""
    hero = ""
    getDotaHero(allDotaHeroes)
    heroArray = []
    getHero()
    heroGuess = heroArray.map(item => {
        if(item === "!"){
            return `<h1 class = "nextLine"></h1>`
        } else{
            return `<h1>${item}</h1>`
        }
    })
    displayHero()
    guessHero = hero.toUpperCase()
    keysList = []
    keys = document.querySelectorAll(".key")
    addKeys()
    wordGuess.style.marginTop = "";
    console.log(allDotaHeroes)
}

function generateMemeNumber(){
    let randomMemeNumber = Math.round(Math.random() * 110)
    return randomMemeNumber
}

async function getMeme(memeNumber){
    let res = await fetch("https://api.gfycat.com/v1/gfycats/search?search_text=win&count=120")
    let data = await res.json()
    victory.src = data.gfycats[memeNumber].gif100px
}

