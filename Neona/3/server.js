const express = require('express'); //loading express package
const flatfile = require('./flatfile.js'); //importing flatfile class
let obj = new flatfile.FlatFile(); //instantiating object
var app = express(); //instantiating express

app.use(express.static('public')); //creating public route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * This responds a get request for the homepage
 */
app.get('/get_list', async(req, res) => {
      let list = await obj.getAll();
      res.send(list);
});

/**
 * This responds a POST request for the homepage
 */
app.post('/add_item', async(req, res) =>{
  let item = req.body;
  await obj.addItem(item.id, item.value);
  res.send(item); //res.json - > sending in form json not a text
});


/**
 * This responds a update request for the homepage
 */
app.patch('/update_item', async (req, res) => {
  let item = req.body;
  await obj.updateItem(item.id, item.value);
  res.send(item);
});

/**
 * This responds a DELETE a user request for the /del_user page.
 */
app.delete('/delete_item/', async(req, res) =>{
  let id = req.body;
  await obj.deleteItem(id);
  res.send(id);
});

/**
 *  This responds a DELETE all user request for the /del_user page.
 */
app.patch('/delete_all_items',  async (req, res) =>{
  await obj.deleteAll();
  res.send();
});


/**
 * starting the server
 */
const server = app.listen(3000,  () =>{
  const host = server.address().address
  const port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});
