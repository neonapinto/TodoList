import StorageLS from "./localstorage"; // local storage API strategy implementation
import StorageIDB from "./indexeddb";    // indexed DB storage API strategy implementation
import StorageSS from "./server";    // server side storage API strategy implementation
import {Row, Storage} from "./utils.js";
import Vue, {ref, watch} from "vue";
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import Cookies from 'js-cookie';
import template from './component.html';
import { io } from "socket.io-client";

(async () => {
    
    const socket = io();
    socket.on("reload", () => {
        window.location.reload();
    });

    const TodoList = {
        template:await (await fetch(template)).text(),
        setup() {
            
            // reactive props
            const selectedStorage = ref(Cookies.get('storage') ?? "server");
            const items = ref(<Row[]> []);
            const name = ref("todoList"); 
            const storage = ref(<Storage | null> null);
            const headers = ref([
                { text: 'Task', value: 'value' },
                { text: 'Update', value: 'update', sortable: false, width: "50px" },
                { text: 'Delete', value: 'delete', sortable: false, width: "50px" }
            ]);
            const snackbar = ref({
                open:false,
                text:"",
                timeout: 2000
            });
            
            // non-reactive props
            const storages:{
                [key:string]:{ [key:string]:Storage };
            } = {};

            // methods
            const ChangeEngine = async () => {  
                const sname = selectedStorage.value === "localstorage" ? StorageLS : 
                              (selectedStorage.value === "indexeddb" ? StorageIDB : 
                              (selectedStorage.value ==="server" ? StorageSS : null));
                if (sname) {
                    let store = storages?.[selectedStorage.value]?.[name.value];
                    if (!store) {
                        storages[selectedStorage.value] = storages[selectedStorage.value] ?? {};
                        storages[selectedStorage.value][name.value] = storages[selectedStorage.value][name.value] ?? Object.freeze(new sname(name.value));
                        store = storages[selectedStorage.value][name.value];
                        await store.Init();
                    }
                    storage.value = store;
                    snackbar.value.text = `Using ${selectedStorage.value} engine with name "${name.value}"`;
                    snackbar.value.open = false;
                    Cookies.set('storage', selectedStorage.value, { expires: 7 });
                    await Refresh();
                    snackbar.value.open = true;
                }
            };

            const AddItem = async () => {
                let input = prompt('Enter a todo task:');
                if (input && input.trim() && storage.value) { // if its a valid value
                    input = input.trim(); // trim value 
                    await storage.value.AddItem(input); // add item to storage
                    await Refresh(); // refresh DOM
                }
            };

            const DeleteItems = async () => {
                if (confirm("Are you sure you want to remove all items?") && storage.value) { // check with user
                    await storage.value.RemoveAllItems(); // clear list from storage
                    await Refresh(); // refresh DOM
                }
            };

            const Refresh = async () => {
                if (storage.value) {
                    items.value = await storage.value.GetAllItems(); // get data from storage (assume it could have been modified from other sources)
                }
            };

            const UpdateItem = async (obj:Row) => {
                let input = prompt('Enter a todo task:', obj.value); // show original value in prompt
                if (input && input.trim() && storage.value) { // if its a valid value
                    input = input.trim(); // trim value
                    await storage.value.UpdateItem(obj.id, input); // update item in storage
                    await Refresh(); // refresh DOM
                }
            };

            const DeleteItem = async (obj:Row) => {
                if (confirm("Are you sure you want to remove this?") && storage.value) { // check with user
                    await storage.value.RemoveItem(obj.id); // remove from storage
                    await Refresh(); // refresh DOM
                }
            };

            // watchers
            watch(()=>selectedStorage.value, ChangeEngine);
            watch(()=>name.value, ChangeEngine, {immediate:true});

            // return everything
            return {
                // reactive data
                selectedStorage, items, name, storage, headers, snackbar,
                // methods
                AddItem, DeleteItems, Refresh, UpdateItem, DeleteItem
            };
        }
    };

    Vue.use(Vuetify);

    new Vue({
        vuetify:new Vuetify({
            icons: {
                iconfont: 'md'
            }
        }),
        render: h => h(TodoList)
    }).$mount("#app");
})();