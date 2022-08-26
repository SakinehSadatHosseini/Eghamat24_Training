export const DBConfig = {
    name: 'TodosDB_React',
    version: 1,
    objectStoresMeta: [
        {
            store: 'TodosList',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'title', keypath: 'title', options: { unique: false } },
                { name: 'due_date', keypath: 'due_date', options: { unique: false } },
                { name: 'done', keypath: 'done', options: { unique: false } }
            ]
        }
    ]
};