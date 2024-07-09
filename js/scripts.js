// Load the JSON data from three separate files
Promise.all([
  fetch('minecraft_utilities.json', { mode: 'cors' }),
  fetch('roblox_scripts.json', { mode: 'cors' }),
  fetch('tools.json', { mode: 'cors' }),
])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([minecraftUtilities, robloxScripts, tools]) => {
    const allUtilities = [...minecraftUtilities, ...robloxScripts, ...tools];

    // Create a function to generate the HTML for a single utility
    function generateUtilityHTML(utility) {
      const imgObject = utility.img_url != "" && utility.img_url != " " ? `<img class="responsive small" src="${utility.img_url}}">` : "";
      const authorHtml = utility.author ? `<a class="chip disabled" href="${utility.author_url || '#'}"><span>${utility.author}</span> <i>person</i></a>` : '';
      const description = utility.description || '';
      
      // Returns code of subject
      return `
        <article class="no-padding secondary-container border">
          ${imgObject}
          <div class="padding">
            <h5>${utility.name} ${authorHtml}</h5>
            <p>${description}</p>
            <div class="max">
              ${utility.downloads.map(download => `
                <a href="${download.download_link}">
                  <button class="secondary small-round" style="margin-bottom: 10px;">
                    <i>download</i>
                    <span>${download.name}</span>
                  </button>
                </a>
              `).join('')}
            </div>
          </div>
        </article>
      `;
    }

    // Initialize the utility lists with all utilities
    const minecraftHtml = minecraftUtilities.map(generateUtilityHTML).join('');
    const robloxHtml = robloxScripts.map(generateUtilityHTML).join('');
    const toolsHtml = tools.map(generateUtilityHTML).join('');

    document.querySelector('#minecraftclients').innerHTML = minecraftHtml;
    document.querySelector('#robloxscripts').innerHTML = robloxHtml;
    document.querySelector('#tools').innerHTML = toolsHtml;


    // Create a function to search for utilities
    function searchUtilities(searchQuery) {
      const allUtilities = [...minecraftUtilities, ...robloxScripts, ...tools];
      const filteredUtilities = allUtilities.filter(utility => {
        const nameMatch = utility.name.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = utility.description.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descriptionMatch;
      });

      const minecraftFiltered = filteredUtilities.filter(utility => minecraftUtilities.includes(utility));
      const robloxFiltered = filteredUtilities.filter(utility => robloxScripts.includes(utility));
      const toolsFiltered = filteredUtilities.filter(utility => tools.includes(utility));

      return { minecraft: minecraftFiltered, roblox: robloxFiltered, tools: toolsFiltered };
    }

    // Add an event listener to the search input
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', event => {
      const searchQuery = event.target.value;
      const { minecraft, roblox, tools } = searchUtilities(searchQuery);

      const minecraftHtml = minecraft.map(generateUtilityHTML).join('');
      const robloxHtml = roblox.map(generateUtilityHTML).join('');
      const toolsHtml = tools.map(generateUtilityHTML).join('');

      document.querySelector('#minecraftclients').innerHTML = minecraftHtml;
      document.querySelector('#robloxscripts').innerHTML = robloxHtml;
      document.querySelector('#tools').innerHTML = toolsHtml;
    });
    
  });


function toggleTheme() {
   // Changing theme ;)
  let newMode = document.getElementById("theme-switch").checked ? "dark" : "light";
  ui("mode", newMode)
    
  let themeIcon = document.getElementById("theme-icon");
  themeIcon.textContent = newMode === "dark" ? "dark_mode" : "light_mode";
}

