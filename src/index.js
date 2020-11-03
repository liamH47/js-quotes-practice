// Dom Elements
const quoteForm = document.querySelector("#new-quote-form")
const quoteList = document.querySelector("#quote-list")


function renderAllQuotes(quoteArray) {
    quoteArray.forEach(quote => {
        renderOneQuote(quote, quote.likes.length)
    })
}

function renderOneQuote(quoteObj, likes) {
    const author = quoteObj.author
    const quote = quoteObj.quote
    const li = createLi(quoteObj.id)
    li.innerHTML = `
        <blockquote class="blockquote">
            <p class="mb-0">
                ${quote}
            </p>
            <footer class="blockquote-footer">
                ${author}
            </footer>
                <br>
            <button class='btn-success'>Likes: <span>${likes}</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    quoteList.append(li)
}

const createLi = id => {
    let li = document.createElement('li')
    li.className = 'quote-card'
    li.dataset.id = id
    return li
}

function initialize() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(response => response.json())
    .then(quoteArray => {
        console.log(quoteArray)
        renderAllQuotes(quoteArray)
    })
}   

//Create Quote 
const submitHandler = () => {
    quoteForm.addEventListener('submit', e => {
        e.preventDefault()
        const quote = e.target.quote.value
        const author = e.target.author.value
        console.log(quote, author)
        postNewAuthor(quote, author)
        e.target.reset()
    })
}
    

const postNewAuthor = (quote, author) => {
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            quote: quote,
            author: author,
            created_at: Date.now()
        })
    })
    .then(response => response.json())
    .then(obj => {
        renderOneQuote(obj, 0)
    })
}



//render functions

submitHandler()
initialize()