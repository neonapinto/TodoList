export default class IndexedDBStorage {

    #name;
    #db;

    constructor(name) {
        this.#name = name;
    }

    async Init() {
        return new Promise((resolve, reject) => {

            // https://javascript.info/indexeddb
            const request = window.indexedDB.open(this.#name, 1);

            request.onupgradeneeded = () => {
                this.#db = request.result;
                if (!this.#db.objectStoreNames.contains(this.#name)) {
                    this.#db.createObjectStore(this.#name, {keyPath: 'id', autoIncrement:true});
                }
            };

            request.onerror = event => {
                // Do something with request.errorCode!
                console.error("Why didn't you allow my web app to use IndexedDB?! " + request.errorCode);
            };

            request.onsuccess = event => {
                // Do something with request.result!
                this.#db = event.target.result;

                this.#db.onerror = event => {
                    // Generic error handler for all errors targeted at this database's
                    // requests!
                    console.error("Database error: " + event.target.errorCode);
                };

                resolve();
            };
        });
    }

    async GetAllItems() {
        return new Promise((resolve, reject) => {
            let transaction = this.#db.transaction(this.#name, "readwrite");
            var store = transaction.objectStore(this.#name);
            var datarequest = store.getAll();
            datarequest.onsuccess = function() {
                resolve(datarequest.result);
            };
            datarequest.onerror = function() {
                reject("Error " + datarequest.error);
            }; 
            //transaction.oncomplete = function() {
            //    console.log("Transaction is complete");
            //};
        });
    }

    async AddItem(value) {
        return new Promise((resolve, reject) => {
            let transaction = this.#db.transaction(this.#name, "readwrite");
            var store = transaction.objectStore(this.#name);
            let request = store.add({value});
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
            //transaction.oncomplete = function() {
            //    console.log("Transaction is complete");
            //};
        });
    }

    async UpdateItem(id, value) {
        return new Promise((resolve, reject) => {
            let transaction = this.#db.transaction(this.#name, "readwrite");
            var store = transaction.objectStore(this.#name);
            let request = store.put({id, value});
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
            //transaction.oncomplete = function() {
            //    console.log("Transaction is complete");
            //};
        });
    }

    async RemoveItem(id) {
        return new Promise((resolve, reject) => {
            let transaction = this.#db.transaction(this.#name, "readwrite");
            var store = transaction.objectStore(this.#name);
            let request = store.delete(id);
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
            //transaction.oncomplete = function() {
            //    console.log("Transaction is complete");
            //};
        });
    }

    async RemoveAllItems() {
        return new Promise((resolve, reject) => {
            let transaction = this.#db.transaction(this.#name, "readwrite");
            var store = transaction.objectStore(this.#name);
            let request = store.clear();
            request.onsuccess = function() { 
                resolve();
            };
            request.onerror = function() {
                reject("Error " + request.error);
            }; 
            //transaction.oncomplete = function() {
            //    console.log("Transaction is complete");
            //};
        });
    }
}