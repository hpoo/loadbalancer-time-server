const express = require('express');
const app = express();
const port = 8764;

app.get('/', (req, res) => {
    const currentTime = new Date().toLocaleString();
    res.send(`Current time is: ${currentTime}`);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Time server listening at http://localhost:${port}`);
}); 