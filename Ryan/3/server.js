const express = require('express');
const http = require("http");
const path = require("path");
const FlatFileDB = require("./flatfile.js");

var storages = {};

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

var httpServer = http.createServer(app);

httpServer.listen(process.env.PORT || 3002, function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;

    console.log('Todo list app started at https://%s:%s', host, port);
});

app.get("/init", async (req, res, next) => {
    try {
        var storage = new FlatFileDB(req.query.name);
        storages[req.query.name] = storage;
        await storage.Init();
        res.end();
    } catch (err) {
        next(err);
    }
});

app.get("/item", async (req, res, next) => {
    try {
        var storage = storages[req.query.name];
        res.json(await storage.GetAllItems());
    } catch (err) {
        next(err);
    }
});

app.post("/item", async (req, res, next) => {
    try {
        var storage = storages[req.query.name];
        await storage.AddItem(req.body.value);
        res.end();
    } catch (err) {
        next(err);
    }
});

app.put("/item", async (req, res, next) => {
    try {
        var storage = storages[req.query.name];
        await storage.UpdateItem(JSON.parse(req.query.id), req.body.value);
        res.end();
    } catch (err) {
        next(err);
    }
});

app.delete("/item", async (req, res, next) => {
    try {
        var storage = storages[req.query.name];
        if (req.query.id) {
            await storage.RemoveItem(JSON.parse(req.query.id));
        } else {
            await storage.RemoveAllItems();
        }
        res.end();
    } catch (err) {
        next(err);
    }
});

app.use((error, req, res, next) => {
    res.status(500).json({message:error.message, stack:error.stack, path:req.path});
});