import express from 'express'
import { getAllUser, login, signup } from '../controllers/user-controller.js';


const router = express.Router();

router.get('/', getAllUser);  //http://localhost:3000/api/user/


//signup route for creating user
router.post('/signup', signup);   //http://localhost:3000/api/user/signup

//login route for existing user

router.post("/login", login)    //http://localhost:3000/api/user/login


export default router;