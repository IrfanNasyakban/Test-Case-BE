import express from "express";
import { getKaryawan, getKaryawanNoInduk, createKaryawan, updateKaryawan, deleteKaryawan } from "../controllers/KaryawanController.js";

const router = express.Router();

router.get('/karyawan', getKaryawan);
router.get('/karyawan/:nomorInduk', getKaryawanNoInduk);
router.post('/karyawan', createKaryawan);
router.patch('/karyawan/:nomorInduk', updateKaryawan)
router.delete('/karyawan/:nomorInduk', deleteKaryawan)

export default router;