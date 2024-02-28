const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
} );