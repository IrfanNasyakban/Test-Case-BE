import Cuti from "../models/CutiModel.js";
import moment from 'moment';
import { Op } from "sequelize"

export const getCuti = async (req, res) => {
    try {
        const cuti = await Cuti.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });
        const formattedCuti = cuti.map(item => {
            return {
                ...item.toJSON(),
                tglCuti: moment.utc(item.tglCuti).format('DD-MMM-YY')
            };
        });
        res.json(formattedCuti);
    } catch (error) {
        console.log(error);
    }
};

export const getCutiDate = async (req, res) => {
    try {
        const startDate = req.query.start_date || '';
        const endDate = req.query.end_date || '';

        const cuti = await Cuti.findAll({
            where: {
                tglCuti: {
                    [Op.gte]: startDate, 
                    [Op.lte]: endDate
                }
            },
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });

        const formattedCuti = cuti.map(item => {
            return {
                ...item.toJSON(),
                tglCuti: moment.utc(item.tglCuti).format('DD-MMM-YY')
            };
        });

        res.json(formattedCuti);
    } catch (error) {
        console.log(error);
    }
};

export const createCuti = async (req, res) => {
    const { nomorInduk, tglCuti, lamaCuti, keterangan } = req.body;
    try {
        const formattedTglCuti = moment.utc(tglCuti, 'DD-MMM-YY').toDate();

        await Cuti.create({
            nomorInduk: nomorInduk,
            tglCuti: formattedTglCuti,
            lamaCuti: lamaCuti,
            keterangan: keterangan
        });

        res.json({ msg: "Data Created" });
    } catch (error) {
        console.log(error);
    }
};

export const updateCuti = async (req, res) => {
    try {
        if (req.body.tglCuti) {
            req.body.tglCuti = moment.utc(req.body.tglCuti);
        }

        await Cuti.update(req.body, {
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Cuti Updated"})
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCuti = async (req, res) => {
    try {
        await Cuti.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Cuti Deleted" });
    } catch (error) {
        console.log(error.message);
    }
};