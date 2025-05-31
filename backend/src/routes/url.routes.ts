/*POST	/short	Create short URL (done)
GET	/:shortId	Redirect to original URL
GET	/analytics/:id	Show analytics for a short URL
GET	/my-urls	List all URLs of logged-in user (protected)*/

import express from "express";
import { analytics, short, redirectToOriginalUrl } from "../controllers/url.controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post('/short',authMiddleware,short);                      
router.get('/:redirect', redirectToOriginalUrl);                  
router.get('/analytics/:id',authMiddleware, analytics);          

export default router;