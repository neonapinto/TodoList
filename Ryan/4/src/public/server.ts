import {Row, Storage} from "./utils.js";

export default class ServerStorage implements Storage {

    #name:string;

    constructor(name:string) {
        this.#name = name;
    }

    async Init() {
        await fetch("/init?name=" + encodeURIComponent(this.#name));
    }

    async GetAllItems():Promise<Array<Row>> {
        return await (await fetch("/item?name=" + encodeURIComponent(this.#name))).json();
    }

    async AddItem(value:string) {
        await fetch("/item?name=" + encodeURIComponent(this.#name), {
            method:"POST",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async UpdateItem(id:number, value:string) {
        await fetch("/item?id=" + id + "&name=" + encodeURIComponent(this.#name), {
            method:"PUT",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async RemoveItem(id:number) {
        await fetch("/item?id=" + id + "&name=" + encodeURIComponent(this.#name), {
            method:"DELETE"
        });
    }

    async RemoveAllItems() {
        await fetch("/item?name=" + encodeURIComponent(this.#name), {
            method:"DELETE"
        });
    }
}