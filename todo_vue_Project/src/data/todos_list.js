export default {
    data() {
        return {
            DBConnection: null,
            db: null,
            todos: null,
            ready: false,
            addDisabled: false,
            DBTable: 'TodosList'
        }
    },
    async created() {
        this.db = await this.getDb()
        this.todos = await this.getTodosList()
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
                    console.log(objectStore)
                }
            })
        },
        async getTodosList() {
            const DBTable = 'TodosList'
            return new Promise((resolve, reject) => {
                const trans = this.db.transaction([DBTable], 'readwrite')
                trans.oncomplete = e => {
                    resolve(todos)
                }

                const store = trans.objectStore(DBTable)
                const todos = []

                store.openCursor().onsuccess = e => {
                    const cursor = e.target.result
                    if (cursor) {
                        todos.push(cursor.value)
                        cursor.continue()
                    }
                }
            })
        }
    }
}