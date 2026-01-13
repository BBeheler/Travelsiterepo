// ----- Initialize destinations array -----
let destinations = [];

// ----- Fetch destinations from api.json -----
fetch('api.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to fetch destinations');
    return response.json();
  })
  .then(data => {
    destinations = data; // store fetched data
    console.log('Destinations loaded:', destinations);
  })
  .catch(error => {
    console.error('Error loading destinations:', error);
  });

// ----- Get DOM elements -----
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const resultsGrid = document.getElementById("resultsGrid");

// ----- Helper function to normalize input -----
function normalizeInput(input) {
  let normalized = input.trim().toLowerCase();
  if (normalized.endsWith("s")) normalized = normalized.slice(0, -1);
  return normalized;
}

// ----- Search button click handler -----
searchBtn.addEventListener("click", function() {
  // Make sure destinations are loaded
  if (destinations.length === 0) {
    alert("Destinations are still loading. Please try again in a moment.");
    return;
  }

  const query = normalizeInput(searchInput.value);
  resultsGrid.innerHTML = ""; // clear previous results

  if (query === "") {
    alert("Please enter a keyword to search.");
    return;
  }

  // Filter destinations based on keywords
  const filtered = destinations.filter(dest =>
    dest.keywords.some(keyword => normalizeInput(keyword) === query)
  );

  // Display results
  if (filtered.length === 0) {
    resultsGrid.innerHTML = `<p>No results found for '${searchInput.value}'</p>`;
  } else {
    filtered.forEach(dest => {
      const card = document.createElement("div");
      card.className = "destination-card";
      card.innerHTML = `<h3>${dest.name}</h3><p>${dest.description}</p>`;
      resultsGrid.appendChild(card);
    });
  }

  // Show results section
  searchResults.style.display = "block";
});
