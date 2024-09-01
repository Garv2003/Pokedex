<template>
  <div>
    <Info v-if="store.currentPokemon" :data="store.currentPokemon" />
    <PokemonContainer v-if="store.currentPokemon" :image="store.currentPokemon.image" />
  </div>
</template>

<script setup lang="ts">
import Info from '../../components/Info.vue';
import PokemonContainer from '../../components/PokemonContainer.vue';
import { usePokemonStore } from "../../store/pokemon";
const store = usePokemonStore();
</script>
