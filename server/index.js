const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");
const resultRoutes = require("./routes/result");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api", resultRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
