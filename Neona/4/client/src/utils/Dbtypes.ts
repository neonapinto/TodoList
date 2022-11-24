export enum DBType {
    serverdb = 'serverdb',
    indexdb = 'indexdb',
    localdb =  'localdb'
}

export interface Row{
    id: number;
    value: string;
}