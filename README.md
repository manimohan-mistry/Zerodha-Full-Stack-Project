# Zerodha Full Stack Project

A full-stack trading platform inspired by **Zerodha**, built to demonstrate end-to-end development skills including frontend, backend, database, and API integration.

---

## 🚀 Features
- User authentication (JWT based)  
- Dashboard for portfolio & stock monitoring  
- Order management (Buy/Sell)  
- Real-time stock data (API/WebSocket integration)  
- Responsive UI (mobile + desktop)  
- Secure environment variable handling  

---

## 🛠 Tech Stack
- **Frontend**: React, Axios, chart.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Auth**: JWT authentication
- **Other**: REST APIs, Git, GitHub  

---

## ⚙️ Setup Instructions
```bash
# Clone repo
git clone https://github.com/manimohan-mistry/Zerodha-Full-Stack-Project.git
cd Zerodha-Full-Stack-Project

# Install dependencies
npm install

# Configure environment
cp .env.example .env   # Add DB_URI, JWT_SECRET, API_KEY

# Run locally
frontend -> npm start
dashboard1 -> npm start
backend -> nodemon index.js

#  📈 Highlights

Built with clean architecture & modular design

Follows best practices: .gitignore, environment configs, proper error handling

Showcases ability to build production-ready full-stack apps
