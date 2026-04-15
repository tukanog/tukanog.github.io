function qs(s) { return document.querySelector(s) }

const FORM = qs('#formularz-rezerwacji')
const LISTA = qs('#lista-rezerwacji')
const FILTR = qs('#filtr-miejsce')

class Rezerwacja {
    constructor(id, klient, stolik, miejsce) {
        this.id = id
        this.klient = klient
        this.stolik = stolik
        this.miejsce = miejsce
    }
}

let rezerwacje = JSON.parse(localStorage.getItem('restauracja_rezerwacje')) || []

function renderuj(filtr = 'wszystkie') {
    LISTA.innerHTML = ''
    
    const przefiltrowane = filtr === 'wszystkie' 
        ? rezerwacje 
        : rezerwacje.filter(r => r.miejsce === filtr)

    przefiltrowane.forEach(rez => {
        const div = document.createElement('div')
        div.className = 'karta-rezerwacji'
        div.innerHTML = `
            <h3>Stolik nr ${rez.stolik}</h3>
            <p><strong>Klient:</strong> ${rez.klient}</p>
            <p><strong>Miejsce:</strong> <span class="miejsce-badge">${rez.miejsce}</span></p>
            <button class="btn-usun" onclick="usunRezerwacje(${rez.id})">Usuń rezerwację</button>
        `
        LISTA.appendChild(div)
    })
}

FORM.onsubmit = function(e) {
    e.preventDefault()

    const nowa = new Rezerwacja(
        Date.now(),
        qs('#klient').value,
        qs('#stolik').value,
        qs('#miejsce').value
    )

    const zajete = rezerwacje.find(r => r.stolik === nowa.stolik)
    if (zajete) {
        alert(`Stolik ${nowa.stolik} jest już zajęty przez: ${zajete.klient}!`)
        return
    }

    rezerwacje.push(nowa)
    zapisz()
    e.target.reset()
}

window.usunRezerwacje = function(id) {
    if(confirm("Czy na pewno chcesz usunąć tę rezerwację?")) {
        rezerwacje = rezerwacje.filter(r => r.id !== id)
        zapisz()
    }
}

FILTR.onchange = function() {
    renderuj(this.value)
}

function zapisz() {
    localStorage.setItem('restauracja_rezerwacje', JSON.stringify(rezerwacje))
    renderuj(FILTR.value)
}

renderuj()