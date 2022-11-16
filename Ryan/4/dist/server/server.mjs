import express from "express";
import * as http from "http";
import * as path from "path";
import FlatFileDB from "./flatfile.mjs";
import { fileURLToPath } from 'url';
import argvm from 'minimist';
const argv = argvm(process.argv.slice(2));
const storages = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 3002, function () {
    const address = httpServer.address();
    const host = typeof address === 'string' ? address : address?.address;
    const port = typeof address === 'string' ? address : address?.port;
    console.log('Todo list app started at https://%s:%s', host, port);
});
if (argv.k === "development") {
    const { Server } = await import("socket.io");
    const io = new Server(httpServer);
    app.get("/reload", (req, res) => {
        io.emit('reload');
        res.end("ok");
    });
}
app.get("/init", async (req, res) => {
    try {
        const name = req.query.name;
        const storage = new FlatFileDB(name);
        storages[name] = storage;
        await storage.Init();
        res.end();
    }
    catch (err) {
        SendError(err, req, res);
    }
});
app.get("/item", async (req, res) => {
    try {
        const name = req.query.name;
        const storage = storages[name];
        res.json(await storage.GetAllItems());
    }
    catch (err) {
        SendError(err, req, res);
    }
});
app.post("/item", async (req, res) => {
    try {
        const name = req.query.name;
        const storage = storages[name];
        await storage.AddItem(req.body.value);
        res.end();
    }
    catch (err) {
        SendError(err, req, res);
    }
});
app.put("/item", async (req, res) => {
    try {
        const id = parseInt(req.query.id, 10), name = req.query.name;
        const storage = storages[name];
        await storage.UpdateItem(id, req.body.value);
        res.end();
    }
    catch (err) {
        SendError(err, req, res);
    }
});
app.delete("/item", async (req, res) => {
    try {
        const id = parseInt(req.query.id, 10), name = req.query.name;
        const storage = storages[name];
        if (req.query.id) {
            await storage.RemoveItem(id);
        }
        else {
            await storage.RemoveAllItems();
        }
        res.end();
    }
    catch (err) {
        SendError(err, req, res);
    }
});
function SendError(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
}
