/**
 * Server class for loading data from server 
 */
export default class Server{
    #todolist;
    #todoListID;

    /**
     * initializing constructor for todoloist id counter
     */
    constructor(){
      // this.#todoListID = 1;
    }

    /**
     * function to add item to by post method
     * @param {*} input consists of id and item
     * @returns a promise on resolving successful addition
     */
    async addItem(input){
        return new Promise(async(resolve, reject) =>{
                const data = { "id": this.#todoListID++, "value": input }; //send just data
                fetch('/add_item', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
          });   
    }

    /**
     * function to update the item by the patch method
     * @param {*} index id of the item to be updated
     * @param {*} input the value to be  updated
     * @returns a promise on resolving a successful update
     */
    updateItem(index, input){
      return new Promise((resolve, reject) =>{
        fetch('/update_item', {
          method: 'PATCH', //use put
          body: JSON.stringify({
            "id" : index,
            "value": input
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
          .then((response) => {
            resolve();
          })
      });
    }

    /**
     * function to delete an id from the todolist
     * @param {*} index id to be deleted
     * @returns a promise to resolve successful deletion
     */
    deleteItem(index){
      return new Promise(async(resolve, reject) =>{
        fetch('/delete_item', { //url add id check
          method: 'DELETE',
          body: JSON.stringify({
            "id" : index
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        })
        .then((response) => {
          resolve();
        })
      }); 
    }

    /**
     * function to delete the all items using patch method
     * @returns the promise on successful updation
     */
    deleteItems(){
      return new Promise(async(resolve, reject) =>{
        fetch('/delete_all_items', {
          method: 'PATCH' //delete
        })
        .then((response) => {
          response.text()
          resolve();
        })
      }); 
    }

    /**
     * function to load data from server side using get method
     * @returns loaded data from server side
     */
    loadData(){
      return new Promise((resolve, reject) =>{
        fetch('/get_list')
        .then((response) => response.json())
        .then((data) => {
          this.#todolist = data.list;
          this.#todoListID = data.listId; //remove
          resolve(this.#todolist);
        })
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