<template>
  <div class="page">
    <PokemonCardGrid v-if="isLoaded" :pokemons="store.pokemonsData" />
    <Loader v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { importImageByFilename, pokemonTypes } from '../../utils';
import PokemonCardGrid from '../../components/PokemonCardGrid.vue';
import Loader from '../../components/Loader.vue';
import { genericPokemonType, generatedPokemonType } from '../../utils/types';
import { usePokemonStore } from '../../store/pokemon';

const isLoaded = ref(false);
const store = usePokemonStore();

const getPokemonsData = async (pokemons: genericPokemonType[]) => {
  try {
    const pokemonsData: generatedPokemonType[] = [];
    for await (const pokemon of pokemons) {
      const { data } = await axios.get(pokemon.url);
      const types = data.types.map(({ type: { name } }) => ({
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
  const pokemons: genericPokemonType[] = store.currentPokemon!.evolution.map(
    ({ pokemon }: { pokemon: genericPokemonType }) => pokemon
  );
  const pokemonsData = await getPokemonsData(pokemons);
  store.setPokemonsData(pokemonsData);
  isLoaded.value = true;
};

onMounted(() => {
  fetchData();
});
</script>