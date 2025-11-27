
// excel_Controller.js

const xlsx = require("xlsx");
const path = require("path");
const { groqClient } = require("../config/groq");

const excel_Controller = async (req, res) => {
    try {
        const file = req.file;

        const { prompt } = req.body;

        // 1) Validation of users input
        if (!file) {
            console.log(`No file uploaded....`.bgRed);

            return res.status(400).json({
                success: false,
                message: `No file uploaded....`,
            });
        }

        if (!prompt || !prompt.trim()) {
            console.log(`No Prompt uploaded....`.bgRed);

            return res.status(400).json({
                success: false,
                message: `No Prompt uploaded....`,
            });
        }

        console.log(`Uploadede File : ${file.filename}`.bgYellow);

        console.log(`Prompt : ${prompt}`.bgYellow);

        // 2) Read full Excel file
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheetData = workbook.Sheets[sheetName];

        const excelJson = xlsx.utils.sheet_to_json(sheetData);

        if (!excelJson.length) {
            console.log(`Excel file seems to be empty or invalid`.bgRed);

            return res.status(400).json({
                success: false,
                message: "Excel file seems to be empty or invalid",
            });
        }

        // 3) Find only Colunm Headers of Excel file
        const colnms = Object.keys(excelJson[0]);

        console.log(`Colunms : ${colnms}`.bgGreen);

        // 4) Sends colunm Headers and Prompt to AI......

        const headerPrompt = `
You are a JavaScript data transformer.

These are only Excel file column headers: ${JSON.stringify(colnms)}

User wants: ${prompt}

Write ONLY JavaScript code:
- Input variable name = data (array of row objects)
- Output MUST be EXACTLY: var result = ...
- Always perform case-insensitive string comparison using .toLowerCase()
- MUST handle missing values safely
- You MUST use 'var' (do NOT use let or const)
- Do NOT include explanations
- Do NOT include comments
- Do NOT wrap code in backticks
`;

        // 5) Call Groq AI
        const aiRes = await groqClient.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content:
                        "You generate pure JavaScript transformation code only.",
                },
                { role: "user", content: headerPrompt },
            ],
            temperature: 0,
        });

        let aiCode = aiRes.choices[0].message.content;
        console.log("\nAI Raw Code:\n", aiCode);

        // 6) Clean AI Code (removes ``` and "JS")
        const cleanCode = aiCode
            .replace(/```/g, "")
            .replace(/javascript/g, "")
            .trim();

        console.log("\nAI Cleaned Code:\n", cleanCode.bgYellow);

        // 7) Execute AI code safely
        var data = excelJson; // original Files full data
        var result; // AI is expected to set this

        try {
            eval(cleanCode); // yahan AI ka JS chalega: var result = ...
        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "AI returned invalid JavaScript code",
                error: err.message,
            });
        }

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "AI did not produce a 'result' variable",
            });
        }

        // 8) Create new Excel from result
        const newWorkbook = xlsx.utils.book_new();
        const newSheet = xlsx.utils.json_to_sheet(result);
        xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Processed");

        const outputFile = `processed_${Date.now()}.xlsx`;
        const outputPath = path.join(__dirname, "..", "downloads", outputFile);

        xlsx.writeFile(newWorkbook, outputPath);

        let topTenValues = [];

        for (let i = 0; i <= 10; i++) {
            topTenValues.push(result[i]);
        }

        const baseURL = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;       // download lnk of excel file after deployment

        // 8) Send response with download URL
        return res.json({
            
            success: true,
            message: "Excel processed successfully",
            downloadUrl: `${baseURL}/downloads/${outputFile}`,
            rowsBefore: excelJson.length,
            rowsAfter: result.length,
            topTenValues: topTenValues,
            fullData: result,
        });

    } catch (error) {
        
        console.log(`Error in excel_Controller : ${error.message}`.bgRed);

        res.status(500).json({
            success: false,
            message: `Error in excel_Controller : ${error.message}`,
        });
    }
};

exports.excel_Controller = excel_Controller;
