import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import{newRefer} from './controllers/referController.js'


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.send(" Api is running fine...");
});

// Referral Submission Endpoint
app.post("/api/refer",newRefer)

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
