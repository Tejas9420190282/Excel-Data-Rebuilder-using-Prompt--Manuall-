
// excel_Router.js

const express = require('express');
const multer = require('multer');
const { excel_Controller } = require('../controller/excel_Controller');
const fs = require('fs');

const excel_Router = express.Router();

// Ensure tmp folder exists at runtime
if (!fs.existsSync("/tmp/uploads")) {
    
    fs.mkdirSync("/tmp/uploads", { recursive : true });
}

if (!fs.existsSync("/tmp/downloads")) {
    fs.mkdirSync("/tmp/downloads", { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "/tmp/uploads/");
    },

    filename : (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage });

excel_Router.post("/file-prompt-uploads", upload.single('file'), excel_Controller);

exports.excel_Router = excel_Router;

