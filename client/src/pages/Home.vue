<script setup lang="ts">
import { defineExpose } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query'
import axios from 'axios';
import Loader from "../components/Loader.vue";

const fetchPokemon = async ({ pageParam = 0 }) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=20`);

    data.results = await Promise.all(data.results.map(async (pokemon) => {
      const pokemonData = await axios.get(pokemon.url);
      const types = pokemonData.data.types.map((type) => type.type.name);
      const abilities = pokemonData.data.abilities.map((ability) => ability.ability.name);
      const stats = pokemonData.data.stats.map((stat) => ({ name: stat.stat.name, value: stat.base_stat }));
      const moves = pokemonData.data.moves.map((move) => move.move.name);

      return {
        id: pokemonData.data.id,
        name: pokemon.name,
        image: pokemonData.data.sprites.front_default,
        types,
        abilities,
        stats,
        moves,
        height: pokemonData.data.height,
      };
    }));

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Pokemon');
  }
};

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
} = useInfiniteQuery({
  queryKey: ['pokemon'],
  queryFn: fetchPokemon,
  getNextPageParam: (lastPage) => undefined,
  initialPageParam: undefined,
});

const more = () => {
  fetchNextPage();
};

const captailize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ShowId = (id: number) => {
  return `#${id.toString().padStart(3, '0')}`;
};

defineExpose({
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
  more,
  captailize,
});

</script>

<template>
  <div class="text-center dark:bg-slate-900">
    <h1 class="text-4xl font-bold text-blue-500">Pokemon</h1>
    <div class="w-[90%] mx-auto mt-4 mb-4">
      <input type="text" placeholder="Search Pokemon"
        class="p-2 border border-gray-200 bg-[#313131] rounded-lg w-full text-white" />

    </div>
    <div v-if="isPending" class="flex justify-center items-center min-h-[90vh]">
      <Loader />
    </div>
    <div v-else-if="error" class="text-red-500">
      <div class="text-red-500 flex justify-center items-center min-h-[90vh]">Error: {{ error.message }}</div>
    </div>
    <div v-else class="w-[90%] mx-auto">
      <div v-for="page in data?.pages" :key="page.pageParam"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-rows-1 md:grid-rows-2 lg:grid-rows-3">
        <div v-for="pokemon in page.results" :key="pokemon.name">
          <div
            class="p-4 border border-gray-200 rounded-lg h-full flex items-center flex-col justify-center dark:bg-slate-800">
            <router-link :to="{ name: 'pokemon', params: { id: pokemon.id } }">
              <img :src="pokemon.image" alt="pokemon.name" class="w-[200px] h-[200px] object-cover rounded-full">
            </router-link>
            <div class="flex justify-between items-center w-full">
              <div class="flex flex-col justify-start items-start">
                <h2 class="text-2xl font-bold"> {{ captailize(pokemon.name) }} </h2>
                <span class="text-gray-500 font-semibold">
                  {{
                    ShowId(pokemon.id)
                  }}
                </span>
              </div>
              <i class="pi pi-bookmark text-blue-500 font-bold"></i>
            </div>
            <div>
              <h3>Types</h3>
              <ul>
                <li v-for="type in pokemon.types" :key="type">{{ type }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button v-if="hasNextPage" @click="more" :disabled="isFetchingNextPage"
        class="mt-4 p-2 bg-blue-500 text-white rounded-lg mb-4">
        {{ isFetchingNextPage ? 'Loading more...' : 'Load More' }}
      </button>
    </div>
  </div>

</template>

<style scoped></style>
