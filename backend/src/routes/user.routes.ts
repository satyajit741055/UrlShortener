import express from "express"
import { login, signup, userInfo } from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/auth"


const router = express.Router()
/*POST	/register	Register a user 
POST	/login	Log in, return token
POST	/logout	Log out (optional for token-based auth)
GET	/me	Get logged-in user info*/

router.post('/signup', signup)

router.post('/login', login)


 
router.get('/me',authMiddleware,userInfo)



export default router;