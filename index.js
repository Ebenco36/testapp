const express = require("express");
const cors = require("cors");
const AppError = require("./utils/AppError");
const errorHandler = require("./utils/errorHandler");
const routers = require("./routes/index");

require('dotenv').config()

var corsOptions = {
    origin: "http://localhost:8081"
};
const app = express();
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;
app.use(express.json(), routers);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);


app.use(
    express.urlencoded({
        extended: true,
    })
);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});