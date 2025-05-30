/*POST	/short	Create short URL (done)
GET	/:shortId	Redirect to original URL
GET	/analytics/:id	Show analytics for a short URL
*/
import { Request, Response } from "express";
import UrlModel from "../models/Url.model";
import { generateId } from "../utils/generateId";
import UserModel from "../models/User.model";
import mongoose from "mongoose";
import { getGeoLocation } from "../utils/getGeoLocation";


export const short = async (req: Request, res: Response): Promise<void> => {
    try {
        const { url } = req.body;
        const userID = req.userId;
        const user = await UserModel.findById(userID);
        if (!user) {
            res.status(400).json({
                success: false,
                error: "User not Found"
            })
            return;
        }
        const newURL = new UrlModel(
            {
                originalUrl:url,
                shortId: generateId(6),
                user: user._id,
            }
        )
        const savedUrl = await newURL.save();

        user.urls?.push(savedUrl._id as mongoose.Types.ObjectId);
        await user.save();
        res.status(200).json({
            success: true,
            message: "URL saved",
            shortId: savedUrl.shortId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error
        })
    }

}

export const redirectToOriginalUrl = async (req: Request, res: Response): Promise<void> => {
    try {
        const { redirect } = req.params;
        console.log(redirect)
        const url = await UrlModel.findOne({ shortId: redirect });

        if (!url) {
            res.status(404).json({ success: false, error: "URL not found" });
            return;
        }

        // Get IP address
        const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';

        // Get Geo Info
        const geoInfo = await getGeoLocation(ip);

        // Push analytics
        const analyticsEntry = {
            ipAddress: geoInfo.ipAddress,
            country: geoInfo.country,
            userAgent: req.get("User-Agent"),
            timestamp: new Date(),
        };

        if (!url || typeof url.clicks !== "number") {
            res.status(404).json({
                success: false,
                error: "URL not found or clicks not initialized"
            });
            return;
        }
        if (!url.analytics) {
            url.analytics = [];
        }

        url.clicks += 1;
        url.analytics.push(analyticsEntry);
        await url.save();

        // res.redirect(url.originalUrl.toString());
        res.status(400).json({ success: true, url : url.originalUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error });
    }
};

export const analytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(id)
        const url = await UrlModel.findOne({ shortId: id });

        if (!url) {
            res.status(404).json({
                success: false,
                error: "URL not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            totalClicks: url.clicks,
            analytics: url.analytics,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: "Server error",
        });
    }
};
