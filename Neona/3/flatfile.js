const fs = require("fs").promises;

module.exports = class FlatFileDB {
    
    #name;
    #path = "flatfiledb.json";

    constructor(name) {
        this.#name = name;
    }

    /**
     * get db values from file
     * @returns json 
     */
    async #GetDB() {
        let contents;
        if (await this.#FileExists(this.#path)) {
            const contents_raw = await fs.readFile(this.#path);
            contents = JSON.parse(contents_raw);
        } else {
            contents = {id:1, rows:[]};
            await fs.writeFile(this.#path, JSON.stringify(contents));
        }
        return contents;
    }

    /**
     * Save the updated db to the json file
     * @param {updated db} db 
     */
    async #SaveDB(db) {
        await fs.writeFile(this.#path, JSON.stringify(db));
    }

    /**
     * Check if the file exists
     * @param {file path name} path 
     * @returns 
     */
    async #FileExists(path) {
        return !!(await fs.stat(path).catch(e => false));
    }

    /**
     * initialize the json file by creating
     */
    async Init() {
        const filenamify = (await import('filenamify')).default;
        this.#path = `flatfiledb_${filenamify(this.#name)}.json`;
    }

    /**
     * get all the data from the db
     */
    async GetAllItems() {
        return (await this.#GetDB()).rows;
    }

    /**
     * add item to the db
     * @param {new item to be added} value 
     */
    async AddItem(value) {
        let db = await this.#GetDB();
        let obj = {value, id:db.id++};
        db.rows.push(obj);
        await this.#SaveDB(db);
    }

    /**
     * update the item in db
     * @param {index of the item} id 
     * @param {value of the item} value 
     */
    async UpdateItem(id, value) {
        var db = await this.#GetDB();
        db.rows.forEach(o => {
            if (o.id === id) {
                o.value = value; // update in-memory list
            }
        });
        await this.#SaveDB(db);
    }

    /**
     * delete the item
     * @param {index to be deleted} id 
     */
    async RemoveItem(id) {
        var db = await this.#GetDB();
        db.rows = db.rows.filter(x => x.id !== id);
        await this.#SaveDB(db);
    }

    /**
     * delete all the items
     */
    async RemoveAllItems() {
        var db = await this.#GetDB();
        db.rows = [];
        await this.#SaveDB(db);
    }
};