const pokemonList = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search-input');
const searchCloseBtn = document.getElementById('search-close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let offset = 0;
let allPokemonData = [];

async function fetchPokemonList() {
  pokemonList.innerHTML = '';

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=500`);
  const data = await response.json();
  allPokemonData = data.results;

  const displayedPokemon = allPokemonData.slice(offset, offset + 16);

  displayedPokemon.forEach(async (pokemon) => {
    const pokemonItem = createPokemonItem(pokemon);
    pokemonList.appendChild(pokemonItem);
  });
}

function createPokemonItem(pokemon) {
  const pokemonItem = document.createElement('div');
  pokemonItem.classList.add('pokemon-item');

  const img = document.createElement('img');
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  img.alt = pokemon.name;

  const name = document.createElement('p');
  name.textContent = pokemon.name;

  pokemonItem.appendChild(img);
  pokemonItem.appendChild(name);

  pokemonItem.addEventListener('click', () => {
    window.open(`details.html?id=${pokemonId}`, '_parent');
  });

  return pokemonItem;
}

function getPokemonIdFromUrl(url) {
  const urlParts = url.split('/');
  return urlParts[urlParts.length - 2];
}

function clearSearch() {
  searchInput.value = '';
  fetchPokemonList();
}

function toggleSearchCloseBtn() {
  searchCloseBtn.style.display = searchInput.value ? 'inline' : 'none';
}

function filterAndDisplayPokemon(searchTerm) {
  const filteredPokemon = allPokemonData.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(searchTerm);
  });

  displayPokemon(filteredPokemon);
}

function displayPokemon(pokemonData) {
  pokemonList.innerHTML = '';

  pokemonData.forEach(pokemon => {
    const pokemonItem = createPokemonItem(pokemon);
    pokemonList.appendChild(pokemonItem);
  });
}

prevBtn.addEventListener('click', () => {
  offset -= 16;
  if (offset < 0) offset = 0;
  fetchPokemonList();
});

nextBtn.addEventListener('click', () => {
  offset += 16;
  fetchPokemonList();
});

searchInput.addEventListener('input', () => {
  toggleSearchCloseBtn();

  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm.length >= 3) {
    filterAndDisplayPokemon(searchTerm);
  } else {
    fetchPokemonList();
  }
});

searchCloseBtn.addEventListener('click', () => {
    searchInput.value = '';
    currentPage = 1;
    fetchPokemonList(currentPage);
    toggleSearchCloseBtn();
});

fetchPokemonList();
toggleSearchCloseBtn();