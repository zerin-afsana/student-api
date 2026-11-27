require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/Student");

// CRUD IMPORTS (added in Steps 6-9)

const app = express();
app.use(express.json());

connectDB(); // connect to MongoDB Atlas when the server starts

// Helper: runs a function, then sends its result (or its error) back as JSON
function demo(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req);
      res.status(200).json({ ok: true, result: result });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  };
}

// Home page: proves the server is running
app.get("/", (req, res) => {
  res.json({ message: "Student CRUD demo is running" });
});

// Utility: empties the students collection (demo database only!)
app.get("/demo/reset", demo(async () => {
  const result = await Student.deleteMany({});
  return { deletedCount: result.deletedCount };
}));

// CREATE ROUTES (Step 6)

// READ ROUTES (Step 7)

// UPDATE ROUTES (Step 8)

// DELETE ROUTES (Step 9)

// 404 handler: must come AFTER all the routes above
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
