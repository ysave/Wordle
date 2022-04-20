document.addEventListener("DOMContentLoaded", () => {
    createSquares()

    let guessedWords = [[]]
    let availableSpace = 1

    let word = 'huans'

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

    function newRow(){
        const currentWords = getCurrentWords()
        if(currentWords.length !== 5){
            window.alert("Word must be 5 letters")
        }

        const currentWord = currentWords.join('')

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