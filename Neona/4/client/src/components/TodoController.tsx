import { useState, FC } from 'react'
import IndexStorage from '../database/indexStorage'
import LocalStorage from '../database/localStorage'
import Server from '../database/serverStorage'
import { Row } from '../database/util'
import { DBType } from '../utils/Dbtypes'
import Database from '../DatabasePanel/DatabasePanel'
import Header from './Header/Header'
import Tasks from './Tasks/Tasks'
import Box from '@mui/material/Box';


const TodoController:FC = () => {
    const [databaseType, setDatabaseType] = useState("");
    const [databaseName, setDatabaseName] = useState("");
    const [todoList, setTodoList] = useState<Row[]>([]);
    const [dbObject, setDbObject] = useState<LocalStorage | IndexStorage | Server>();

    const databaseDetails = {
        type: databaseType,
        name: databaseName
    }

    const handleDbName = (name: string) => {
        setDatabaseName(name);
    }
    const handleDbType = async (type: string) =>{
        setDatabaseType(type);
        await handleDBUpdate(type);
    }

    const handleDBUpdate = async(type: string) =>{
        let dbObj;
        if(databaseName){
            if(type === DBType.localdb){
                dbObj = new LocalStorage(databaseName);
            }
            else if(type === DBType.indexdb){
                dbObj = new IndexStorage(databaseName);
            }
            else if(type === DBType.serverdb){
                dbObj = new Server(databaseName);
            }
            setDbObject(dbObj);
            await dbObj?.Init();

            let todoList = await dbObj?.GetAllItems();
            if(!todoList)
                todoList = [];
            setTodoList(todoList);
        }
    }

    const updateTodoList = async () =>{
        let todoList = await dbObject?.GetAllItems();
        if(!todoList)
            todoList = [];
        setTodoList(todoList);
    }

    const addItem = async (value: string) =>{
        console.log(dbObject);
        await dbObject?.AddItem(value);
        await updateTodoList();
    }

    const removeAll = async() =>{
        await dbObject?.RemoveAll();
        await updateTodoList();
    }

    const updateItem = async(id: number, value: string) =>{
        await dbObject?.UpdateItem(value, id);
        await updateTodoList();
    }

    const deleteItem = async(id: number) =>{
        await dbObject?.RemoveItem(id);
        await updateTodoList();
    }
    

    return (
        <>
            <Header refresh={updateTodoList} addItem={addItem} removeAll={removeAll}/>
            <Box sx={{m: 1}}>
                <Database handleDbName={handleDbName} handleDbType={handleDbType}  databaseDetails={databaseDetails}/>
                <Tasks todoList={todoList} updateItem={updateItem} deleteItem={deleteItem}/>
            </Box>
        </>
    )
}

export default TodoController