const express = require("express");
const cors = require("cors");
const app = express();
const bs = require("body-parser")

var mysql = require('mysql2');
const bodyParser = require("body-parser");

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Neel1123!",
    database: "achieve360"
  });

const port = 6969;

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use(cors({
    origin: "http://localhost:3000"
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}\n`);
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    con.execute("SELECT * FROM user;", function (err, result) {
        if (err) throw err;
        console.log(result[0]);
        return res.status(200).json({ message: "Srinny in Sri Lankan."})
    });
})





