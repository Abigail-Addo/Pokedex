const detailsContainer = document.getElementById('details-container');
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

async function fetchPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
}

function formatMoveList(moves) {
    const bgColor = '#ccc';
    let moveRows = '';
    let currentRow = '';
  
    moves.forEach((move, index) => {
      if (index % 3 === 0) {
        if (currentRow) {
          moveRows += `<div class="currentRow">${currentRow}</div>`;
        }
        currentRow = '';
      }
  
      currentRow += `<span  class="row" style="background-color: ${bgColor}; padding: 0.2rem 0.5rem; border-radius: 5px;">${move.move.name}</span>`;
    });
  
    return moveRows;
  }
  function formatTypeList(types) {
    const bgColor = '#ccc';
  
    return types.map(type => {
      return `<span style="background-color: ${bgColor}; padding: 0.5rem 1rem; margin: 0.2rem; border-radius: 5px;">${type.type.name}</span>`;
    }).join(' ');
  }

async function displayPokemonDetails() {
    const pokemon = await fetchPokemonDetails(pokemonId);
    detailsContainer.classList.add('pokemon-details');
    detailsContainer.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${pokemon.name}"  style=" margin: auto; display: flex;">
    <h2 class="name" style=" text-align: center;">${pokemon.name}</h2>
    <p class="name" style="margin-bottom: 0.5rem;"><strong>Species</strong></p>
    <p  class="name" style="margin-bottom: 0.5rem;">${pokemon.species.name}</p>
    <p class="name"><strong>Base Stats</strong></p>
    <ul>
      <li>Hp <span>${pokemon.stats[0].base_stat}</span></li>
      <li>Attack  <span> ${pokemon.stats[1].base_stat}</span></li>
      <li>Defense <span>${pokemon.stats[2].base_stat}</span> </li>
      <li>Special-Attack <span> ${pokemon.stats[3].base_stat}</span></li>
      <li>Special-Defense<span>${pokemon.stats[4].base_stat}</span></li>
      <li>Speed <span>${pokemon.stats[5].base_stat}</span></li>
    </ul>
    <p class="name" style="margin-bottom: 1rem;"><strong>Types</strong></p>
    <p class="name" style="margin-bottom: 1rem;">${formatTypeList(pokemon.types)}</p>
    <p class="name" style="margin-bottom: 0.5rem;><strong>Weight</strong></p>
    <p class="name" style="margin-bottom: 0.5rem;> ${pokemon.weight / 10} kg</p>
    <p class="name"><strong>Moves</strong></p>
    <p>${formatMoveList(pokemon.moves)}</p>
  `;
}

displayPokemonDetails();