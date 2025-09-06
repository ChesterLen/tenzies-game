import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice)
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const diceFirstValue = dice[0].value
        const diceEqualValues = dice.every((die) => die.value === diceFirstValue)
        const diceAllHeld = dice.every((die) => die.isHeld === true)

        if (diceAllHeld && diceEqualValues) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false}
    }

    function allNewDice() {
        const newDice = []
        for (let i=0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
    }

    const renderDice = dice.map(die => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

    function rollDice() {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1>Tenzies Game</h1>
            <p className="instructions">Roll until all dice are the same.
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice">
                {renderDice}
            </div>
            <button onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        </main>
    )
}