// Dom Elements
const quoteForm = document.querySelector("#new-quote-form")
const quoteList = document.querySelector("#quote-list")
//Event Listeners
quoteForm.addEventListener("submit", handleQuoteFormSubmit)

//Create Quote 
function handleQuoteFormSubmit(event) {
    event.preventDefault()
    //step 1, get user input from form fields
    const quoteObj = {
        quote: event.target.quote.value,
        author: event.target.author.value
    }

    renderOneQuote(quoteObj)
    event.target.reset()
}



//render functions

function renderOneQuote(quoteObj) {
    const card = document.createElement("li")
    card.className = "quote-card"
    card.innerHTML = `
    <li class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quoteObj.quote}</p>
      <footer class="blockquote-footer">${quoteObj.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>
    `
    quoteList.append(card)
}

function renderAllQuotes(quoteData) {
    quoteData.forEach(renderOneQuote)
}


function initialize() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(response => response.json())
    .then(quoteArray => {
        console.log(quoteArray)
        renderAllQuotes(quoteArray)
    })
}   
initialize()