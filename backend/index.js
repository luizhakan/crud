"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const sequelize_1 = require("./db/sequelize");
const People_1 = require("./schema/People");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Add express.json middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.get("/", (req, res) => {
    fs_1.default.readFile("./db.json", "utf-8", (err, data) => {
        res.send(data);
    });
});
app.post("/create", (req, res) => {
    const { name, age } = req.body;
    // Validations
    if (!name || !age) {
        res.status(400).send("Name and age are required");
        return;
    }
    else if (isNaN(age)) {
        res.status(400).send("Age must be a number");
        return;
    }
    else {
        People_1.People.create({ name, age }).then((people) => {
            res.send(people);
        });
    }
});
// Perform database query
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize_1.db.sync();
            yield sequelize_1.db.authenticate();
            console.log("Connection has been established successfully.");
            const people = yield People_1.People.findAll();
            const peoples = [...people];
            console.log(peoples);
            // fs.writeFile("./db.json", JSON.stringify(peoples), (err) => {
            //   if (err)
            //     throw err;
            // })
            app.listen(3000, () => {
                console.log("Server running on port 3000");
            });
        }
        catch (error) {
            console.log("Error connecting to the database:", error);
        }
    });
}
startServer();
