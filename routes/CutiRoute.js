import express from "express";
import { getCuti, getCutiDate, createCuti, updateCuti, deleteCuti } from "../controllers/CutiController.js";

const router = express.Router();

router.get('/cuti/all', getCuti);
router.get('/cuti', getCutiDate);
router.post('/cuti', createCuti);
router.patch('/cuti/:id', updateCuti)
router.delete('/cuti/:id', deleteCuti)

export default router;