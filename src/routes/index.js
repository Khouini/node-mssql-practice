import express from 'express';
let router = express.Router();
import { getEcoles, createEcole, getEcole, updateEcole, deleteEcole } from '../controllers/ecoles.js';
import { getStudents, createStudent, getStudent, updateStudent, deleteStudent } from '../controllers/students.js';

router.route('/students').get(getStudents).post(createStudent);
router.route('/students/:id').get(getStudent).patch(updateStudent).delete(deleteStudent);
router.route('/ecoles').get(getEcoles).post(createEcole);
router.route('/ecoles/:id').get(getEcole).patch(updateEcole).delete(deleteEcole);
export default router;
