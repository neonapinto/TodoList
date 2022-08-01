import StorageLS from "./localstorage.js"; // local storage API strategy implementation
import StorageIDB from "./indexeddb.js";    // indexed DB storage API strategy implementation
import StorageSS from "./server.js";    // server side storage API strategy implementation

(() => {

    var name = "todoList", storage;

    // declare storage engines
    var storageLS, storageIDB, storageSS;

    // declare variables for todo item id, todo list, and main list DOM element 
    var todoContainer = document.getElementById("todo-list");

    // set up click events
    [...document.querySelectorAll('input[type="radio"][name="storage"]')].forEach(input => {
        input.addEventListener('input', async (e) => {
            switch(e.target.value) {
                case "localstorage":
                    if (!storageLS) {
                        storageLS = new StorageLS(name);
                        await storageLS.Init();
                    }
                    storage = storageLS;
                    break;
                case "indexeddb":
                    if (!storageIDB) {
                        storageIDB = new StorageIDB(name);
                        await storageIDB.Init();
                    }
                    storage = storageIDB;
                    break;
                case "server":
                    if (!storageSS) {
                        storageSS = new StorageSS(name);
                        await storageSS.Init();
                    }
                    storage = storageSS;
                    break;
                default:
                    return;
            }
            await Refresh();
        });

        // if checked, manually run the click event
        if (input.checked) {
            input.dispatchEvent(new Event('input', {bubbles:true}));
        }
    });

    document.getElementById("add-button").addEventListener("click", async (e) => {
        var input = prompt('Enter a todo task:');
        if (input && input.trim()) { // if its a valid value
            input = input.trim(); // trim value 
            await storage.AddItem(input); // add item to storage
            await Refresh(); // refresh DOM
        }
    });

    document.getElementById("refresh-button").addEventListener("click", async (e) => {
        await Refresh(); // refresh DOM
    });

    document.getElementById("delete-all-button").addEventListener("click", async (e) => {
        if (confirm("Are you sure you want to remove all items?")) { // check with user
            await storage.RemoveAllItems(); // clear list from storage
            await Refresh(); // refresh DOM
        }
    });

    async function Refresh() {
        var data = await storage.GetAllItems(); // get data from storage (assume it could have been modified from other sources)
        LoadUI(data); // refresh UI
    }

    function LoadUI(todoList) {
        // clear contents from the main list DOM element
        todoContainer.replaceChildren();
        // add items to main list DOM element
        todoList.forEach(AddItemToPage);
    }

    function AddItemToPage(obj) {
        // create div for the todo text
        const todo = document.createElement("div");
        todo.innerText = obj.value;
        todo.style.display="inline";
        todo.style.padding="5px";

        // create update button for todo item
        const updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", async (e) => {
            await UpdateItem(obj);
        });

        // create delete button for todo item
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", async (e) => {
            await RemoveItem(obj);
        });

        // create container div for text and 2 buttons
        const container = document.createElement("div");
        container.append(todo, updateButton, deleteButton);

        // add container div to main list DOM element
        todoContainer.append(container);
    }

    async function UpdateItem(obj) {
        var input = prompt('Enter a todo task:', obj.value); // show original value in prompt
        if (input && input.trim()) { // if its a valid value
            input = input.trim(); // trim value
            await storage.UpdateItem(obj.id, input); // update item in storage
            await Refresh(); // refresh DOM
        }
    }

    async function RemoveItem(obj) {
        if (confirm("Are you sure you want to remove this?")) { // check with user
            await storage.RemoveItem(obj.id); // remove from storage
            await Refresh(); // refresh DOM
        }
    }
})();