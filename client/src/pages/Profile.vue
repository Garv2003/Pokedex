<template>
  <div class="app">
    <Navbar />
    <Wrapper>
      <div v-if="!token"
        style="display: flex;flex-direction: column; justify-content: center; align-items: center; font-size: 20px; font-weight: 600; color: #fff;">
        <div>Please login to view profile</div>
        <router-link to="/login" style="color: #f00; margin-left: 10px;">
          <button
            style="padding: 10px 20px; background-color: red; color: #fff; border: none; border-radius: 5px; cursor: pointer;margin-top: 10px;">Login</button>
        </router-link>
      </div>
      <template v-else>
        <div class="profile-container" v-if="!isLoading">
          <div class="profile-box">
            <h3>Profile</h3>
            <div class="profile-details">
              <span class="profile-item">
                <strong>Username:</strong>
                <span>{{ store.user.name }}</span>
              </span>
              <span class="profile-item">
                <strong>Email:</strong>
                <span>{{ store.user.email }}</span>
              </span>
            </div>
          </div>
          <div class="profile-box">
            <div v-if="store.user.pokemons.length === 0">
              <div>No Pokemons Saved</div>
            </div>
            <PokemonCardGrid :pokemons="store.user.pokemons" />
          </div>
        </div>
        <Loader v-else />
      </template>
    </Wrapper>
    <Footer isRoute="false" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Wrapper, Navbar, Footer } from "../layouts";
import PokemonCardGrid from '../components/PokemonCardGrid.vue';
import { useUserStore } from '../store/user';
import Loader from '../components/Loader.vue';

const store = useUserStore();
const isLoading = ref(true);
const token = localStorage.getItem('token');

const fetchUser = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('http://localhost:8000/auth/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data.success) {
      store.setUser(response.data.user);
    } else {
      alert('Please login to view profile');
    }
  } catch (error: any) {
    console.error(error);
    alert('An error occurred');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style scoped>
.profile-container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  padding: 10px;
}

.profile-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #333;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  padding: 20px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.profile-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}
</style>