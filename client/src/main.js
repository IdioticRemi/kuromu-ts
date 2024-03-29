import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

// noinspection JSUnusedGlobalSymbols
new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
