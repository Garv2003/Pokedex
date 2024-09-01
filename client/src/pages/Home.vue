<template>
  <div class="app">
    <Navbar />
    <Wrapper>
      <div v-if="isDataLoading">
        <Loader />
      </div>
      <div v-else class="search">
        <input type="text" class="pokemon-searchbar" placeholder="Search Pokemon" v-model="searchQuery"
          @input="handleChange" />
        <PokemonCardGrid v-if="filteredPokemons.length" :pokemons="filteredPokemons" />
        <p v-else>No Pokemons found.</p>
      </div>
    </Wrapper>
    <Footer isRoute="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { debounce } from '../utils/debounce';
import Loader from '../components/Loader.vue';
import PokemonCardGrid from '../components/PokemonCardGrid.vue';
import { Wrapper, Footer, Navbar } from '../layouts';
import axios from 'axios';
import { pokemonsRoute } from '../utils/constants';
import { genericPokemonType, generatedPokemonType } from '../utils/types';
import { importImageByFilename, pokemonTypes } from '../utils';
import { usePokemonStore } from '../store/pokemon';

const isDataLoading = ref(true);
const searchQuery = ref('');
const store = usePokemonStore();

async function getInitialPokemonData() {
  try {
    const { data } = await axios.get(pokemonsRoute);
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const getPokemonsData = async (pokemons: genericPokemonType[]) => {
  try {
    const pokemonsData: generatedPokemonType[] = [];
    for await (const pokemon of pokemons) {
      const { data } = await axios.get(pokemon.url);
      const types = data.types.map(({ type: { name } }: { type: { name: string } }) => ({
        [name]: pokemonTypes[name],
      }));
      const image = await importImageByFilename(data.id.toString());
      if (image) {
        pokemonsData.push({
          name: pokemon.name,
          id: data.id,
          image,
          types,
        });
      }
    }
    return pokemonsData;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const fetchData = async () => {
  const initialData = await getInitialPokemonData();
  const pokemonsData = await getPokemonsData(initialData);
  store.setPokemons(pokemonsData);
  isDataLoading.value = false;
};

const getPokemon = async (value: string) => {
  if (value.length) {
    const pokes = store.pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value.toLowerCase())
    );
    store.setPokemons(pokes);
  } else {
    const clonedPokemons = [...store.pokemons];
    const randomPokemonsId = clonedPokemons
      .sort(() => Math.random() - Math.random())
      .slice(0, 20);
    store.setPokemons(randomPokemonsId);
  }
};

const handleChange = debounce((value: string) => getPokemon(value), 300);

onMounted(() => {
  fetchData();
});

const filteredPokemons = computed(() => {
  return store.pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>