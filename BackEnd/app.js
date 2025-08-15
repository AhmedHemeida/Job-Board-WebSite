// ==========================
// 1. Imports & Config
// ==========================
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Job = require("./models/jobMode") ;
dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// ==========================
// 2. Middleware
// ==========================
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



// ==========================
// 3. Socket.IO
// ==========================
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

// تمرير io لكل request
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("✅ New client connected");

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected");
  });
});


// ==========================
// 4. Routes
// ==========================
const auth = require("./routes/auth");
const PostJob = require("./routes/JobsCycleRoute");

app.use("/api/", auth);
app.use("/api/", PostJob);

// ==========================
// 5. Database Connection
// ==========================
mongoose.connect(process.env.Database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Database Connected"))
.catch(err => console.error("❌ Database Error:", err));

// ==========================
// 6. Server Start
// ==========================
server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
