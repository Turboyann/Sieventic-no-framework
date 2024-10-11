const exampleSuggestions = [
    { id: 1, title: "Blog", link: "/blog" },
    { id: 2, title: "Über uns", link: "/about" },
    { id: 3, title: "Kontaktiere uns", link: "/contact" },
    { id: 4, title: "Datenschutzrichtlinien", link: "/privacy-policy" },
];

let query = '';
let dropdownVisible = false;
const dropdown = document.getElementById('dropdown');
const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestionsList');
const closeButton = document.getElementById('closeButton');

function handleChange(e) {
    query = e.target.value;
    if (query) {
        const filteredSuggestions = exampleSuggestions.filter(suggestion =>
            suggestion.title.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        displaySuggestions(filteredSuggestions);
    } else {
        displaySuggestions(exampleSuggestions.slice(0, 5));
    }
}

function handleSuggestionClick(suggestion) {
    query = suggestion.title;
    searchInput.value = query;
    hideDropdown();
    window.location.href = suggestion.link;
}

function handleInputClick() {
    showDropdown();
    displaySuggestions(exampleSuggestions.slice(0, 5));
}

function showDropdown() {
    dropdownVisible = true;
    dropdown.style.display = 'block';
}

function hideDropdown() {
    dropdownVisible = false;
    dropdown.style.display = 'none';
}

function displaySuggestions(suggestions) {
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `<span>${suggestion.title}</span>`;
        div.addEventListener('click', () => handleSuggestionClick(suggestion));
        suggestionsList.appendChild(div);
    });
}

searchInput.addEventListener('input', handleChange);
searchInput.addEventListener('click', handleInputClick);
closeButton.addEventListener('click', hideDropdown);

document.addEventListener('mousedown', (event) => {
    if (!dropdown.contains(event.target) && event.target !== searchInput) {
        hideDropdown();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hideDropdown();
    }
});
