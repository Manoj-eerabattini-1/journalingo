const express = require("express");
const Journal = require("./models/Journal");
const connectDB = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req,res) => {
    res.send("Server up and running on port 3000");
});

app.post("/entry", async (req, res) => {
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

        const newEntry = await Journal.create({ content });
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/dashboard", async (req, res) => {
    try {

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todayEntry = await Journal.findOne({
            createdAt: { $gte: todayStart, $lte: todayEnd }
        });

        const entries = await Journal.find().sort({ createdAt: -1 }).select('content createdAt');

        const previewEntries = entries.map(e => ({
            _id: e._id,
            createdAt: e.createdAt,
            preview: e.content.slice(0, 180),

        }));
        res.json({
            entries: previewEntries,
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
})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});