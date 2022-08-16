/**
 * class implementation for local storage api
 */
export default class LocalStorage{

    #todoList;
    #todoListID;
    #name;
    
    constructor(name){
        this.#name = name;
        this.#todoList = window.localStorage;
    }

    /**
     * Add an item to the localstorage
     * @param {input from user to be added into db} input 
     * @returns a promise on resolving
     */
    addItem(input){
        return new Promise((resolve, reject) =>{
            this.#todoList.push({id: this.#todoListID++, value: input}); //update in data memory
            window.localStorage.setItem(`${this.#name}ID`, JSON.stringify(this.#todoListID)); //push to local storage
            window.localStorage.setItem(this.#name, JSON.stringify(this.#todoList));
            resolve();
        })
    }

    /**
     * delete item in local storage
     * @returns a promise on resolving
     */
    deleteItem(id){
        return new Promise((resolve, reject) =>{
            this.#todoList = this.#todoList.filter( element => {return element.id !== id}); //update in data memory
            window.localStorage.setItem(this.#name, JSON.stringify(this.#todoList)); //delete from local storage
            resolve();
        })
    }

    /**
     * delete all items from local storage
     * @param {the index to delete the item} id 
     * @returns a promise on resolving
     */
    deleteItems(){
        return new Promise((resolve, reject) =>{
            window.localStorage.removeItem(this.#name); //remove from local storage
            resolve();
        })
    }

      
    /**
     * update item in local Storage
     * @param {index to update the item} index 
     * @param {the value from user to update} input
     * @returns promise on resolve
     */
    updateItem(id, input){
        return new Promise((resolve, reject) =>{
            this.#todoList.forEach(element => { //update in data memory
                if(element.id == id){
                    element.value = input;
                }
            });
            window.localStorage.setItem(this.#name, JSON.stringify(this.#todoList)); //push to local storage
            resolve();
        })
    }

    /**
     * load data from local storage
     * @returns a promise with the entire todolist on resolving
     */
    loadData(){
        return new Promise((resolve, reject) =>{
            //update in data memory
            this.#todoList = JSON.parse(window.localStorage.getItem(this.#name)) ?? [];
            this.#todoListID = JSON.parse(window.localStorage.getItem(`${this.#name}ID`)) ?? 1;
            resolve(this.#todoList);
        });
    }

    /**
     * init function to load the local storage
     * @returns empty promise resolve
     */
    initialization() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

