/**
 * importing different modules storing todolist data using client side storage api.
 */

// import Storage  from  './modules/localstorage.js'  //local storage api strategy implementation
import Storage from  './modules/indexdb.js' //indexdb storage api strategy implementation

/**
 * self anonymous function
 */
(async () =>{

    const dbObj = new Storage(); //create new object for Storage class
    await dbObj.initialization(); //init function to load the data

    const todo_container = document.getElementById("list-container"); //container which holds todolist

    //refresh button to refresh dom with updated data
    document.getElementById('refresh-btn').addEventListener('click', async ()=>{
        await loadUi(todo_container); // refresh dom
    });


    //to add elements to todolist
    document.getElementById('add-btn').addEventListener('click', async ()=>{
        let input = prompt('Enter the new item'); //enter value
        if(input && input.trim()){ //validate input
            input = input.trim(); //remove whitespaces
            await dbObj.addItem(input); //add item to storage
            await loadUi(todo_container); //refresh dom
        }
    });

    //delete all items in the todolist
    document.getElementById('delete-all-btn').addEventListener('click', async ()=>{
        if(confirm("Are you sure you want to delete all items?")){
            await dbObj.deleteItems(); //delete all items from storage
            await loadUi(todo_container); //refresh dom
        }
    });

    //refresh dom and load data from storage
    async function loadUi(todo_container){
        todo_container.replaceChildren(); //clear dom elements
        let todoList = await dbObj.loadData(); //load data from storage
        todoList.forEach(AddItemToDOM); //add items with new data
    }

    //creating dom elements
    function AddItemToDOM(todoListObj){
        //container for each item
        const container = document.createElement('div');

        //user input element
        const div = document.createElement('div');
        div.innerText = todoListObj.value;

        //update button
        const updatebtn = document.createElement('button');
        updatebtn.innerText = 'Update'
        updatebtn.addEventListener('click', async()=>{
            await updateItem(todoListObj.id);
        });

        //delete button
        const deletebtn = document.createElement('button');
        deletebtn.innerHTML = 'Delete'
        deletebtn.addEventListener('click', async ()=>{
           await deleteItem(todoListObj.id);
        });

        //append to the container
        container.append(div, updatebtn, deletebtn);
        todo_container.append(container); 
    }

    //update the item 
    async function updateItem(id){
        let input = prompt("enter the updated value");
        if(input && input.trim()){ //validate input
            input = input.trim(); //clear whitespace
            await dbObj.updateItem(id, input); //update data in storage
            await loadUi(todo_container); //refresh dom
        }
    }

    //delete item
    async function deleteItem(id){
        await dbObj.deleteItem(id); //delete item in storage
        await loadUi(todo_container); //refresh dom
    }

    await loadUi(todo_container); //refresh dom 
})();
