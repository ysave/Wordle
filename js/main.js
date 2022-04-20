document.addEventListener("DOMContentLoaded", () => {
    createSquares()

    let guessedWords = [[]]
    let availableSpace = 1

    let word = 'start'
    let countGuessedWord = 0

    const keys = document.querySelectorAll('.keyboard-row button')

    function getCurrentWords(){
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords -1]
    }

    function updateGuessedWords(letter){
        const currentWords = getCurrentWords()

        if(currentWords && currentWords.length < 5){
            currentWords.push(letter)

            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1
            availableSpaceEl.textContent = letter
        }
    }

    function getSquareColor(letter, i){
        const correctLetter = word.includes(letter)

        if(!correctLetter){
            return"#283841"
        }

        const posOfLetter = word.charAt(i)
        const correctPos = (letter === posOfLetter)

        if(correctPos){
            return "#3282B8"
        }

        return "#0F4C75"
    }

    function newRow(){
        const currentWords = getCurrentWords()
        if(currentWords.length !== 5){
            window.alert("Word must be 5 letters")
        }

        const currentWord = currentWords.join("")

        const firstLetterId = countGuessedWord * 5 + 1
        const delay = 200
        currentWords.forEach((letter, i) => {
            setTimeout(() => {
                const squareColor = getSquareColor(letter,i)

                const letterId = firstLetterId + i
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add("animate__flipInX")
                letterEl.style = `background-color:${squareColor};border-color:${squareColor}`
            }, delay * i)
        })

        countGuessedWord += 1

        if(currentWord === word){
            window.alert("Congratulations!")
        }

        if(guessedWords.length === 6){
           window.alert(`Sorry, you have no more guesses! The word is ${word}.`)
        }

        guessedWords.push([])
    }

    function createSquares() {
        const gameBoard = document.getElementById("board")

        for (let i = 0; i < 30; i++) {
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("id", i + 1)
            gameBoard.appendChild(square)
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key")

            if(letter === 'enter'){
                newRow()
                return
            }

            updateGuessedWords(letter)
        }
    }
})