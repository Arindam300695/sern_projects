const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./route/authRoute");
const bookRouter = require("./route/bookRoute");
require("dotenv").config();

// Using the express middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

const connect = async () => {
    try {
        await mongoose.connect(
            // "mongodb+srv://Arindam300695:Born2win@1995@cluster0.nllhefz.mongodb.net/bookStore",
            process.env.db_url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(process.env.db_url);
        console.log("successfylly connected with the database");
    } catch (error) {
        console.log(error.message);
    }
};

// Auth routes
app.use("/auth", authRouter);

// Book routes
app.use("/book", bookRouter);

app.listen(process.env.port, async (err) => {
    if (!err) {
        await connect();
        console.log(`App is listening on ${process.env.port || 8080}`);
    } else console.log(err.message);
});
