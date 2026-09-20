const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "FullStack DevOps Backend is running!",
        status: "success"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "backend"
    });
});
// Get all tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch tasks"
        });
    }
});

// Create a task
app.post("/api/tasks", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, description)
             VALUES ($1, $2)
             RETURNING *`,
            [title, description || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create task"
        });
    }
});

app.listen(PORT, async () => {
    console.log(`Backend running on port ${PORT}`);

    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected successfully:", result.rows[0]);
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});