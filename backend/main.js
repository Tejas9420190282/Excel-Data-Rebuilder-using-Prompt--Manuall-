
const express = require('express');
const colors = require('colors');
const cors = require('cors');

const app = express();

// app.use(cors({origin: '', credentials: true}))           

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = 2311;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`.bgGreen);
})





