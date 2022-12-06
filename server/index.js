const express = require("express");
const app = express();
const { mongoConnect } = require("./api/mongoose");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const PORT = process.env.PORT || 3001;

const authenticationRoute = require("./routes/authentication");

app.use(express.json());
app.use("/api/user", authenticationRoute);

// connect to db
mongoConnect(() => console.log("Connected to database"));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
