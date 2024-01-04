import Karyawan from "../models/KaryawanModel.js";
import Cuti from "../models/CutiModel.js";
import moment from 'moment';
import { Op } from "sequelize"

export const getKaryawan = async (req, res) => {
    try {
        const search = req.query.search_query || ""

        const karyawan = await Karyawan.findAll({
            where: {
                [Op.or]: [{
                    nama: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        const formattedKaryawan = karyawan.map((item, index) => {
            const formattedItem = {
                No: index + 1,
                ...item.toJSON(),
                tglLahir: moment(item.tglLahir).format('DD-MMM-YY'),
                tglGabung: moment(item.tglGabung).format('DD-MMM-YY')
            };

            return Object.keys(formattedItem).sort((a, b) => {
                if (a === 'No') return -1;
                if (b === 'No') return 1;
                return 0;
            }).reduce((obj, key) => {
                obj[key] = formattedItem[key];
                return obj;
            }, {});
        });

        res.json(formattedKaryawan);
    } catch (error) {
        console.log(error);
    }
};

export const getKaryawanNoInduk = async (req, res) => {
    try {
        const { nomorInduk } = req.params;

        const karyawan = await Karyawan.findAll({
            where: {
                nomorInduk: nomorInduk
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Cuti,
                attributes: ['tglCuti', 'lamaCuti', 'keterangan']
            }]
        });
        
        const formattedKaryawan = karyawan.map((item, index) => {
            const formattedItem = {
                No: index + 1,
                ...item.toJSON(),
                tglLahir: moment(item.tglLahir).format('DD-MMM-YY'),
                tglGabung: moment(item.tglGabung).format('DD-MMM-YY'),
            };

            return Object.keys(formattedItem).sort((a, b) => {
                if (a === 'No') return -1;
                if (b === 'No') return 1;
                return 0;
            }).reduce((obj, key) => {
                obj[key] = formattedItem[key];
                return obj;
            }, {});
        });
        res.json(formattedKaryawan);
    } catch (error) {
        console.log(error);
    }
};

export const createKaryawan = async (req, res) => {
    const { nomorInduk, nama, alamat, tglLahir, tglGabung } = req.body;
    try {
        const formattedTglLahir = moment.utc(tglLahir, 'DD-MMM-YY').toDate();
        const formattedTglGabung = moment.utc(tglGabung, 'DD-MMM-YY').toDate();

        await Karyawan.create({
            nomorInduk: nomorInduk,
            nama: nama,
            alamat: alamat,
            tglLahir: formattedTglLahir,
            tglGabung: formattedTglGabung
        });

        res.json({ msg: "Data Created" });
    } catch (error) {
        console.log(error);
    }
};

export const updateKaryawan = async (req, res) => {
    try {
        if (req.body.tglLahir) {
            req.body.tglLahir = moment.utc(req.body.tglLahir);
        }
        if (req.body.tglGabung) {
            req.body.tglGabung = moment.utc(req.body.tglGabung);
        }

        await Karyawan.update(req.body, {
            where: {
                nomorInduk: req.params.nomorInduk
            }
        })
        res.status(200).json({ msg: "Karyawan Updated" })
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteKaryawan = async (req, res) => {
    try {
        await Karyawan.destroy({
            where: {
                nomorInduk: req.params.nomorInduk,
            },
        });
        res.status(200).json({ msg: "Karyawan Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};