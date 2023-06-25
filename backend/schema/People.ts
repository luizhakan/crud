import { Sequelize, DataType, DataTypes } from "sequelize";
import { db } from "../db/sequelize";

export const People = db.define("people", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
