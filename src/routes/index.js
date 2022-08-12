import express from 'express';
let router = express.Router();
import { getEcoles, createEcole, getEcole } from '../controllers/ecoles.js';
import { getStudents, createStudent, getStudent, updateStudent } from '../controllers/students.js';

router.route('/students').get(getStudents).post(createStudent);
router.route('/students/:id').get(getStudent).patch(updateStudent);
router.route('/ecoles').get(getEcoles).post(createEcole);
router.route('/ecoles/:id').get(getEcole);
export default router;
