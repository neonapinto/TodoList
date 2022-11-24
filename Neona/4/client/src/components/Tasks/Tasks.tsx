import {FC, ReactElement} from "react";
import { Row } from "../../utils/Dbtypes";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodolistProps{
    todoList: Row[];
    updateItem: (id: number, value: string) => void;
    deleteItem: (id: number) => void;
}

const Tasks:FC<TodolistProps> = ({todoList, updateItem, deleteItem}):ReactElement =>{
    const handleUpdate = (id : number) =>{
        const value = prompt('Enter the updated value');
        if(value?.trim()){
            updateItem(id, value);
        }
    }

    const handleDelete = (id: number) =>{
        if(prompt('Are you sure you want to delete? enter yes.') === 'yes'){
            deleteItem(id);
        }
    }
        

    return(
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Task
                            </TableCell>
                            <TableCell component="th" scope="row" align="right">
                                Update
                            </TableCell>
                            <TableCell component="th" scope="row" style={{ width: 10 }} align="right">
                                Delete
                            </TableCell>
                        </TableRow>
                        {todoList.length > 0 && todoList.map((todoList) => (
                                <TableRow key={todoList.id}>
                                    <TableCell align="left">
                                        {todoList.value}
                                    </TableCell>
                                    <TableCell  align="right">
                                    <EditIcon onClick={() => handleUpdate(todoList.id)}/>
                                    </TableCell>
                                    <TableCell style={{ width: 10 }} align="right">
                                        <DeleteIcon onClick={() => handleDelete(todoList.id)}/>
                                    </TableCell>
                                </TableRow>
                        ))}
                        {todoList.length < 0 && 
                        <TableRow><TableCell>No available data</TableCell></TableRow>
                        }
                    </TableBody>

                </Table>
            </TableContainer>
        </Box>
    )
}

export default Tasks;