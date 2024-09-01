<template>
  <nav>
    <div class="block">
      <img :src="pokeballIcon" alt="" />
    </div>
    <div class="data">
      <ul>
        <!-- <div class="underline"></div>
        <div class="underline"></div>
        <div class="underline"></div> -->
        <router-link v-for="(route, index) in navigationRoutes" :key="index" :to="route.route">
          <li>{{ route.name }}</li>
        </router-link>
      </ul>
    </div>
    <div class="block">
      <Menu :size="32" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import pokeballIcon from '../assets/pokeball-icon.png';
import { Menu } from 'lucide-vue-next';

const navigationRoutes = ref([
  { name: 'Home', route: '/' },
  { name: 'Compare', route: '/compare' },
  { name: 'Profile', route: '/profile' },
  // { name: 'Login', route: '/login' },
]);

const route = useRoute();

const ul = (index: number) => {
  const underlines = document.querySelectorAll<HTMLElement>('.underline');
  underlines.forEach((underline, i) => {
    underline.style.transform = `translate3d(${index * 100}%, 0, 0)`;
  });
};

onMounted(() => {
  const index = navigationRoutes.value.findIndex(({ route }) =>
    route.includes(route)
  );
  ul(index);
});

watch(
  () => route.path,
  (newPath) => {
    const index = navigationRoutes.value.findIndex(({ route }) =>
      newPath.includes(route)
    );
    ul(index);
  }
);

</script>
