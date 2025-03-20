import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Configure OAuth2 Client
export const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Get new Access Token
export const getAccessToken = async () => {
    try {
        const { token } = await oAuth2Client.getAccessToken();
        if (!token) {
            throw new Error("Access token is null or undefined");
        }
        // console.log("New Access Token:", token);
        return token;
    } catch (error) {
        console.error("Error refreshing access token:", error.response?.data || error.message);
        // throw new Error("Failed to refresh access token");
    }
};

