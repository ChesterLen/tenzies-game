import React from "react"

export default function Die(props) {
    return (
        <div className="die" key={props.id} id={props.id}>{props.value}</div>
    )
}