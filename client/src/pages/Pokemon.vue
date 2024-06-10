<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import Loader from "../components/Loader.vue";

const route = useRoute()

const { id } = route.params;

const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
};

const { data, error, isLoading } = useQuery({
    queryKey: ['pokemon'],
    queryFn: getPokemon,
});

</script>

<template>
    <div>
        <h1>Pokemon</h1>
        <div v-if="isLoading">
            <Loader />
        </div>
        <div v-else-if="error">
            <div>Error: {{ error.message }}</div>
        </div>
        <div v-else>
            <div>
                <img :src="data.sprites?.front_default" alt="pokemon.name" style="width: 200px; height: 200px;" />
                <h2>{{ data.name }}</h2>
                <div>
                    <h3>Types</h3>
                    <ul>
                        <li v-for="type in data.types" :key="type.type.name">{{ type.type.name }}</li>
                    </ul>
                </div>
                <div>
                    <h3>Abilities</h3>
                    <ul>
                        <li v-for="ability in data.abilities" :key="ability.ability.name">{{ ability.ability.name }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Stats</h3>
                    <ul>
                        <li v-for="stat in data.stats" :key="stat.stat.name">{{ stat.stat.name }}: {{ stat.base_stat }}
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>Moves</h3>
                    <ul>
                        <li v-for="move in data.moves" :key="move.move.name">{{ move.move.name }}</li>
                    </ul>
                </div>
                <div>
                    <h3>Height</h3>
                    <p>{{ data.height }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped></style>