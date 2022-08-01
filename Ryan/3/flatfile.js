const fs = require("fs").promises;

module.exports = class FlatFileDB {
    
    #name;
    #path = "flatfiledb.json";

    constructor(name) {
        this.#name = name;
    }

    async #GetDB() {
        if (await this.#FileExists(this.#path)) {
            var contents_raw = await fs.readFile(this.#path);
            var contents = JSON.parse(contents_raw);
        } else {
            var contents = {id:1, rows:[]};
            await fs.writeFile(this.#path, JSON.stringify(contents));
        }
        return contents;
    }

    async #SaveDB(db) {
        await fs.writeFile(this.#path, JSON.stringify(db));
    }

    async #FileExists(path) {
        return !!(await fs.stat(path).catch(e => false));
    }

    async Init() {
        const filenamify = (await import('filenamify')).default;
        this.#path = `flatfiledb_${filenamify(this.#name)}.json`;
    }

    async GetAllItems() {
        return (await this.#GetDB()).rows;
    }

    async AddItem(value) {
        var db = await this.#GetDB();
        var obj = {value, id:db.id++};
        db.rows.push(obj);
        await this.#SaveDB(db);
    }

    async UpdateItem(id, value) {
        var db = await this.#GetDB();
        db.rows.forEach(o => {
            if (o.id === id) {
                o.value = value; // update in-memory list
            }
        });
        await this.#SaveDB(db);
    }

    async RemoveItem(id) {
        var db = await this.#GetDB();
        db.rows = db.rows.filter(x => x.id !== id);
        await this.#SaveDB(db);
    }

    async RemoveAllItems() {
        var db = await this.#GetDB();
        db.rows = [];
        await this.#SaveDB(db);
    }
};