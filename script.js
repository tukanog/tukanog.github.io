function qs(s) { return document.querySelector(s) }

const NEWSLETTER = qs('#newsletter') 

NEWSLETTER.onsubmit = function(e) {
    e.preventDefault()

    const EMAIL = qs('#email').value
    const KOMUNIKAT = qs('#komunikat')

    KOMUNIKAT.innerHTML = `Wyraziłeś zgodę na prawdziwy w 100% newsletter, zostanie on na pewno wysłany na adres <b>${EMAIL}</b>`
}