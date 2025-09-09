const quotes = [
  {
    quote:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote:
      "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    quote:
      "If life were predictable it would cease to be life, and be without flavor.",
    author: "Eleanor Roosevelt",
  },
  {
    quote:
      "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    quote: "The only thing we have to fear is fear itself.",
    author: "Franklin D. Roosevelt",
  },
];

let container = document.getElementById("quote");
let usedIndex = new Set();

function generateQuote() {
  if (usedIndex.size >= quotes.length) usedIndex.clear();

  while (true) {
    let randIdx = Math.floor(Math.random() * quotes.length);
    if (usedIndex.has(randIdx)) continue;

    container.innerHTML = `
                <blockquote>
                    <p>"${quotes[randIdx].quote}"</p>
                    <footer>— ${quotes[randIdx].author}</footer>
                </blockquote>
            `;
    usedIndex.add(randIdx);
    break;
  }
}
