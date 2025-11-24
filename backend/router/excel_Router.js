
// excel_Router.js

const express = require('express');
const multer = require('multer');
const { excel_Controller } = require('../controller/excel_Controller');

const excel_Router = express.Router();



excel_Router.post("/file-prompt-uploads", excel_Controller)

exports.excel_Router = excel_Router;