"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../db/sequelize");
exports.People = sequelize_2.db.define("people", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
