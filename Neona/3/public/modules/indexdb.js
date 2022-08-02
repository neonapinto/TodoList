/**
 * class implementation for indexdb storage api
 */
export default class IndexStorage{
    #todoList;
    #db;
    #dbname = 'todoList';
    constructor(){
       
    }

    /**
     * Add an item to the indexdb
     * @param {input from user to be added into db} input 
     * @returns a promise on resolving or rejecting
     */
    addItem(input){
        return new Promise((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite"); //open a transaction in read write
            let store = tx.objectStore(this.#dbname); //connect to object store
            let add  = store.add({value: input}); //add the new item into indexdb
            add.onsuccess = function(){ //return resolve
                resolve();
            };
            add.onerror = function(){ //on error return reject
                reject("errorrrr!");
            };
        });
    }

    /**
     * delete item in indexdb storage
     * @returns a promise on resolving or rejecting
     */
    deleteItems(){
        return new Promise((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite"); //open a transaction in read write
            let store = tx.objectStore(this.#dbname);  //connect to object store
            let req = store.clear();  //clear all items indexdb
            req.onsuccess = function(){ //return resolve
                resolve();
            };
            req.onerror = function(){ //on error return reject
                reject(0);
            };
        });
    }

    /**
     * delete all items from indexdb storage
     * @param {the index to delete the item} id 
     * @returns a promise on resolving or rejecting
     */
    deleteItem(id){
        return new Promise((resolve,reject) =>{
            this.#todoList = this.#todoList.filter( element => {return element.id !== id}); //delete in data memory for todolist
            let tx = this.#db.transaction(this.#dbname, "readwrite"); //open a transaction in read write
            let store = tx.objectStore(this.#dbname); //connect to object store
            let req = store.delete(id); //delete the  item from indexdb
            req.onsuccess = () =>{ //return resolve
                resolve();
            }
            req.onerror = () =>{ //on error return reject
                reject();
            }
        });
    }
    
    /**
     * update item in indexdb Storage
     * @param {index to update the item} index 
     * @param {the value from user to update} input
     * @returns 
     */
    updateItem(index, input){
        return new Promise((resolve, reject) =>{
            this.#todoList.forEach(element => { // update in memory todolist data
                if(element.id == index){
                    element.value = input;
                }
            });
    
            let tx = this.#db.transaction(this.#dbname, "readwrite");//open a transaction in read write
            let store = tx.objectStore(this.#dbname);//connect to object store
            let req = store.put({value: input, id: index}); //put the updated item into indexdb
            req.onsuccess = () =>{//return resolve
                resolve();
            };
            req.onerror = () =>{ //on error return reject
                reject();
            }; 
        });
    }

    /**
     * load data from indexdb storage
     * @returns a promise with the entire todolist on resolving
     */
    loadData() {
        return new Promise ((resolve, reject) =>{
            let tx = this.#db.transaction(this.#dbname, "readwrite"); //open a transaction in read write
            let store = tx.objectStore(this.#dbname); //connect to object store
            let all_items = store.getAll(); //get all items from indexdb
            all_items.onsuccess = () => {  
                this.#todoList = all_items.result; //on success update in memory
                resolve(this.#todoList); //return resolve
            } 
            all_items.onerror = function(){ //on error return reject
                reject("error")
            }
        });
    }

    /**
     * init function to load the indexdb
     * @returns promise on successful opening of indexdb
     */
    initialization(){
        return new Promise((resolve, reject) =>{
            //check if browser supports indexdb
            const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            let open = indexedDB.open(`${this.#dbname}DB`, 1);
            if (!('indexedDB' in window)) {
                console.log('This browser doesn\'t support IndexedDB');
                return;
            }
    
            //create a object store if it doesnt exist
            open.onupgradeneeded = () => {
                this.#db = open.result;
                if (!this.#db.objectStoreNames.contains(this.#dbname)) {
                    let store = this.#db.createObjectStore(this.#dbname, {keyPath: "id", autoIncrement: true});
                }
            };
    
            //on successful opening of db return promise
            open.onsuccess = (event) =>{
                this.#db = event.target.result;
                resolve();
            } 
        })
    }

}
