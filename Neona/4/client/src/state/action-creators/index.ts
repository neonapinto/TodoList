import { Dispatch } from "redux"
import { ActionTypes } from "../action-types"
import { Action } from "../actions"

export const Change_Name = (name: string) => {
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionTypes.CHANGE_NAME,
            payload: name
        })
    }
}

export const Change_DB = (db: string) => {
    return (dispatch: Dispatch<Action>) =>{
        dispatch({
            type: ActionTypes.CHANGE_DB,
            payload: db
        })
    }
}