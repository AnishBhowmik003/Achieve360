const express = require("express");
const cors = require("cors");
const app = express();
const bs = require("body-parser")

var mysql = require('mysql2');
const bodyParser = require("body-parser");

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Achieve360!",
    database: "achieve360"
  });

const port = 6969;

const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

function is_password_valid(password) {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))

app.use(cors({
    origin: "http://localhost:3000"
}));

app.listen(port, () => {
    console.log(`Server started on port ${port}\n`);
});

app.post("/signup", async (req, res) => {
    if(is_password_valid(req.body.pass)) {
        con.execute(`SELECT * FROM user WHERE email = '${req.body.email}';`, function (err, result) {
            if (err) throw err;
            if(result.length == 0) {
                hashed_password = hash(req.body.pass);
                con.execute(`INSERT INTO user (username, password, email, type) VALUES ('${req.body.name}', '${hashed_password}', '${req.body.email}', '${req.body.role}')`, function (err, result) {
                    if (err) throw err;
                    return res.status(200).json({ message: "User added successfuly."});
                });
            }
            else return res.status(400).json({ message: "Email already in use."});
        });
    }
    else {
        return res.status(400).json({ message: "Invalid Password. Your password must include an uppercase letter, a lowercase letter, and a number."});
    }
});

function check_password(email, password, callback) {
    con.execute(`SELECT password FROM user WHERE email = '${email}';`, function (err, result) {
        if (err) throw err;
        if(result.length == 0 || result[0].password != hash(password)) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
}

app.post("/login", async (req, res) => {
    check_password(req.body.email, req.body.pass, function(bool) {
        if(bool) {
            console.log('yes');
            return res.status(200).json({ message: "Logging in."});
        }
        else {
            console.log('no');
            return res.status(400).json({ message: "Invalid Username or Password."});
        }
    })
});
