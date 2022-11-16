import {ActionTypes} from '../action-types/index'


interface Add{
    type: ActionTypes.ADD;
    payload: object;
}

interface Update{
    type: ActionTypes.UPDATE;
    payload: object;
}

interface Delete{
    type: ActionTypes.DELETE;
    payload: object;
}

interface Remove_All{
    type: ActionTypes.REMOVE_ALL;
}

interface Refresh{
    type: ActionTypes.REFRESH;
}

interface Get{
    type: ActionTypes.GET;
}

interface Change_Name{
    type: ActionTypes.CHANGE_NAME;
    payload: string;
}

interface Change_DB{
    type: ActionTypes.CHANGE_DB;
    payload: string;
}

export type Action = Add | Delete | Update | Remove_All | Refresh | Get | Change_DB | Change_Name




