import express from 'express';
import { signupValidation } from '../middlewares/AuthValidation.js';
import signupController from '../controllers/signupController.js'; 

const router = express.Router();
router.post('/', signupValidation, signupController);

export default router;
