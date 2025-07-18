const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const timeEl = document.getElementById('timestamp');
const historyEl = document.getElementById('history');

const welcomeScreen = document.getElementById('welcome');
const mainApp = document.getElementById('mainApp');

const quotes = [
  { content: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { content: "What we think, we become.", author: "Buddha" },
  { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "Sometimes you just need to be alone. Not to be lonely, but to enjoy your free time being yourself.", author: "Unknown" },
  { content: "You are enough, just as you are.", author: "Meghan Markle" },
  { content: "The best part about being alone is that you really don’t have to answer to anybody. You do what you want.", author: "Justin Timberlake" },
  { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { content: "There is no elevator to success. You have to take the stairs.", author: "Zig Ziglar" },
  { content: "Study while others are sleeping. Work while others are loafing. Prepare while others are playing. Dream while others are wishing.", author: "William Arthur Ward" },
  { content: "Hard times may have held you down, but they will not last forever. When all is said and done, you will be increased.", author: "Joel Osteen" },
  { content: "You never know how strong you are until being strong is your only choice.", author: "Bob Marley" },
  { content: "Tough times never last, but tough people do.", author: "Robert H. Schuller" },
  { content: "Doubt kills more dreams than failure ever will.", author: "Suzy Kassem" },
  { content: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson" },
  { content: "Your present circumstances don't determine where you go; they merely determine where you start.", author: "Nido Qubein" },
  { content: "You are doing your best, and that is enough.", author: "Unknown" },
  { content: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
  { content: "One small positive thought in the morning can change your whole day.", author: "Dalai Lama" }
];



function startApp() {
  welcomeScreen.style.display = 'none';
  mainApp.style.display = 'block';
  fetchQuote();
  updateHistoryUI();
}

function fetchQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const data = quotes[randomIndex];
  quoteEl.textContent = `"${data.content}"`;
  authorEl.textContent = `— ${data.author}`;
  const timestamp = new Date().toLocaleString();
  timeEl.textContent = `Fetched just now`;

  saveToHistory(data.content, data.author, timestamp);
  updateHistoryUI();
  updateTimeSince();
  fadeIn();
}

function fadeIn() {
  mainApp.style.animation = 'none';
  void mainApp.offsetWidth;
  mainApp.style.animation = null;
}

function copyQuote() {
  const fullText = `${quoteEl.textContent} ${authorEl.textContent}`;
  navigator.clipboard.writeText(fullText)
    .then(() => alert("Quote copied to clipboard!"));
}

function saveToHistory(content, author, timestamp) {
  const entry = { content, author, timestamp };
  let history = JSON.parse(localStorage.getItem('quoteHistory')) || [];
  history.unshift(entry);
  if (history.length > 5) history.pop();
  localStorage.setItem('quoteHistory', JSON.stringify(history));
}

function updateHistoryUI() {
  const history = JSON.parse(localStorage.getItem('quoteHistory')) || [];
  historyEl.innerHTML = "<strong>📆 Quote History:</strong><br>";
  history.forEach(item => {
    historyEl.innerHTML += `<div>• "${item.content}" — ${item.author} <span style="color:gray;font-size:0.8em">(${item.timestamp})</span></div>`;
  });
}

function updateTimeSince() {
  const now = Date.now();
  setInterval(() => {
    const diff = Math.floor((Date.now() - now) / 1000);
    timeEl.textContent = diff < 60
      ? `Fetched ${diff} seconds ago`
      : `Fetched ${Math.floor(diff / 60)} minutes ago`;
  }, 10000);
}

function clearHistory() {
  localStorage.removeItem("quoteHistory");
  historyEl.innerHTML = "<em>No recent quotes.</em>";
}
