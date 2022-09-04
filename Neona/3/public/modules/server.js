export default class ServerStorage {
  #name;

  constructor(name) {
      this.#name = name;
  }

  /**
   * initialize the api call
   */
  async initialization() {
      await fetch("/init?name=" + encodeURIComponent(this.#name));
  }

  /**
   * load data
   * @returns todolist
   */
  async loadData() {
      return await (await fetch("/item?name=" + encodeURIComponent(this.#name))).json();
  }

  
  /**
   * add function to add all items
   */
  async addItem(value) {
      await fetch("/item?name=" + encodeURIComponent(this.#name), {
          method:"POST",
          body:JSON.stringify({value}),
          headers:{
              "content-type":"application/json"
          }
      });
  }

  
  /**
   * update function to update an item's value
   */
  async updateItem(id, value) {
      await fetch("/item?id=" + id + "&name=" + encodeURIComponent(this.#name), {
          method:"PUT",
          body:JSON.stringify({value}),
          headers:{
              "content-type":"application/json"
          }
      });
  }

  
  /**
   * delete function to delete an item
   */
  async deleteItem(id) {
      await fetch("/item?id=" + id + "&name=" + encodeURIComponent(this.#name), {
          method:"DELETE"
      });
  }

  /**
   * delete function to delete all items
   */
  async deleteItems() {
      await fetch("/item?name=" + encodeURIComponent(this.#name), {
          method:"DELETE"
      });
  }
}