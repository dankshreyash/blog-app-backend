import express from 'express'
import { getAllUser, login, signup } from '../controllers/user-controller.js';


const router = express.Router();

router.get('/', getAllUser);  


//signup route for creating user
router.post('/signup', signup);   

//login route for existing user

router.post("/login", login)    


export default router;