

fetch('utilities.json', {mode: 'cors'})
  .then(response => response.json())
  .then(data => {
    // Create a function to generate the HTML for a single utility
    function generateUtilityHTML(utility) {
      if (utility.img_url == "" || utility.img_url == " "){
        return `
        <div class="s4">
          <article class="no-padding secondary-container">
            <div class="padding">
              <h5>${utility.name}</h5>
              <p>${utility.description}</p>
              <div class="max">
                ${utility.downloads.map(download => `
                  <a href="${download.download_link}">
                    <button class="secondary small-round" style="margin-bottom: 5px;">
                      <i>download</i>
                      <span>${download.name}</span>
                    </button>
                  </a>
                `).join('')}
              </div>
            </div>
          </article>
        </div>
      `;
      }
      return `
        <div class="s4">
          <article class="no-padding secondary-container">
            <img class="responsive small" src="${utility.img_url}">
            <div class="padding">
              <h5>${utility.name}</h5>
              <p>${utility.description}</p>
              <div class="max">
                ${utility.downloads.map(download => `
                  <a href="${download.download_link}">
                    <button class="secondary small-round" style="margin-bottom: 5px;">
                      <i>download</i>
                      <span>${download.name}</span>
                    </button>
                  </a>
                `).join('')}
              </div>
            </div>
          </article>
        </div>
      `;
    }

// Create a function to search for utilities
function searchUtilities(searchQuery) {
      const filteredUtilities = data.filter(utility => {
        const nameMatch = utility.name.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = utility.description.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descriptionMatch;
      });
      return filteredUtilities;
}

    // Add an event listener to the search input
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', event => {
    const searchQuery = event.target.value;
    const filteredUtilities = searchUtilities(searchQuery);
    const utilityListHTML = filteredUtilities.map(generateUtilityHTML).join('');
    document.querySelector('.grid').innerHTML = utilityListHTML;
});

    // Initialize the utility list with all utilities
const utilityListHTML = data.map(generateUtilityHTML).join('');
document.querySelector('.grid').innerHTML = utilityListHTML;
});

function toggleTheme() {
  // Changing theme ;)
  let newMode = document.getElementById("theme-switch").checked ? "dark" : "light";
  ui("mode", newMode)

  let themeIcon = document.getElementById("theme-icon");
  themeIcon.textContent = newMode === "dark" ? "dark_mode" : "light_mode";
}
