import { Row, Storage } from "./util";

export default class LocalStorage implements Storage{
    #name: string;
    #storage = window.localStorage;

    constructor(name: string){
        this.#name = name;
    }

    async Init():Promise<void>{
        return new Promise((resolve) => {
            resolve();
        });
    }

    async GetAllItems(): Promise<Array<Row>>{
        return new Promise((resolve) =>{
            resolve(JSON.parse(this.#storage.getItem(this.#name) as string) ?? []);
        })
    }

    async AddItem(value: string): Promise<void>{
        return new Promise((resolve) => {
            const id_key = `${this.#name}ID`;
            const obj:Row = {id:0, value};

            let id = JSON.parse(this.#storage.getItem(id_key) as string) ?? 1;
            obj.id = id++;
            this.#storage.setItem(id_key, JSON.stringify(id));

            const todoList = JSON.parse(this.#storage.getItem(this.#name) as string) ?? [];
            todoList.push(obj);
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            
            resolve();
        });
    }

    async RemoveItem(id: number): Promise<void>{
        return new Promise((resolve) => {
            let todoList = JSON.parse(this.#storage.getItem(this.#name) as string) ?? [];
            todoList = todoList.filter((x:Row) => x.id !== id);
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            resolve();
        });
    }

    async UpdateItem(value: string, id: number): Promise<void> {
        return new Promise((resolve) => {
            const todoList = JSON.parse(this.#storage.getItem(this.#name) as string) ?? [];
            todoList.forEach((o:Row) => {
                if (o.id === id) {
                    o.value = value; // update in-memory list
                }
            });
            this.#storage.setItem(this.#name, JSON.stringify(todoList));
            resolve();
        });
    }

    async RemoveAll(): Promise<void> {
        return new Promise((resolve) => {
            this.#storage.removeItem(this.#name);
            resolve();
        });
    }

}