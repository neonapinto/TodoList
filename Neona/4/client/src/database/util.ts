export interface Row{
    id: number,
    value: string
};

export interface Storage{
    Init(): Promise<void>;
    GetAllItems() : Promise<Array<Row>>;
    AddItem(value:string) : Promise<void>;
    RemoveItem(id:number):Promise<void>;
    UpdateItem(value:string, id: number) : Promise<void>;
    RemoveAll(): Promise<void>;
}