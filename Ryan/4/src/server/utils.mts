export interface Row {
    id:number;
    value:string;
}

export interface Storage {

    Init():Promise<void>;

    GetAllItems():Promise<Array<Row>>

    AddItem(value:string):Promise<void>;

    UpdateItem(id:number, value:string):Promise<void>;

    RemoveItem(id:number):Promise<void>;

    RemoveAllItems():Promise<void>;
}