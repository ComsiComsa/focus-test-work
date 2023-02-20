import { createApp, ref } from 'vue';
import './scss/main.scss';
import App from './App.vue';

const filter = ref('');
const updateFilter = (val) => {
    filter.value = val;
};

createApp(App)
    .provide('filter', {
        filter,
        updateFilter,
    })
    .mount('#app');
