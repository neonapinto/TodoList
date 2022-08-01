export default class ServerStorage {

    #name;

    constructor(name) {
        this.#name = name;
    }

    async Init() {
        await fetch("/init?name=" + encodeURIComponent(this.#name));
    }

    async GetAllItems() {
        return await (await fetch("/item?name=" + encodeURIComponent(this.#name))).json();
    }

    async AddItem(value) {
        await fetch("/item?name=" + encodeURIComponent(this.#name), {
            method:"POST",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async UpdateItem(id, value) {
        await fetch("/item?id=" + id + "&name=" + encodeURIComponent(this.#name), {
            method:"PUT",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async RemoveItem(id) {
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