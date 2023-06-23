/** @format */

// requiring npm packages
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./database/databse");
const authRouter = require("./route/authRoute");
const bookRouter = require("./route/bookRoute");
const User = require("./model/userModel");
const Book = require("./model/bookModel");
const port = 8080;

// usiong the express middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

// connecting to database
const connection = async () => {
    try {
        const result = await sequelize.sync({});
        if (result) {
            console.log("connected to database successfully");
            app.listen(port, (err) => {
                if (!err) console.log(`app is listening on ${port}`);
                else console.log(err);
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

connection();

// declaring the relation between User and Book
User.hasMany(Book);
Book.belongsTo(User);

// auth routes
app.use("/auth", authRouter);

// book routes
app.use("/book", bookRouter);
