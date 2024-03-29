import App from './App.vue'
import Vue from 'vue'
import VueMoment from 'vue-moment';

Vue.use(VueMoment);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.filter('truncate', function (value, limit) {
  if (value.length > limit) {
      value = value.substring(0, (limit - 3)) + '...';
  }
  return value
})