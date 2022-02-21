//purpose of this module is to produce html for request form

import { getReservations, sendReservation } from "./dataAccess.js"
import { render } from "./main.js"



export const RequestForm = () => {
    return `
    <section class = "form">
        <label for="parentName">Enter Parent Name</label>
        <input type = "text" name = "parentName" id = "parentName">
        <p>
        <label for="childName">Enter Child Name</label>
        <input type = "text" name = "childName" id = "childName">
        <p>
        <label for="childCount">How many children will be attending?</label>
        <input type = "number" name = "childCount" id = "childCount">
        <p>
        <label for="address">Party address</label>
        <input type = "text" name = "address" id = "address">
        <p>
        <label for="resDate">Party Date</label>
        <input type = "date" name = "resDate" id = "resDate">
        <p>
        <label for="partyLength">Party Length (Hrs)</label>
        <input type = "number" name = "partyLength" id = "partyLength">


    </section>

    <button id = "reserveParty">Reserve Party</button>
    `
}



document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "reserveParty"){
            const newRes = {
                id: newResId(),
                childName: document.querySelector("#parentName").value,
                parentName: document.querySelector("#childName").value,
                childCount: document.querySelector("#childCount").value,
                address: document.querySelector("#address").value,
                resDate: document.querySelector("#resDate").value,
                resLength: document.querySelector("#partyLength").value,
                completed: false
            }

            sendReservation(newRes).then(()=> document.dispatchEvent(new CustomEvent("stateChanged")))
        }
    }
)

const newResId = () => {
    let newId = 1
    if(getReservations().length > 0){    
        const lastIndex = getReservations().length -1
        newId = getReservations()[lastIndex].id + 1
    } 
    return newId
}

