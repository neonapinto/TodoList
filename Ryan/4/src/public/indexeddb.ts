import {Row, Storage} from "./utils.js";

export default class IndexedDBStorage implements Storage {

    #name:string;
    #db:IDBDatabase | null;

    constructor(name:string) {
        this.#name = name;
        this.#db = null;
    }

    async Init():Promise<void> {
        return new Promise((resolve) => {

            // https://javascript.info/indexeddb
            const request = window.indexedDB.open(this.#name, 1);

            request.onupgradeneeded = () => {
                this.#db = request.result;
                if (!this.#db.objectStoreNames.contains(this.#name)) {
                    this.#db.createObjectStore(this.#name, {keyPath: 'id', autoIncrement:true});
                }
            };

            request.onerror = () => {
                // Do something with request.errorCode!
                console.error("Why didn't you allow my web app to use IndexedDB?! " + request.error?.code);
            };

            request.onsuccess = () => {
                // Do something with request.result!
                this.#db = request.result;

                this.#db.onerror = () => {
                    // Generic error handler for all errors targeted at this database's requests!
                    console.error("Database error: " + request.error?.code);
                };

                resolve();
            };
        });
    }

    async GetAllItems():Promise<Array<Row>> {
        return new Promise((resolve, reject) => {
            if (!this.#db) {return reject("Database not defined");}

            const transaction = this.#db.transaction(this.#name, "readwrite");
            const store = transaction.objectStore(this.#name);
            const datarequest = store.getAll();
            datarequest.onsuccess = function() {
                resolve(datarequest.result);
            };
            datarequest.onerror = function() {
                reject("Error " + datarequest.error);
            }; 
        });
    }

    async AddItem(value:string):Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.#db) {return reject("Database not defined");}

            const transaction = this.#db.transaction(this.#name, "readwrite");
            const store = transaction.objectStore(this.#name);
            const request = store.add({value});
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
        });
    }

    async UpdateItem(id:number, value:string):Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.#db) {return reject("Database not defined");}

            const transaction = this.#db.transaction(this.#name, "readwrite");
            const store = transaction.objectStore(this.#name);
            const request = store.put({id, value});
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
        });
    }

    async RemoveItem(id:number):Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.#db) {return reject("Database not defined");}

            const transaction = this.#db.transaction(this.#name, "readwrite");
            const store = transaction.objectStore(this.#name);
            const request = store.delete(id);
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
        });
    }

    async RemoveAllItems():Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.#db) {return reject("Database not defined");}

            const transaction = this.#db.transaction(this.#name, "readwrite");
            const store = transaction.objectStore(this.#name);
            const request = store.clear();
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
        });
    }
}