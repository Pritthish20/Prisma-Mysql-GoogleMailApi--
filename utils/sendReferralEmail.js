import { google } from "googleapis";
import { oAuth2Client, getAccessToken } from "./googleAuth.js";

export const sendReferralEmail = async (name,email, referredBy, courseName) => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            console.error("Failed to get access token.");
            return; 
        }

        oAuth2Client.setCredentials({ access_token: accessToken });
        const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

        const senderEmail = process.env.SENDER_EMAIL;

        const emailContent = [
            `From: "Refer & Earn" <${senderEmail}>`,
            `To: ${email}`,
            `Subject: Course Referral from ${referredBy}`,
            "MIME-Version: 1.0",
            "Content-Type: text/plain; charset=utf-8",
            "",
            `Hello ${name},

${referredBy} has referred you for the course: ${courseName}.

Best regards,
Team`,
        ].join("\n");

        const encodedMessage = Buffer.from(emailContent)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: encodedMessage },
        });

        // console.log("Referral email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
