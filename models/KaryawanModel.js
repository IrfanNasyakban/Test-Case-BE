import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Cuti from "./CutiModel.js";

const { DataTypes } = Sequelize;

const Karyawan = db.define('karyawan', {
    nomorInduk: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    nama: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    tglLahir: {
        type: DataTypes.DATE
    },
    tglGabung: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true
});

Karyawan.hasMany(Cuti, { foreignKey: 'nomorInduk' });
Cuti.belongsTo(Karyawan, { foreignKey: 'nomorInduk' });

export default Karyawan;

(async()=> {
    await db.sync();
})();