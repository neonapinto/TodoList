import {Row, Storage} from './util';

interface params{
    [key:string]:string;
}

export default class Server implements Storage{
    #name: string;

    constructor(name:string) {
        this.#name = name;
    }
    
    #GetURL(endpoint:string, params:params={}) {
        const url = new URL(endpoint, window.location.origin);
        params.name = this.#name;
        for (const k in params) { 
            url.searchParams.append(k, params[k]); 
        }
        return url;
    }

    async Init(): Promise<void> {
        
    }

    async GetAllItems(): Promise<Row[]> {
        return await (await fetch(this.#GetURL("/item"))).json();
    }

    async AddItem(value: string): Promise<void> {
        await fetch(this.#GetURL("/item"), {
            method:"POST",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async UpdateItem(value: string, id: number): Promise<void> {
        await fetch(this.#GetURL("/item", {id:id.toString()}), {
            method:"PUT",
            body:JSON.stringify({value}),
            headers:{
                "content-type":"application/json"
            }
        });
    }

    async RemoveItem(id: number): Promise<void> {
        await fetch(this.#GetURL("/item", {id:id.toString()}), {
            method:"DELETE"
        });
    }

    async RemoveAll(): Promise<void> {
        await fetch(this.#GetURL("/item"), {
            method:"DELETE"
        });
    }


}