import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice)

    function generateNewDie() {
        return {id: nanoid(), value: Math.ceil(Math.random() * 6)}
    }

    function allNewDice() {
        const newDice = []
        for (let i=0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    const renderDice = dice.map(die => <Die key={die.id} id={die.id} value={die.value} />)

    function rollDice() {
        setDice(prevDice => prevDice.map(die => {
            return {
                ...die,
                value: Math.ceil(Math.random() * 6)
            }
        }))
    }

    return (
        <main>
            <div className="dice">
                {renderDice}
            </div>
            <button onClick={rollDice}>Roll</button>
        </main>
    )
}