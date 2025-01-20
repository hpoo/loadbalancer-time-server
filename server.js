const express = require('express');
const app = express();
const port = 8764;

// Add server ID to distinguish between instances
const serverId = process.env.SERVER_ID || 'unknown';

app.get('/time', async (req, res) => {
    // Simulate heavy processing with 5 second delay
    await new Promise(resolve => setTimeout(resolve, 5000));
    const currentTime = new Date().toLocaleString();
    res.send(`Server ${serverId} - Current time is: ${currentTime}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Time server ${serverId} listening at http://localhost:${port}`);
}); 