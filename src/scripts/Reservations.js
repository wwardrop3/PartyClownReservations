//purpose of this module is to produce html skeleton of site

import { deleteReservation, getClowns, getReservations, updateReservation } from "./dataAccess.js"
import { RequestForm } from "./RequestForm.js"

const Reservations = () =>{
    const reservations = getReservations()
    let html = `<ul>`

    const listArray = reservations.map(reservation => {
        return `<li>Party for ${reservation.childName} is scheduled for ${reservation.resLength} hours on ${reservation.resDate} and was performed by ${checkCompleted(reservation.id)}
        <button id = "deleteReservation--${reservation.id}">Delete Reservation</button>
        </li>`
    })
    html+=listArray.join("")
    html+=`</ul>`
    return html
}



const checkCompleted = (reservationId) => {
    const reservations = getReservations()
    const foundReservation = reservations.find(reservation => {
        return reservationId === reservation.id
    })
    if(foundReservation.completed===true){
        return `${foundReservation.clownName}`
    } else {
        const clowns = getClowns()
        let html = `<select id = "clownSelect--${foundReservation.id}">
        <option value = "0">Select a Clown...</option>`
        for(const clown of clowns){
            html+=`<option value = "${clown.id}">${clown.name}</option>`

        }
        html+=`</select>`
        return html
    }
}


document.addEventListener(
    "change",
    (changeEvent)=> {
        if(changeEvent.target.id.startsWith("clownSelect")){
            const [,reservationId] = changeEvent.target.id.split("--")
            const reservations = getReservations()
            const clowns = getClowns()
            const foundReservation = reservations.find(reservation => {
                return reservation.id === parseInt(reservationId)
            })
            const foundClown = clowns.find(clown => {
                return clown.id === parseInt(changeEvent.target.value)
            })
            foundReservation.clownId = foundClown.id
            foundReservation.clownName = foundClown.name
            foundReservation.completed = true
            console.log(foundReservation)
            updateReservation(foundReservation)
        }
    }
)



export const siteHTML = () => {
    return `<article class = "mainContainer">

    <h1>Clown Company</h1>
    
    <section class = "requestForm">
    ${RequestForm()}

    </section>

    <section class = "upcomingParties">
    ${Reservations()}

    </section>
    
    
    </article>
    `
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id.startsWith("deleteReservation")){
            const [,reservationId] = clickEvent.target.id.split("--")
            deleteReservation(reservationId).then(()=>document.dispatchEvent(new CustomEvent("stateChanged")))
        }
        
    }
)
