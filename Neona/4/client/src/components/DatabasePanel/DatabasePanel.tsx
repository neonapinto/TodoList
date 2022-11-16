import React, { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { RootState } from "../../state/reducers";

interface Name_db {
    name: string,
    db: string
}

const Database: FC = () => {

    const state = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();
    const { Change_Name, Change_DB } = bindActionCreators(actionCreators, dispatch);

    const [editName, handleName] = useState<string>("");
    const [editDb, handleDb] = useState<string>("localdb");

    console.log(state);


    return (
        <div>
            <div>
                <h3>What database name do you want to connect to?</h3>
                <label>Name</label>
                <input type="text" value={editName} onChange={(e) => {
                    handleName(e.target.value);
                    Change_Name(e.target.name);
                }} />
            </div>
            <div>
                <input type="radio" id="localdb" name="localdb" value={editDb} checked={(editDb === 'localdb') ? true : false} onChange={(e) => handleDb(e.target.name)} />
                <label>Local Storage</label>
                <input type="radio" id="indexdb" name="indexdb" value={editDb} checked={(editDb === 'indexdb') ? true : false} onChange={(e) => handleDb(e.target.name)} />
                <label >Index Storage</label>
                <input type="radio" id="serverdb" name="serverdb" value={editDb} checked={(editDb === 'serverdb') ? true : false} onChange={(e) => handleDb(e.target.name)} />
                <label>Server Storage</label>
            </div>
        </div>
    )
}

export default Database;
