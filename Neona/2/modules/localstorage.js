/**
 * class implementation for local storage api
 */
export default class LocalStorage{

    #todoList;
    #todoListID;
    
    constructor(){
       
    }

    //add item to local storage
    addItem(input){
        return new Promise((resolve, reject) =>{
            this.#todoList.push({id: this.#todoListID++, value: input}); //update in data memory
            window.localStorage.setItem("todoListID", JSON.stringify(this.#todoListID)); //push to local storage
            window.localStorage.setItem("todoList", JSON.stringify(this.#todoList));
            resolve();
        })
    }

    //delete item in local storage
    deleteItem(id){
        return new Promise((resolve, reject) =>{
            this.#todoList = this.#todoList.filter( element => {return element.id !== id}); //update in data memory
            window.localStorage.setItem("todoList", JSON.stringify(this.#todoList)); //delete from local storage
            resolve();
        })
    }

    //delete all items from local storage
    deleteItems(){
        return new Promise((resolve, reject) =>{
            window.localStorage.removeItem('todoList'); //remove from local storage
            resolve();
        })
    }

    //update item in local Storage
    updateItem(id, input){
        return new Promise((resolve, reject) =>{
            this.#todoList.forEach(element => { //update in data memory
                if(element.id == id){
                    element.value = input;
                }
            });
            window.localStorage.setItem("todoList", JSON.stringify(this.#todoList)); //push to local storage
            resolve();
        })
    }

    //load data from local storage
    loadData(){
        return new Promise((resolve, reject) =>{
            //update in data memory
            this.#todoList = JSON.parse(window.localStorage.getItem('todoList')) ?? [];
            this.#todoListID = JSON.parse(window.localStorage.getItem('todoListID')) ?? 1;
            resolve(this.#todoList);
        });
    }

    //initialization load
    initialization() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

