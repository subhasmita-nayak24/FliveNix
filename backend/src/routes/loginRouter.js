import express from 'express';
import { loginValidation } from '../middlewares/AuthValidation.js'; 
import loginController from '../controllers/loginController.js';

const router = express.Router();
router.post('/', loginValidation,loginController);

export default router;

