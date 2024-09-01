<template>
  <div class="page capable-moves">
    <h1 class="capable-moves-title">Abilities</h1>
    <ul class="capable-moves-list ability">
      <li v-for="ability in store.currentPokemon.pokemonAbilities.abilities" :key="ability" class="move">
        {{ ability }}
      </li>
    </ul>
    <h1 class="capable-moves-title">Moves</h1>
    <ul class="capable-moves-list">
      <li v-for="move in store.currentPokemon.pokemonAbilities.moves" :key="move" class="move">
        {{ move }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { usePokemonStore } from "../../store/pokemon";
const store = usePokemonStore();
</script>
