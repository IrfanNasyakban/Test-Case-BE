import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Cuti = db.define('cuti', {
    nomorInduk: {
        type: DataTypes.STRING
    },
    tglCuti: {
        type: DataTypes.DATE
    },
    lamaCuti: {
        type: DataTypes.INTEGER
    },
    keterangan: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Cuti;

(async()=> {
    await db.sync();
})();