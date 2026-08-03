const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = [
    "https://interviewprep-cwo8.onrender.com",
    "https://interviewpre.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://interview-prep-vert-three.vercel.app"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/", (req, res) => {
    res.json({ message: "Backend is running" })
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
})

module.exports = app
