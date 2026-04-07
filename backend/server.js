const express = require("express");
const Journal = require("./models/Journal");
const User = require("./models/User");
const connectDB = require("./db.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config();

const app = express();
const PORT = 3000;
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/auth.js");

app.use(cors());
app.use(express.json());   // Request body should be sent in json format
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get("/", (req,res) => {
    res.send("Server up and running on port 3000");
});


app.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const entries = await Journal.find({
            userId: userId,
        }).sort({ createdAt: -1 });

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        
        const todayEntry = await Journal.findOne({
            createdAt: { $gte: todayStart, $lte: todayEnd }
        });
        
        // const entries = await Journal.find().sort({ createdAt: -1 }).select('content createdAt');
        
        function calculateStreak(entries) {
            let streak = 0;
            
            const today = new Date();
            today.setHours(0,0,0,0);

            for(let i = 0; i < entries.length; i++) {
                const entryDate = new Date(entries[i].createdAt);
                entryDate.setHours(0, 0, 0, 0);

                const diff = (today - entryDate) / (1000 * 60 * 60 * 24);

                if(diff === streak) {
                    streak++;
                } else {
                    break;  
                }
            }
            return streak;
        }

        const streak = calculateStreak(entries);
        // console.log(streak);

        const previewEntries = entries.map(e => ({
            _id: e._id,
            createdAt: e.createdAt,
            preview: e.content.slice(0, 180),

        }));
        res.json({
            entries: previewEntries,
            streak: streak,
            hasEntryToday: !!todayEntry
        });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/entry/:id", async (req, res) => {
    try {
        const entry = await Journal.findById(req.params.id);
        if(!entry) return res.status(404).json({ error: 'Entry not found' });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) 
            return res.status(400).json({ error: "Both email and password are required" });

        const user = await User.findOne({ email });

        if(!user) 
            return res.status(400).json({ error: "User doesn't exist" });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(201).json({ token });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ error: "Both Email and Password are required" });
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password : hashedPassword
        });
        res.status(201).json({
            message: "User created successfully",
            userId: user._id
        });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/entry", authMiddleware,  async (req, res) => {
    try {
        const { content } = req.body;
        if(!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const existingEntry = await Journal.findOne({
            createdAt: { $gte: todayStart, $lte: todayEnd }
        });

        if(existingEntry) {
            existingEntry.content += "\n\n" + content;
            await existingEntry.save();
            return res.json(existingEntry);
        }

        const newEntry = await Journal.create({ 
            content,
            userId: req.user.userId
         });
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/entry/:id", async (req, res) => {
    console.log("Reached PUT / edit route");
    const id = req.params.id;
    const content = req.body.content;
    try {
        if(!content) {
            return res.status(400).json({ error: "Content is required" });
        }
        const updatedEntry = await Journal.findByIdAndUpdate(
            id,
            { content }, 
            {new : true, runValidators: true}
        );
        console.log(updatedEntry);
        if(!updatedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }
        res.json(updatedEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});