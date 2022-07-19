/**
 * class implementation for indexdb storage api
 */
export default class IndexStorage{
    #todoList;
    #db;
    #dbname = 'todoList';
    constructor(){
       
    }

    //add item to indexdb storage
    addItem(input){
        return new Promise((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite");
            let store = tx.objectStore(this.#dbname);
            let add  = store.add({value: input});
            add.onsuccess = function(){
                resolve();
            };
            add.onerror = function(){
                reject("errorrrr!");
            };
        });
    }

    //delete item in indexdb storage
    deleteItems(){
        return new Promise((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite");
            let store = tx.objectStore(this.#dbname);
            let req = store.clear();  
            req.onsuccess = function(){
                resolve();
            };
            req.onerror = function(){
                reject(0);
            };
        });
    }

    //delete all items from indexdb storage
    deleteItem(id){
        return new Promise((resolve,reject) =>{
            this.#todoList = this.#todoList.filter( element => {return element.id !== id});
            let tx = this.#db.transaction(this.#dbname, "readwrite");
            let store = tx.objectStore(this.#dbname);
            let req = store.delete(id); 
            req.onsuccess = () =>{
                resolve();
            }
            req.onerror = () =>{
                reject();
            }
        });
    }
    
    //update item in indexdb Storage
    updateItem(index, input){
        return new Promise((resolve, reject) =>{
            this.#todoList.forEach(element => {
                if(element.id == index){
                    element.value = input;
                }
            });
    
            let tx = this.#db.transaction(this.#dbname, "readwrite");
            let store = tx.objectStore(this.#dbname);
            let req = store.put({value: input, id: index});
            req.onsuccess = () =>{
                resolve();
            };
            req.onerror = () =>{
                reject();
            }; 
        });
    }

    //load data from indexdb storage
    loadData() {
        return new Promise ((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite");
            let store = tx.objectStore(this.#dbname);
            let all_items = store.getAll();
            all_items.onsuccess = () => {
                this.#todoList = all_items.result;
                resolve(this.#todoList);
            } 
            all_items.onerror = function(){
                reject("error")
            }
        });
    }

    //init load
    initialization(){
        return new Promise((resolve, reject) =>{
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            let open = indexedDB.open(`${this.#dbname}DB`, 1);
            if (!('indexedDB' in window)) {
                console.log('This browser doesn\'t support IndexedDB');
                return;
            }
    
            open.onupgradeneeded = () => {
                this.#db = open.result;
                if (!this.#db.objectStoreNames.contains(this.#dbname)) {
                    let store = this.#db.createObjectStore(this.#dbname, {keyPath: "id", autoIncrement: true});
                }
            };
    
            open.onsuccess = (event) =>{
                this.#db = event.target.result;
                resolve();
            } 
        })
    }

}
