# 🦆 DuckSearch - Simulated Search Engine

A playful search engine that pretends to process your queries using a Node.js backend, but ultimately gives up and shows you adorable duck pictures instead!

## 🎯 Features

- **Real Backend Processing**: Node.js + Express server handles all query analysis
- **Simulated Thinking**: Backend sends progressive thinking messages to simulate real search processing
- **API Integration**: Frontend communicates with backend through RESTful APIs
- **Random Duck Results**: After "analyzing" your query, the backend decides to show ducks instead
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Query Analysis**: Backend logs keyword detection and intent analysis (visible in console)

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (with animations and gradients)
- Vanilla JavaScript (Fetch API for backend communication)

### Backend
- Node.js
- Express.js
- RESTful API endpoints

## 📁 Project Structure

```
HYPERIMAGE PROJECT 2/
├── server.js           # Node.js backend server
├── package.json        # Node.js dependencies
├── index.html          # Frontend HTML structure
├── style.css           # Styling and animations
├── main.js             # Frontend JavaScript (API calls)
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Start the Server**
   ```powershell
   npm start
   ```

   For development with auto-restart:
   ```powershell
   npm run dev
   ```

3. **Open Your Browser**
   Navigate to: `http://localhost:3000`

## 🔧 API Endpoints

### POST `/api/search`
Analyzes the user's query and returns thinking messages.

**Request Body:**
```json
{
  "query": "best pizza near me"
}
```

**Response:**
```json
{
  "success": true,
  "query": "best pizza near me",
  "analysis": {
    "keywords": ["best", "pizza", "near", "me"],
    "intent": "Recommendation"
  },
  "thinkingMessages": ["Processing your query...", "..."]
}
```

### POST `/api/results`
Returns the final results (duck images) after "processing".

**Request Body:**
```json
{
  "query": "best pizza near me"
}
```

**Response:**
```json
{
  "success": true,
  "title": "Oops! Here are ducks instead! 🦆",
  "subtitle": "We couldn't figure out what you wanted...",
  "ducks": [
    {
      "url": "https://random-d.uk/api/randomimg",
      "caption": "Look at this adorable duck! 🦆"
    }
  ],
  "message": "Backend successfully failed to find relevant results! 🦆"
}
```

## 🎮 How It Works

1. **User submits a query** → Frontend sends POST request to `/api/search`
2. **Backend analyzes query** → Extracts keywords, determines intent (logged to console)
3. **Backend sends thinking messages** → Frontend displays them one by one
4. **Frontend requests results** → POST request to `/api/results`
5. **Backend "gives up"** → Sends random duck images instead of real results
6. **Frontend displays ducks** → User sees playful results with funny messages

## 🎨 Customization

### Change the Animal
Edit `server.js` to use different images:
```javascript
const duckImages = [
    {
        url: "YOUR_IMAGE_URL_HERE",
        caption: "Your custom caption! 🐱"
    }
];
```

### Modify Thinking Messages
Update the `thinkingMessages` array in `server.js`:
```javascript
const thinkingMessages = [
    "Your custom message 1...",
    "Your custom message 2...",
];
```

### Change Port
Edit `server.js`:
```javascript
const PORT = 3000; // Change to your preferred port
```

## 🐛 Troubleshooting

**Server won't start?**
- Make sure port 3000 is not already in use
- Run `npm install` to ensure dependencies are installed

**Can't connect to backend?**
- Verify the server is running (`npm start`)
- Check console for error messages
- Ensure you're accessing `http://localhost:3000` (not opening index.html directly)

**Images not loading?**
- Check your internet connection (duck images are fetched from external API)
- Look at browser console for network errors

## 📝 License

This project is open source and available for educational purposes.

## 🦆 Credits

- Duck images provided by [random-d.uk](https://random-d.uk/)
- Built with ❤️ and a sense of humor!

---

**Enjoy your duck pictures! 🦆✨**
