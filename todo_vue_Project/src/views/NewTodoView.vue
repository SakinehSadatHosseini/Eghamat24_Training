<template>
  <div class="newTodo">
    <form class="col-sm-6 offset-sm-3">
      <div class="row mb-3">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input v-model="title" type="text" class="form-control" id="title">
        </div>
      </div>

      <div class="row mb-3">
        <label for="due_date" class="col-sm-2 col-form-label">Due Date</label>
        <div class="col-sm-10">
          <date-picker v-model="due_date" class="form-control" id="due_date"></date-picker>
        </div>
      </div>

      <button @click.prevent.stop="addTodo" class="btn btn-primary">add todo</button>
    </form>
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
      due_date: '',
      title: ''
    }
  },
  components: { DatePicker },
  async created() {
    this.db = await this.getDb()
    this.ready = true
  },
  methods: {
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
    async addTodo() {
      this.addDisabled = true
      const todo = {
        title: this.title,
        due_date: this.due_date,
        done: false
      }
      await this.addTodoToDb(todo)
      this.addDisabled = false
      this.title = ''
      this.due_date = ''
    },
    async addTodoToDb(todo) {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction([this.DBTable], 'readwrite')
        trans.oncomplete = e => {
          resolve()
        }

        const store = trans.objectStore(this.DBTable)
        store.add(todo)
      })
    }
  },
  mounted() {
  }
}
</script>

<style>
form {
  border: solid 1px lightgray;
  padding: 20px;
  border-radius: 20px;
}
</style>
