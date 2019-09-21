var UserController = require("./controller/UserController");
var GitController = require("./controller/GitController");
var DatesController = require("./controller/DatesController");
var express = require("express");
var Router = express.Router();

Router.get("/", function (req, res) {
    res.json({
        "Status": "API is working fine!"
    });
});

Router.get("/usernames", async function (req, res) {
    res.json({ "d": await UserController.getUserNames() });
});

Router.get("/usernames/:id", async function (req, res) {
    res.json({ d: await UserController.getUserName(req.params.id) });
});

Router.post("/create", async function (req, res) {
    res.json({ d: await UserController.createUserName(req.body.Username) });
});

Router.put("/update/:id", async function (req, res) {
    res.json({ d: await UserController.updateUserName(req.params.id, req.body) });
});

Router.delete("/delete/:id", async function (req, res) {
    res.json({ d: await UserController.deleteUserName(req.params.id) });
});

Router.post("/dumpgitusers", async function (req, res) {
    res.json({ d: await GitController.fetchDatesAndDumpUsernames() });
});

Router.get("/getonedate/", async function (req, res) {
    res.json({ d: await DatesController.getSingleDate() });
});

Router.get("/get7date/", async function (req, res) {
    res.json({ d: await DatesController.get7Dates() });
});

Router.post("/dumpdates", async function (req, res) {
    res.json({ d: await DatesController.datesControl() });
});


// Router.put("/revertdateflag/:id", async function (req, res) {
//     res.json({ d: await DatesController.revertflags(req.params.id) });
// });

exports.Router = Router;