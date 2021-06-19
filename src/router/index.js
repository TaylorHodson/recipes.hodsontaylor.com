import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import addRecipe from '../views/addRecipe.vue'
import editRecipe from '../views/editRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    },
    {
        path: '/addRecipe',
        name: 'addRecipe',
        component: addRecipe
    },
    {
        path: '/editRecipe/:id',
        name: 'editRecipe',
        component: editRecipe
    }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
