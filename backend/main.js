

require("dotenv").config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { excel_Router } = require('./router/excel_Router');

const app = express();

app.use(cors({origin: 'http://localhost:5173/', credentials: true}))           

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(excel_Router)

const PORT = 2311;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`.bgGreen);
})





