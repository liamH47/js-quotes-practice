//dom elements
window.addEventListener("DOMContentLoaded", event => {
    console.log("dom loaded")
    getAllQuotes()


})

const quoteListUl = document.querySelector("#quote-list")
const quoteForm = document.querySelector("#new-quote-form")



//render functions
const renderAllquotes = quoteArray => {
    quoteArray.forEach(quoteObj => renderOneQuote(quoteObj))
}

const renderOneQuote = quoteObj => {
    const quoteCard = document.createElement('li')
    quoteCard.className = "quote-card"
    quoteCard.innerHTML = `
    <blockquote class="blockquote">
    <p class="mb-0">${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span class='likes-span'>0</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
    `
    quoteCard.dataset.id = quoteObj.id

    quoteListUl.append(quoteCard)
    // let deleteBtn = document.querySelector(".btn-danger").closest
    // deleteBtn.addEventListener("click", event => {
    //     console.log(event)
    // })
}





// event handlers

quoteForm.addEventListener("submit", event => {
    event.preventDefault()
    console.log(event)

    const quoteObj = {
        quote: event.target.quote.value,
        author: event.target.author.value
    }
    renderOneQuote(quoteObj)
})

quoteListUl.addEventListener("click", function(event) {
    if (event.target.matches(".btn-danger")) {
        const button = event.target
        const card = button.closest(".quote-card")
        const id = parseInt(card.dataset.id)
        deleteById(id)
        card.remove()
    } else if (event.target.matches(".btn-success")) {
        const button = event.target
        const card = button.closest(".quote-card")
        const id = parseInt(card.dataset.id)
        debugger
        // const likesSpan = button.closest(".likes-span")
        // likesSpan.textContent = parseInt(likesSpan.textContent) + 1
        // likeFetch()
    }
})


// fetches
const likeFetch = () => {
    fetch('http://localhost:3000/likes', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quoteId: id
        })
    })
}

const deleteById = id => {

    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
    })
    .then(r => r.json())
    .then(data => console.log(data))
}

const getAllQuotes = () => {
    fetch('http://localhost:3000/quotes')
    .then(r => r.json())
    .then(quoteArray => renderAllquotes(quoteArray))
}

const getQuoteById = id => {
    fetch(`http://localhost:3000/quotes/${id}`)
    .then(r => r.json())
    .then(quoteObj => renderOneQuote(quoteObj))
}