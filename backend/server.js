// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Assuming db.js exports a PostgreSQL connection pool
import pool from "./db.js"; 

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- PLACEHOLDER FOR ML MODEL LOGIC ---

/**
 * Simulates an ML function that trains a model and predicts stock recommendations.
 * This is left unchanged as it's a placeholder.
 */
function getStockRecommendations() {
    return [
        { ticker: 'AAPL', confidence: 0.95, action: 'BUY' },
        { ticker: 'MSFT', confidence: 0.88, action: 'HOLD' },
        { ticker: 'GOOGL', confidence: 0.75, action: 'SELL' },
    ];
}

// --- DATABASE INITIALIZATION ---

// Create table if not exists and initialize wallet & savings
(async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS state (
                id SERIAL PRIMARY KEY,
                key TEXT UNIQUE,
                value NUMERIC DEFAULT 0
            );
        `);

        // Initialize wallet & savings
        const keys = ["wallet", "savings"];
        for (const key of keys) {
            await pool.query(
                "INSERT INTO state (key, value) VALUES ($1, 0) ON CONFLICT (key) DO NOTHING;",
                [key]
            );
        }
        console.log("Database initialized with 'wallet' and 'savings' keys.");
    } catch (err) {
        console.error("Error during database initialization:", err.message);
    }
})();

// --- API ROUTES ---

// 1. GET State (Used by frontend to fetch initial balance)
app.get("/api/state/:key", async (req, res) => {
    const { key } = req.params;
    try {
        const result = await pool.query("SELECT * FROM state WHERE key = $1", [key]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Key not found" });
        }
        // Returns the row, e.g., { id: 1, key: 'wallet', value: '356.00' }
        res.json(result.rows[0]); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. 📢 CORRECTED ROUTE: POST Add Amount
// This now returns the *newly updated* row for real-time frontend integration.
app.post("/api/state/:key/add", async (req, res) => {
    const { key } = req.params;
    const { amount } = req.body;
    
    // Basic validation
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount provided. Must be a positive number." });
    }

    try {
        // SQL UPDATE query uses RETURNING * to get the entire updated row
        const result = await pool.query(
            "UPDATE state SET value = value + $1 WHERE key = $2 RETURNING *", 
            [amount, key]
        );

        if (result.rows.length === 0) {
             return res.status(404).json({ error: `Key '${key}' not found or could not be updated.` });
        }
        
        // Respond with the updated state object, which includes the new 'value'
        res.json({ 
            success: true, 
            updatedState: result.rows[0] // e.g., { id: 1, key: 'wallet', value: '360.00' }
        });
    } catch (err) {
        console.error("Database error during update:", err);
        res.status(500).json({ error: "Server failed to update state." });
    }
});

// 3. POST Transfer (Transaction route) - Left unchanged
app.post("/api/transfer/wallet-to-savings", async (req, res) => {
    // Use transaction for safe transfer
    await pool.query("BEGIN"); 
    try {
        const walletRes = await pool.query("SELECT value FROM state WHERE key = 'wallet'");
        const walletValue = Number(walletRes.rows[0].value);
        
        // Check if enough funds exist
        if (walletValue <= 0) {
            await pool.query("ROLLBACK");
            return res.status(400).json({ error: "Wallet balance is zero" });
        }

        // Transfer logic
        await pool.query("UPDATE state SET value = value + $1 WHERE key = 'savings'", [walletValue]);
        await pool.query("UPDATE state SET value = 0 WHERE key = 'wallet'");
        
        await pool.query("COMMIT");
        res.json({ success: true, transferred: walletValue });
    } catch (err) {
        await pool.query("ROLLBACK");
        res.status(500).json({ error: "Transfer failed: " + err.message });
    }
});

// 4. GET Stock Recommendations (ML Route) - Left unchanged
app.get("/api/recommendations", (req, res) => {
    try {
        const recommendations = getStockRecommendations();
        res.json({ success: true, data: recommendations });
    } catch (err) {
        res.status(500).json({ error: "Failed to get recommendations: " + err.message });
    }
});


// --- START SERVER ---

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));