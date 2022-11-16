import ServerStorage from "../../database/serverStorage";
import IndexStorage from "../../database/indexStorage";
import LocalStorage from "../../database/localStorage";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Row, Storage } from "../../database/util";


interface todolistState{
    name: string;
    database: Storage | null;
    type: string | null;
    tasks: Array<Row>;
}



const initialState: todolistState = {name: "todolist", database: null, type: null, tasks: []};

const chooseDb = async (state: todolistState , payload : string) =>{
    switch(payload){
        case "localdb": 
            state.database = new LocalStorage(state.name);
            break;
        case "indexdb":
            state.database = new IndexStorage(state.name);
            break;
        case "serverdb":
            state.database = new ServerStorage(state.name);
            break;
        default: return;
    }
    await state.database.Init();
    state.tasks = await getItems(state);
}

const getItems = async(state: todolistState) =>{
    if(state.database){
       return await state.database.GetAllItems();
    }
    else{
        throw new Error("Database is null.");
    }
}

const reducer = async(state = initialState, action: Action) => {
    switch(action.type){
        case ActionTypes.GET: {
            state.tasks =  await getItems(state);
            break;
        }
        case ActionTypes.ADD: 
            //value
            //s.add(value)
            //try to update a state {...}
            break;
        case ActionTypes.UPDATE: 

            break;
        case ActionTypes.DELETE: 
            break;
        case ActionTypes.REMOVE_ALL: 
            break;
        case ActionTypes.REFRESH:  
            break;
        case ActionTypes.CHANGE_NAME:{
            state.name = action.payload;
            await chooseDb(state, action.payload);
            break;
        }
        case ActionTypes.CHANGE_DB:{
            //singleton class
            await chooseDb(state, action.payload);
            break;
        }
        default:
                // throw new Error("Invalid Action type");
                return;
    }
    return state;
}

export default reducer;