import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'vue3-jalali-moment'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faThumbsUp)

createApp(App)
    .use(router)
    .use(moment)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
