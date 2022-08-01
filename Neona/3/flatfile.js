const fs = require('fs'); //loading file module

/**
 * class for reading flatfile json
 */
class FlatFile{

    #todoList = [];
    #data_obj;
    #todoListID = 1;
    constructor(){

    }

    /**
     * function to add data into flatfile json
     * @param {*} id id of the item
     * @param {*} value of the item
     * @returns promise on successful addition
     */
    addItem(id, value){
        return new Promise( (resolve, reject) =>{
            fs.readFile('flatfile.json',  (err, data) => {
                this.#data_obj = JSON.parse(data);
                this.#todoList = this.#data_obj[0].list;
                this.#todoListID = this.#data_obj[0].listId;
                this.#todoList.push({"id" : id, "value": value});
                this.#todoListID++;
                this.#data_obj[0].list = this.#todoList;
                this.#data_obj[0].listId = this.#todoListID;
                fs.writeFile("flatfile.json", JSON.stringify(this.#data_obj), function(err){
                    if (err) throw err;
                    resolve();
                  });
            })
        })
    }

    /**
     * function to update the flatfile json with updated value
     * @param {*} id of the item to be updated
     * @param {*} value of the item to update
     * @returns promise on successful addition
     */
    updateItem(id, value){
        return new Promise((resolve, reject) =>{
            fs.readFile('flatfile.json',  (err, data) => {
                this.#data_obj = JSON.parse(data);
                this.#todoList = this.#data_obj[0].list;
                this.#todoListID = this.#data_obj[0].listId;
                for (var i = 0; i < this.#todoList.length; i++) {
                    if (this.#todoList[i].id === id) {
                        this.#todoList[i].value = value;
                      break;
                    }
                  }
                this.#data_obj[0].list = this.#todoList;
                this.#data_obj[0].listId = this.#todoListID;
                fs.writeFile("flatfile.json", JSON.stringify(this.#data_obj), function(err){
                    if (err) {
                        throw err;
                        reject();
                    }
                    resolve();
                  });
            })
        })
    }
    
    /**
     * function to delete from flatfile json
     * @param {*} index to be deleted
     * @returns promise on successful deletion
     */
    deleteItem(index){
        return new Promise((resolve, reject) =>{
            fs.readFile('flatfile.json',  (err, data) => {
                this.#data_obj = JSON.parse(data);
                this.#todoList = this.#data_obj[0].list;
                this.#todoListID = this.#data_obj[0].listId;
                const id = index.id;
                this.#todoList = this.#todoList.filter((el) => {return el.id !== id;});
                this.#data_obj[0].list = this.#todoList;
                this.#data_obj[0].listId = this.#todoListID;
                fs.writeFile("flatfile.json", JSON.stringify(this.#data_obj), function(err){
                    if (err) {
                        throw err;
                        reject();
                    }
                    resolve();
                  });
            })
        });
    }

    /**
     * function to delete all items
     * @returns promise on updating deletetion of all items
     */
    deleteAll(){
        return new Promise((resolve, reject) =>{
            fs.readFile('flatfile.json',  (err, data) => {
                let json_todolist = JSON.parse(data);
                this.#todoList = json_todolist[0].list;
                json_todolist[0].list = [];
                fs.writeFile("flatfile.json", JSON.stringify(json_todolist), (err) =>{
                    if (err) {
                        throw err;
                        reject();
                    }
                    console.log(this.#todoList)
                    resolve();
                  });
            })
        });
    }

    /**
     * function to get/read the json array from flatfile
     * @returns promise on fetching data
     */
    getAll(){
        return new Promise((resolve, reject) =>{
            //create a file and then initialize to empty
            this.#data_obj = fs.readFileSync('flatfile.json', 'utf8') ?? []; //check if file exists
            try{
                this.#data_obj = JSON.parse(this.#data_obj);
                this.#todoList = this.#data_obj[0].list;
                this.#todoListID = this.#data_obj[0].listId;
                resolve({"listId" : this.#todoListID, "list" : this.#todoList}); //remove the id
            }
            catch(error){
                this.#data_obj = [{"listId" : this.#todoListID, "list" : this.#todoList}]
                fs.writeFile("flatfile.json", JSON.stringify(this.#data_obj), (err) =>{
                    if (err) {
                        throw err;
                        reject();
                    }
                    resolve({"listId" : this.#todoListID, "list" : this.#todoList}); //remove id
                  });
                
            }
        });
    }

    /**
     * function for initialization
     * @returns promise
     */
    initialize(){
        return new Promise((resolve, reject) =>{

        });
    }
}

module.exports.FlatFile = FlatFile;