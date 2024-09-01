<template>
  <div class="pokemon-locations">
    <ul class="pokemon-locations-list">
      <li v-for="encounter in store.currentPokemon.encounters" :key="encounter" class="pokemon-location">
        {{ encounter }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "../../store/pokemon";
const store = usePokemonStore();
</script>