import { promises as fs } from "fs";
import filenamify from "filenamify";
import { Row, Storage } from "./utils.mjs";

interface Table {
    id:number;
    rows:Array<Row>;
}

export default class FlatFileDB implements Storage {
    
    #name;
    #path = "flatfiledb.json";

    constructor(name:string) {
        this.#name = name;
    }

    async #GetDB() {
        let contents:Table;
        if (await this.#FileExists(this.#path)) {
            const contents_raw = await fs.readFile(this.#path);
            contents = JSON.parse(contents_raw.toString());
        } else {
            contents = {id:1, rows:[]};
            await fs.writeFile(this.#path, JSON.stringify(contents));
        }
        return contents;
    }

    async #SaveDB(db:Table) {
        await fs.writeFile(this.#path, JSON.stringify(db));
    }

    async #FileExists(path:string) {
        return !!(await fs.stat(path).catch(() => false));
    }

    async Init() {
        this.#path = `flatfiledb_${filenamify(this.#name)}.json`;
    }

    async GetAllItems() {
        return (await this.#GetDB()).rows;
    }

    async AddItem(value:string) {
        const db = await this.#GetDB();
        const obj = {value, id:db.id++};
        db.rows.push(obj);
        await this.#SaveDB(db);
    }

    async UpdateItem(id:number, value:string) {
        const db = await this.#GetDB();
        db.rows.forEach(o => {
            if (o.id === id) {
                o.value = value; // update in-memory list
            }
        });
        await this.#SaveDB(db);
    }

    async RemoveItem(id:number) {
        const db = await this.#GetDB();
        db.rows = db.rows.filter(x => x.id !== id);
        await this.#SaveDB(db);
    }

    async RemoveAllItems() {
        const db = await this.#GetDB();
        db.rows = [];
        await this.#SaveDB(db);
    }
}