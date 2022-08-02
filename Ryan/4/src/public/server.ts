import {Row, Storage} from "./utils.js";

interface params {
    [key:string]:string
}

export default class ServerStorage implements Storage {

    #name:string;

    constructor(name:string) {
        this.#name = name;
    }

    #GetURL(endpoint:string, params:params) {
        const url = new URL(endpoint, window.location.origin);
        for (const k in params) { 
            url.searchParams.append(k, params[k]); 
        }
        return url;
    }

    async Init() {
        await fetch(this.#GetURL("/init", {name:this.#name}));
    }

    async GetAllItems():Promise<Array<Row>> {
        return await (await fetch(this.#GetURL("/item", {name:this.#name}))).json();
    }

    async AddItem(value:string) {
        await fetch(this.#GetURL("/item", {name:this.#name}), {
            method:"POST",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async UpdateItem(id:number, value:string) {
        await fetch(this.#GetURL("/item", {id:id.toString(), name:this.#name}), {
            method:"PUT",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async RemoveItem(id:number) {
        await fetch(this.#GetURL("/item", {id:id.toString(), name:this.#name}), {
            method:"DELETE"
        });
    }

    async RemoveAllItems() {
        await fetch(this.#GetURL("/item", {name:this.#name}), {
            method:"DELETE"
        });
    }
}