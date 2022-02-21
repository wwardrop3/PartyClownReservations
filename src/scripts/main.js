import { fetchClowns, fetchCompletions, fetchReservations } from "./dataAccess.js"
import { siteHTML } from "./Reservations.js"

export const render = () => {
    fetchReservations()
    .then(fetchCompletions)
    .then(fetchClowns)
    .then(
        () => { document.querySelector(".mainContent").innerHTML = siteHTML()}
    )
}
render()


document.addEventListener(
    "stateChanged",
    (customEvent) => {
        render()
    }
)