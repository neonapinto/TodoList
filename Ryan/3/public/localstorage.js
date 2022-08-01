export default class LocalStorage {

    #name;
    #storage;

    constructor(name) {
        this.#name = name;
        this.#storage = window.localStorage;
    }

    async Init() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    async GetAllItems() {
        return new Promise((resolve, reject) => {
            resolve(JSON.parse(this.#storage.getItem(this.#name)) ?? []);
        });
    }

    async AddItem(value) {
        return new Promise((resolve, reject) => {
            var id_key = `${this.#name}ID`;
            var obj = {value};

            var id = JSON.parse(this.#storage.getItem(id_key)) ?? 1;
            obj.id = id++;
            this.#storage.setItem(id_key, JSON.stringify(id));

            let todoList = JSON.parse(this.#storage.getItem(this.#name)) ?? [];
            todoList.push(obj);
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            
            resolve();
        });
    }

    async UpdateItem(id, value) {
        return new Promise((resolve, reject) => {
            let todoList = JSON.parse(this.#storage.getItem(this.#name)) ?? [];
            todoList.forEach(o => {
                if (o.id === id) {
                    o.value = value; // update in-memory list
                }
            });
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            resolve();
        });
    }

    async RemoveItem(id) {
        return new Promise((resolve, reject) => {
            let todoList = JSON.parse(this.#storage.getItem(this.#name)) ?? [];
            todoList = todoList.filter(x => x.id !== id);
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            resolve();
        });
    }

    async RemoveAllItems() {
        return new Promise((resolve, reject) => {
            this.#storage.removeItem(this.#name);
            resolve();
        });
    }
}