function qs(s) { return document.querySelector(s) }

const NEWSLETTER = qs('#newsletter') 

NEWSLETTER.onsubmit = function(e) {
    e.preventDefault()

    const EMAIL = qs('#email').value
    const KOMUNIKAT = qs('#komunikat')

    KOMUNIKAT.innerHTML = `Wyraziłeś zgodę na <strong>prawdziwy<strong> w 100% newsletter, zostanie on <strong>na pewno<strong> wysłany na adres <b>${EMAIL}</b>`
}