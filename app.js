// Selectors
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Global variable constantly changing
let apiQuotes = [];
// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get quote api
async function getQuote() {
  loading();
  const apiUrl = "https://api.quotable.io/random";
  try {
    const response = await fetch(apiUrl);
    const quote = (apiQuotes = await response.json());
    // console.log(`Author: ${quote.author}\nContent: ${quote.content}`);
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
      authorText.textContent = "Unknown";
    } else {
      authorText.textContent = quote.author;
    }

    // Check content length for styling
    if (quote.content.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
      }
    // Set quote, hide Loader
      quoteText.textContent = quote.content;
      complete();
  } catch (error) {
    getQuote();
    console.log("Whoops, no quote", error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on Load
getQuote();
