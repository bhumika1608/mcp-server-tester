const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, '../public')));

// Default route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// MCP Server Test Route
app.post('/test-mcp', async (req, res) => {
    const { hostname, port } = req.body;

    if (!hostname || !port) {
        return res.status(400).json({ status: "Error", message: "Hostname and port are required." });
    }

    try {
        const response = await axios.get(`http://${hostname}:${port}/healthcheck`, { timeout: 5000 });

        if (response.status === 200) {
            return res.json({ status: "Success", message: "MCP Server is reachable and responding." });
        } else {
            return res.json({ status: "Error", message: "MCP Server is not responding properly." });
        }
    } catch (error) {
        return res.json({ status: "Error", message: `Failed to connect: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

