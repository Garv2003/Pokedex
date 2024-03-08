import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import App from './App.vue'

createApp(App).use(PrimeVue).mount('#app')
