
<template>
  <div class="form-check col-sm-2 offset-5">
    <input class="form-check-input" type="checkbox" @click="showAllTodos" id="doneTodos">
    <label class="form-check-label" for="doneTodos">
      Show done todos
    </label>
  </div>

  <div class="todoslist col-sm-6 offset-3">
    <div class="date_picker col-sm-6 offset-sm-3">
      <date-picker v-model="due_date" @change="filterData" class="form-control" id="due_date"></date-picker>
    </div>

    <div>
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.id">
            <th scope="row">{{ todo.id }}</th>
            <td>{{ todo.title }}</td>
            <td>{{ todo.due_date }}</td>
            <td><input :checked="todo.done" class="check-input" type="checkbox" @click="doneTodo(todo)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue3-persian-datetime-picker'

export default {
  data() {
    return {
      DBConnection: null,
      db: null,
      todos: null,
      ready: false,
      addDisabled: false,
      DBTable: 'TodosList',
      showtodo: 0,
      due_date: '',
      done: false
    }
  },
  components: { DatePicker },
  async created() {
    this.db = await this.getDb()
    this.todos = await this.getTodosList()
    this.ready = true
  },
  methods: {
    async showAllTodos() {
      this.showtodo = !this.showtodo
      this.todos = await this.getTodosList()
    },
    async getDb() {
      const DB_NAME = 'TodosDB'
      const DB_VERSION = '1'
      const DBTable = 'TodosList'
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION)

        request.onerror = e => {
          console.log('Error opening db', e)
          reject(e)
        }

        request.onsuccess = e => {
          this.DBConnection = e.target.result
          resolve(e.target.result)
        }

        request.onupgradeneeded = e => {
          console.log('onupgradeneeded')
          const db = e.target.result
          const objectStore = db.createObjectStore(DBTable, { autoIncrement: true, keyPath: 'id' })
          objectStore.createIndex('title', 'title', { unique: false })
          objectStore.createIndex('due_date', 'due_date', { unique: false })
          objectStore.createIndex('done', 'done', { unique: false })
          console.log(objectStore)
        }
      })
    },
    async filterData() {
      this.todos = await this.getTodosList()
    },
    async getTodosList() {
      const DBTable = 'TodosList'
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction([DBTable], 'readwrite')
        trans.oncomplete = e => {
          resolve(todos)
        }

        const store = trans.objectStore(DBTable)
        const IndeDate = store.index('due_date')
        const todos = []

        IndeDate.openCursor(this.due_date).onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            if (this.showtodo) {
              todos.push(cursor.value)
            } else if (!this.showtodo && !cursor.value.done) {
              todos.push(cursor.value)
            }
            cursor.continue()
          }
        }
      })
    },
    async doneTodo(todo) {
      const TodoUpdate = {
        title: todo.title,
        due_date: todo.due_date,
        done: !todo.done,
        id: todo.id
      }
      await this.putDoneTodo(TodoUpdate)
      this.todos = await this.getTodosList()
    },
    async putDoneTodo(todo) {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction([this.DBTable], 'readwrite')
        trans.oncomplete = e => {
          resolve()
        }
        const store = trans.objectStore(this.DBTable)
        store.put(todo)
      })
    }
  },
  mounted() {

  }
}
</script>

<style>
.date_picker {
  margin-bottom: 20px;
}
</style>
