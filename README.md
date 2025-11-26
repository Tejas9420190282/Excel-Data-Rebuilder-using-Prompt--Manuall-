# Excel Data Rebuilder using Prompt-Based AI Transformation

### 🚀 Project Overview

Excel Data Rebuilder is a full-stack application that allows users to upload large Excel files and apply transformations using natural language prompts. The system processes the Excel file, restructures or filters the data based on user instructions, and generates a downloadable processed Excel file.

This project supports large datasets (tested with 1 lakh+ rows) and uses AI **only for generating JavaScript transformation logic**, without sending actual dataset to AI — ensuring privacy.

---

## ✨ Features

* Upload `.xlsx` Excel file
* Enter a custom transformation prompt
* Backend reads file and extracts column headers
* Sends only headers + prompt to AI (Groq LLaMA 3.1)
* AI returns JavaScript transformation code (e.g., filter, sort, map, remove duplicates, rearrange columns, etc.)
* Executes transformation manually on backend
* Returns processed Excel file download link
* Shows preview of first 10 rows
* Handles large dataset efficiently
* Supports real-time processing

---

## 🏗️ Tech Stack

| Layer           | Technology                               |
| --------------- | ---------------------------------------- |
| Frontend        | React, TailwindCSS, Axios                |
| Backend         | Node.js, Express.js, Multer              |
| AI Model        | Groq LLaMA 3.1 (chat.completions.create) |
| Excel Libraries | XLSX (SheetJS)                           |
| File Upload     | Multer Middleware                        |
| Others          | CORS, Path, Colors                       |

---

## 📂 Folder Structure

```
project-root/

│

├── backend/

│   ├── controller/

│   │   └── excel_Controller.js

│   ├── router/

│   │   └── excel_Router.js

│   ├── uploads/

│   ├── downloads/

│   ├── config/

│   │   └── groq.js

│   └── main.js

│

└── frontend/

    ├── pages/

    │   └── Home.jsx

    ├── App.jsx

    └── main.jsx
 
---

```
## ⚙️ How it Works (Flow Diagram)

```
User Upload Excel File + Prompt
            
            │
            
            ▼
    
    Frontend sends (file + prompt) → Backend API
    
            │
            
            ▼
    
    Backend reads Excel + Extracts column headers
    
            │
            
            ▼
   
    Backend sends (headers + prompt) → Groq AI model
    
            │
            
            ▼
    
    Groq returns pure JS transformation code: var result = ...
    
            │
          
            ▼

    Backend executes transformation on real dataset
    
            │
            
            ▼
    
    Generate new processed.xlsx file & store in /downloads
    
            │
            
            ▼
    
    Return Response + Download URL + Preview to Frontend

```

---

## 🧪 Example Prompts

| Prompt                                     | Result                |
| ------------------------------------------ | --------------------- |
| `Filter rows where ID > 50`                | Returns filtered rows |
| `Sort rows by Name ascending`              | Sorts alphabetically  |
| `Return only Name and Contact columns`     | Removes other columns |
| `Remove duplicate rows by Email`           | Unique entries        |
| `Filter rows where Contact starts with 98` | Pattern filtering     |

---

```
## ▶️ How to Run

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Required Environment Variables

Create `.env` inside backend:

```
GROQ_API_KEY=your_api_key_here
```

---

## 🎯 Key Learning & Concepts

* File handling with Multer
* Executing AI-generated code securely
* Working with large datasets
* Preventing privacy leaks by avoiding sending raw data to AI
* Excel-to-JSON and JSON-to-Excel conversion
* Streaming approach for performance

---

## 📥 Future Enhancements

* Pagination & Progress bar for large datasets
* User login + processing history
* Support for CSV & PDF download
* Multiple operations workflow queue
* Role based version control

---

## 👨‍💻 Author

**Tejas Shimpi**  (https://drive.google.com/file/d/1FLhNJayjLSSclwsX4uenppYlacuadRaU/view?pli=1)

https://tejas-shimpi-portfolio.netlify.app/

Full Stack Developer | MERN | Next.js | Node.js | React | SQL | AI integrated systems

---

## ⭐ Support

If you like this project, consider giving a ⭐ on GitHub!

---

### Thank you for viewing this project!

Feel free to connect for suggestions and improvements 😊
