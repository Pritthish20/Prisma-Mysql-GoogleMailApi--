import { PrismaClient } from "@prisma/client";

import {sendReferralEmail} from '../utils/sendReferralEmail.js'

const prisma = new PrismaClient();

export const newRefer=async(req,res,next)=>{
    const { name, email, referredBy, courseName } = req.body;

    if (!name || !email|| !referredBy || !courseName) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newReferral = await prisma.referrals.create({
            data: {
                name,
                email,
                referredBy,
                courseName,
            },
        });

        await sendReferralEmail( name,email, referredBy, courseName);
        
        res.status(201).json({ message: "Referral submitted successfully.", referral: newReferral });
    } catch (error) {
        console.error("Error saving referral:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}