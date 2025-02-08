const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingsRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

dotenv.config(); // Load environment variables
const app = express();

// ✅ Correct CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// Routes
app.use('/auth', authRoutes);
app.use('/listing', listingRoutes);
app.use('/ngo', ngoRoutes);
app.use('/restaurant', restaurantRoutes);

const dbConnect = require("./config/database");
dbConnect();
require("./config/cloudinary");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
