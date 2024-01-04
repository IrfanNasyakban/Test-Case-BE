import { Sequelize } from "sequelize";

const db = new Sequelize('test_case_1', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;