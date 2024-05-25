import './style/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHHHooTy7wk-s4foTZDAGZhkYQGOIcrws',
  authDomain: 'savannah-963d2.firebaseapp.com',
  projectId: 'savannah-963d2',
  storageBucket: 'savannah-963d2.appspot.com',
  messagingSenderId: '989697205807',
  appId: '1:989697205807:web:6157203c0096dcb10c48da'
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
