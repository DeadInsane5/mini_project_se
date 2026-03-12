import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoute.js"
import recordRoutes from "./routes/recordRoute.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/records", recordRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
