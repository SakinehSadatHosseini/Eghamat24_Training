import { createRouter, createWebHistory } from 'vue-router'
import TodosListView from '../views/TodosListView.vue'
import NewTodoView from '../views/NewTodoView.vue'

const routes = [
  {
    path: '/',
    name: 'todosList',
    component: TodosListView
  },
  {
    path: '/newTodo',
    name: 'newTodo',
    component: NewTodoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
