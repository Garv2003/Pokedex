import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import Home from "./pages/Home.vue";
import Pokemon from "./pages/Pokemon.vue";

import 'primeicons/primeicons.css'

const history = createWebHistory();

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/pokemon/:id',
        name: 'pokemon',
        component: Pokemon
    }
];

const router = createRouter({
    history,
    routes
});

createApp(App).use(router).use(VueQueryPlugin).use(PrimeVue).mount('#app')
