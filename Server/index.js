const express = require("express");
const App = express();
const bodyParser = require("body-parser");

const fileUpload = require("express-fileupload");
const userRoute = require("./Routes/User")
const RateRoute = require("./Routes/Rate")
const courseRoute = require("./Routes/Course")
const paymentRoute = require("./Routes/Payments")
const categoryRoute = require("./Routes/Category")

const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config();

App.use(express.json());
App.use(
  fileUpload({
     
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
App.use(
  "/api/v1/payment/verify",
  bodyParser.raw({ type: "application/json" })
);

App.use(cookieParser())

App.use(
    cors(
        {
            origin: function(origin, callback) {
                const allowed = [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://localhost:5174",
                    "http://localhost:5175",
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                    process.env.CLIENT_URL,
                ].filter(Boolean);
                
                // Allow requests with no origin (e.g. Postman, mobile apps, server-to-server)
                if (!origin) {
                    return callback(null, true);
                }

                // Normalize trailing slashes to avoid CORS matching issues
                const cleanOrigin = origin.replace(/\/$/, "");
                const allowedClean = allowed.map(url => url.replace(/\/$/, ""));

                if (allowedClean.includes(cleanOrigin)) {
                    return callback(null, true);
                }
                return callback(new Error(`CORS: Origin ${origin} not allowed`));
            },
            credentials:true
        }
    )
)

const dbConnect = require("./config/database");
dbConnect();

const {cloudinaryConnect} = require("./config/cloudinary");
cloudinaryConnect();

App.use("/api/v1/auth" , userRoute)
App.use("/api/v1" , courseRoute)
App.use("/api/v1/rate" , RateRoute)
App.use("/api/v1/payment" , paymentRoute)
App.use("/api/v1/category" , categoryRoute)

App.get("/" , (req,res)=>{
    return res.json({
        success:true,
        message:"App is running"
    })
})

const PORT = process.env.PORT || 4000;
App.listen(PORT , ()=>{
    console.log(`App is Running on port ${PORT}`)
})