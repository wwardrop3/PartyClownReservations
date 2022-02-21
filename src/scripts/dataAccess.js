const applicationState = {
    reservations: [],
    clowns: [],
    completions: [],
    resBuilder: {}
}

const API = `http://localhost:8088`


export const getReservations = () => {
    const listArray = applicationState.reservations.map(reservation => ({...reservation}))
    return listArray
}

export const getClowns = () => {
    const listArray = applicationState.clowns.map(clown =>({...clown}))
    return listArray
}


export const sendReservation = (reservationObject) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type':`application/json`
        },
        body: JSON.stringify(reservationObject)
    }
    return fetch(`${API}/reservations`, fetchOptions)
    .then(response => response.json())
}


export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
    .then(response => response.json())
    .then((request) => applicationState.reservations = request)
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then((request) => applicationState.completions = request)
}

export const sendCompletion = (completionObject) => {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type':`application/json`
        }
    }

    return fetch(`${API}/completions`, fetchOptions)
}

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then(response=>response.json())
    .then((response) => applicationState.clowns = response)
}

export const updateReservation = (reservationObject) => {
    const fetchOptions = {
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationObject)

    }
    const reservationInt = parseInt(reservationObject.id)
    return fetch(`${API}/reservations/${reservationInt}`,fetchOptions)
    .then(response => response.json())
    .then(document.dispatchEvent(new CustomEvent("stateChanged")))
}

export const deleteReservation = (reservationId) => {
    const reservationInt = parseInt(reservationId)
    return fetch(`${API}/reservations/${reservationInt}`, {method:"Delete"})
}







