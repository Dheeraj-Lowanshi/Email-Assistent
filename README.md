# 📧 Email Assistant

An **AI-powered Email Assistant** that helps users **generate replies to emails in different tones** like **Professional**, **Casual**, or **Friendly**.  
Built with **Spring Boot**, **Google Gemini AI**, and **React.js**, the project enables users to quickly craft smart, context-aware responses.

---

## 🚀 Features
- ✨ Generate **AI-based email replies**.
- 🎭 Choose tone of reply → **Professional**, **Casual**, or **Friendly**.
- 🌐 Easy-to-use **React.js frontend**.
- ⚡ Backend powered by **Spring Boot**.
- 🤖 Integrated with **Google Gemini AI** for natural language generation.
- 🔒 Secure and scalable architecture.

---

## 🛠️ Tech Stack
- **Frontend**: React.js  
- **Backend**: Spring Boot  
- **AI Integration**: Google Gemini AI  
- **Build Tool**: Maven  
- **Version Control**: Git & GitHub  

---

## 📂 Project Structure

Email-Assistent/
│
├── email-writter-sb/            # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/email/writter/
│   │   │   │   ├── EmailGeneratorController.java   # REST API for email generation
│   │   │   │   ├── EmailGeneratorService.java      # Service layer with Gemini API call
│   │   │   │   ├── EmailRequest.java               # DTO for user request
│   │   │   └── resources/
│   │   │       ├── application.properties          # Spring Boot configuration
│   │   │       └── prompts/                        # (Optional) Prompt templates
│   ├── pom.xml                                     # Maven dependencies
│   └── .env                                        # API keys (GEMINI_API_KEY, etc.)
│
├── frontend/                   # React.js Frontend
│   ├── public/                 # Public assets
│   ├── src/
│   │   ├── components/         # UI components (form, buttons, etc.)
│   │   ├── pages/              # Main pages (Home, Dashboard, etc.)
│   │   ├── App.js              # Main React app
│   │   └── index.js            # React entry point
│   ├── package.json            # React dependencies
│   └── .env                    # Frontend environment (API base URL)
│
├── .gitignore
├── README.md
└── LICENSE

