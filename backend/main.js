
// main.js

require("dotenv").config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { excel_Router } = require('./router/excel_Router');

const app = express();

app.use(cors({origin: '*', credentials: true}))           

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Force HTTPS redirect when deployed on Render ⭐⭐⭐
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});


// ⭐⭐⭐ UPDATED Static folder path for Render temporary filesystem ⭐⭐⭐
app.use("/downloads", express.static("/tmp/downloads"));


app.use(excel_Router)

const PORT = process.env.PORT || 2311;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`.bgGreen);
})





